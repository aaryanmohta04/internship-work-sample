"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
  fetchModelsForSelection,
  fetchNewArrivals,
  createNewArrival,
  deleteNewArrival,
  updateNewArrivalsOrder,
} from "../../../lib/api/NewArrival";
import withAuth from "@/components/withAuth";
import Layout from "@/components/Layout";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ClockIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";
import TabsMenu from "@/components/TabsMenu";
import InputWithSelection from "@/components/InputWithSelections";
import ForbiddenPage from "@/components/ForbiddenPage";

const NewArrivals = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [newArrivals, setNewArrivals] = useState<NewArrival[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [modelOptions, setModelOptions] = useState<Model[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [updatedTime, setUpdatedTime] = useState<string>();
  const [forbidden, setForbidden] = useState<boolean>(false);
  const tabs = [
    { name: "Popular Brands", href: "/popular-brands/listing" },
    { name: "Banners", href: "/website-banner/listing" },
    { name: "New Arrivals", href: "/new-arrival/listing" },
  ];

  useEffect(() => {
    fetchModelsData();
    fetchNewArrivalsData();
  }, []);

  const fetchModelsData = async () => {
    const models = await fetchModelsForSelection();
    setModels(models);
    setModelOptions(models);
  };

  const fetchNewArrivalsData = async () => {
    const newArrivals = await fetchNewArrivals();
    if (newArrivals.statusCode == 403) setForbidden(true);
    setNewArrivals(newArrivals);
  };

  const handleAdd = async () => {
    if (!selectedModel) return;
    const [alreadyexists] = newArrivals.filter(
      (newArrival) => newArrival.model.id == parseInt(selectedModel)
    );
    if (alreadyexists) {
      alert("Already Added!");
      return;
    }
    const newModel = await createNewArrival(parseInt(selectedModel));
    setNewArrivals([...newArrivals, newModel]);
    setSelectedModel("");
    setSearchQuery("");
  };

  const handleDelete = async (id: any) => {
    await deleteNewArrival(id);
    const updatedNewArrivals = newArrivals.filter(
      (newarrival) => newarrival.id !== id
    );
    const orderedArrivals = updatedNewArrivals.map((item, index) => {
      return {
        ...item,
        order: index + 1,
      };
    });
    setNewArrivals(orderedArrivals);
    await updateNewArrivalsOrder(orderedArrivals);
  };

  const handleMouseEnter = (
    newArrival: NewArrival,
    event: React.MouseEvent<SVGSVGElement>
  ) => {
    setShowTooltip(true);
    setUpdatedTime(newArrival.createdDate);
    setPosition({ x: event.clientX, y: event.clientY });
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;
    const items = Array.from(newArrivals);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setNewArrivals(items);
    const updatedOrder = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }));
    await updateNewArrivalsOrder(updatedOrder);
  };
  if (forbidden) return <ForbiddenPage />;
  return (
    <Layout>
      <TabsMenu currentPage="New Arrivals" tabs={tabs} />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">New Arrivals</h1>
        <div className="flex items-center mb-4">
          <InputWithSelection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSelectedItem={setSelectedModel}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            dataOptions={modelOptions}
            setDataOptions={setModelOptions}
            rawData={models}
            handleAdd={handleAdd}
          />
        </div>
        <div className="px-6 py-4 bg-gray-100 font-bold border border-gray-100 flex flex-row justify-between">
          <div className="ml-10">Model Name</div>
          <div className="mr-6">Action</div>
        </div>
        <div className="border border-gray-100 pb-2">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="newArrivals">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {newArrivals.map((newArrival, index) => (
                    <Draggable
                      key={newArrival.model.id}
                      draggableId={newArrival.model.id.toString()}
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
                            <div>{newArrival.model.name}</div>
                          </div>
                          <div className="w-12 h-6 mr-6 text-blue-800 flex flex-row space-x-1">
                            <TrashIcon
                              onClick={() => handleDelete(newArrival.id)}
                            />
                            <ClockIcon
                              onMouseEnter={(event) =>
                                handleMouseEnter(newArrival, event)
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

export default withAuth(NewArrivals);
