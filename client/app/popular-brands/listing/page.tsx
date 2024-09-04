"use client";
import { useState, useEffect } from "react";
import { fetchBrandsForSelection } from "@/lib/api/Brand";
import {
  addPopularBrand,
  deletePopularBrand,
  fetchPopularBrands,
  updatePopularBrandOrder,
} from "@/lib/api/PopularBrand";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import withAuth from "@/components/withAuth";
import Layout from "@/components/Layout";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ClockIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";
import TabsMenu from "@/components/TabsMenu";
import InputWithSelection from "@/components/InputWithSelections";
import ForbiddenPage from "@/components/ForbiddenPage";

const PopularBrandPage = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [popularBrands, setPopularBrands] = useState<PopularBrand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [brandOptions, setBrandOptions] = useState<Brand[]>([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [updatedTime, setUpdatedTime] = useState<string>();
  const [forbidden, setForbidden] = useState<boolean>(false);
  const tabs = [
    { name: "Popular Brands", href: "/popular-brands/listing" },
    { name: "Banners", href: "/website-banner/listing" },
    { name: "New Arrivals", href: "/new-arrival/listing" },
  ];

  useEffect(() => {
    loadBrands();
    loadPopularBrands();
  }, []);

  const loadBrands = async () => {
    const params = new URLSearchParams({
      offset: "0",
      limit: "0",
    });
    const brandData = await fetchBrandsForSelection();
    setBrands(brandData.data);
    setBrandOptions(brandData);
  };

  const loadPopularBrands = async () => {
    const popularBrandData = await fetchPopularBrands();
    if (popularBrandData.statusCode == 403) setForbidden(true);
    setPopularBrands(popularBrandData);
  };

  const handleAdd = async () => {
    if (!selectedBrand) return;
    const [alreadyexists] = popularBrands.filter(
      (popularBrand) => popularBrand.brand.id == parseInt(selectedBrand)
    );
    if (alreadyexists) {
      alert("Already Added!");
      return;
    }
    setSearchQuery("");
    const newBrand = await addPopularBrand(parseInt(selectedBrand));
    setPopularBrands([...popularBrands, newBrand]);
    setSelectedBrand("");
  };

  const handleDelete = async (id: any) => {
    await deletePopularBrand(id);
    const updatedBrands = popularBrands.filter((brand) => brand.id !== id);
    const orderedBrands = updatedBrands.map((item, index) => {
      return {
        ...item,
        order: index + 1,
      };
    });
    setPopularBrands(orderedBrands);
    await updatePopularBrandOrder(orderedBrands);
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;
    const items = Array.from(popularBrands);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPopularBrands(items);

    const updatedOrder = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }));
    await updatePopularBrandOrder(updatedOrder);
  };

  const handleMouseEnter = (
    popularBrand: PopularBrand,
    event: React.MouseEvent<SVGSVGElement>
  ) => {
    setShowTooltip(true);
    setUpdatedTime(popularBrand.createdDate);
    setPosition({ x: event.clientX, y: event.clientY });
  };

  if (forbidden) return <ForbiddenPage />;
  return (
    <Layout>
      <TabsMenu currentPage="Popular Brands" tabs={tabs} />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Popular Brands</h1>
        <InputWithSelection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSelectedItem={setSelectedBrand}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          dataOptions={brandOptions}
          setDataOptions={setBrandOptions}
          rawData={brands}
          handleAdd={handleAdd}
        />

        <div className="px-6 py-4 bg-gray-100 font-bold border border-gray-100 flex flex-row justify-between">
          <div className="ml-10">Brand Name</div>
          <div className="mr-6">Action</div>
        </div>
        <div className="border border-gray-100 pb-2">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="popularBrands">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {popularBrands.map((brand, index) => (
                    <Draggable
                      key={brand.brand.id}
                      draggableId={brand.brand.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="px-4 py-4 whitespace-nowrap border border-gray-100 flex flex-row justify-between"
                        >
                          <div className="flex flex-row space-x-4">
                            <Bars3Icon className="w-6 h-6" />
                            <div>{brand.brand.name}</div>
                          </div>
                          <div className="w-12 h-6 mr-6 text-blue-800 flex flex-row space-x-1">
                            <TrashIcon onClick={() => handleDelete(brand.id)} />
                            <ClockIcon
                              onMouseEnter={(event) =>
                                handleMouseEnter(brand, event)
                              }
                              onMouseLeave={() => setShowTooltip(false)}
                            />
                          </div>
                          {showTooltip && (
                            <div
                              className="absolute bg-gray-50 border border-black text-sm text-black p-1"
                              style={{
                                left: position.x - 110,
                                top: position.y - 30,
                              }}
                            >
                              {updatedTime}
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(PopularBrandPage);
