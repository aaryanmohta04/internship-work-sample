import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Switch } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import withAuth from "./withAuth";
import { fetchBrandsForSelection } from "@/lib/api/Brand";
import { fetchChannels } from "@/lib/api/Channel";
import { fetchManufacturerByBrandId } from "@/lib/api/Manufacturer";
import { fetchClassesbyModelId } from "@/lib/api/Class";
import { fetchModelsByBrandId } from "@/lib/api/Model";
import { fetchUnitsOfMeasurebyProductId } from "@/lib/api/UnitOfMeasure";
import InputField from "./InputField";
import SelectField from "./SelectField";
import SelectMultiField from "./SelectMultiField";
import Label from "./Label";
import InventoryTable from "./InventoryTable";
import ImageDrop from "./ImageDrop";
import RelationshipsField from "./RelationshipsField";
import TabsMenu from "@/components/TabsMenu";
import AttributeForm from "./AttributeForm";
import GalleryForm from "./GalleryForm";
import Table from "./Table";
import SimpleTable from "./SimpleTable";

interface ProductFormProps {
  defaultProduct: any;
  onSubmit: any;
}

const tabs = [
  { name: "Product (Varieties) Info", href: "#" },
  { name: "Attributes", href: "#" },
  { name: "U/M (Items)", href: "#" },
  { name: "Gallery", href: "#" },
];

const inventoryData = [
  {
    facility: "Warehouse A",
    zip: "12345",
    bagOnHand: 0,
    boxOnHand: 0,
    bagAvailable: 0,
    boxAvailable: 0,
  },
  {
    facility: "Distribution Center B",
    zip: "67890",
    bagOnHand: 0,
    boxOnHand: 0,
    bagAvailable: 0,
    boxAvailable: 0,
  },
  {
    facility: "Storage Unit C",
    zip: "54321",
    bagOnHand: 0,
    boxOnHand: 0,
    bagAvailable: 0,
    boxAvailable: 0,
  },
];

const ProductForm: React.FC<ProductFormProps> = ({
  defaultProduct,
  onSubmit,
}) => {
  console.log(defaultProduct);
  const { register, handleSubmit, control, setValue, watch, reset, getValues } =
    useForm({
      defaultValues: defaultProduct || {},
    });

  const [images, setImages] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(
    defaultProduct?.brand?.id || null
  );
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [selectedModel, setSelectedModel] = useState(
    defaultProduct?.model?.id || null
  );
  const [selectedClass, setSelectedClass] = useState(
    defaultProduct?.classEntity?.id || null
  );
  const [selectedMeasure, setSelectedMeasure] = useState(
    defaultProduct?.measure || null
  );
  const [selectedItemNumber, setSelectedItemNumber] = useState(
    defaultProduct?.itemNumber || null
  );
  const [selectedPromoCode, setSelectedPromoCode] = useState(
    defaultProduct?.promoCode || null
  );
  const [selectedListPrice, setSelectedListPrice] = useState(
    defaultProduct?.listPrice || null
  );
  const [selectedFacility, setSelectedFacility] = useState(
    defaultProduct?.facility || null
  );
  const [selectedChannels, setSelectedChannels] = useState(
    defaultProduct?.channels || null
  );
  const [selectedVariety, setSelectedVariety] = useState(
    defaultProduct?.variety || null
  );
  const [models, setModels] = useState<Model[]>([]);
  const [UMItems, setUMItems] = useState<any[]>([]);
  const [classes, setClasses] = useState([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [channels, setChannels] = useState([]);
  const [viewLocation, setViewLocation] = useState(true);
  const [viewRelations, setViewRelations] = useState(true);
  const [viewDocuments, setViewDocuments] = useState(true);
  const [selectedPage, setSelectedPage] = useState("Product (Varieties) Info");
  const [attributes, setAttributes] = useState<JSON>();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandsData, channelsData] = await Promise.all([
          fetchBrandsForSelection(),
          fetchChannels(),
        ]);
        if (defaultProduct?.id) {
          const umitems = await fetchUnitsOfMeasurebyProductId(
            defaultProduct?.id
          );
          console.log(umitems.data);
          setUMItems(umitems.data);
        }
        setBrands(brandsData);
        setChannels(channelsData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedBrand) {
          const [manufacturerData] = await Promise.all([
            fetchManufacturerByBrandId(selectedBrand),
          ]);

          if (manufacturerData && manufacturerData.name) {
            setSelectedManufacturer(manufacturerData.name);
            setValue("manufacturer", manufacturerData.name);
          } else {
            setSelectedManufacturer("");
            setValue("manufacturer", "");
          }
          setModels(await fetchModelsByBrandId(Number(selectedBrand)));
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedModel) {
      fetchClassesbyModelId(Number(selectedModel)).then((Classes) => {
        setClasses(Classes);
      });
    }
  }, [selectedModel]);

  const setAllImages = (image: any) => {
    setImages(image);
    // setDefaultImages(image);
  };

  const handleFormSubmit = () => {
    const currentValues = getValues();
    console.log(currentValues);
    const updatedData = {
      ...currentValues,
      attributes: attributes,
      images: images,
    };
    onSubmit(updatedData);
  };

  const handleClear = () => {
    reset({ channel: [], promoItem: false });
    setSelectedManufacturer("");
  };

  const getProductName = () => {
    const brandName =
      brands.find((b) => b.id === Number(selectedBrand))?.name || "";
    const modelName =
      models.find((m) => m.id === Number(selectedModel))?.name || "";
    const varietyName = selectedVariety || "";

    setValue("name", `${brandName} ${modelName} ${varietyName}`.trim());
    return `${brandName} ${modelName} ${varietyName}`.trim();
  };

  const renderForm = () => {
    switch (selectedPage) {
      case "Product (Varieties) Info":
        return (
          // <ProductForm
          //   defaultProduct={product}
          //   onSubmit={handleCreate}
          //   setClass={setSelectedClass}
          //   setProduct={setProduct}
          //   setAttributes={setAttributes}
          //   defaultImages={images}
          //   setDefaultImages={setImages}
          // />
          <>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="mb-4">
                <Label>Product Name</Label>
                <InputField
                  inputType="text"
                  readOnly={true}
                  id="productName"
                  value={getProductName()}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label>Brand</Label>
                  <SelectField
                    id="brand"
                    onChange={async (e) => {
                      setProduct({
                        ...defaultProduct,
                        brand: e.target.value,
                      });
                      setSelectedBrand(e.target.value);
                      setAttributes({} as JSON);
                    }}
                    value={selectedBrand}
                    validation={{ required: true }}
                    data={brands}
                    placeholder="Select Brand"
                    register={register}
                  />
                </div>
                <div>
                  <Label>Manufacturer</Label>

                  <InputField
                    inputType="text"
                    onChange={(e) => {
                      setSelectedManufacturer(e.target.value);
                      setAttributes({} as JSON);
                    }}
                    register={register}
                    id="manufacturer"
                    validation={{ required: true }}
                    value={selectedManufacturer}
                    readOnly={true}
                  />
                </div>
                <div>
                  <Label>Model</Label>
                  <SelectField
                    id="model"
                    validation={{ required: true }}
                    onChange={(e) => {
                      setSelectedModel(e.target.value);
                      setProduct({
                        ...defaultProduct,
                        model: e.target.value,
                      });
                      setAttributes({} as JSON);
                    }}
                    register={register}
                    data={models}
                    value={selectedModel}
                    placeholder="Select Model"
                  />
                </div>
                <div>
                  <Label>Variety</Label>
                  <InputField
                    id="variety"
                    inputType="text"
                    onChange={(e) => {
                      setSelectedVariety(e.target.value);
                      setProduct({
                        ...defaultProduct,
                        variety: e.target.value,
                      });
                      setValue("variety", e.target.value);
                    }}
                    value={selectedVariety}
                  />
                </div>
                <div>
                  <Label>Class</Label>
                  <SelectField
                    id="classEntity"
                    validation={{ required: true }}
                    onChange={(e) => {
                      setSelectedClass(e.target.value);
                      setProduct({
                        ...defaultProduct,
                        class: e.target.value,
                      });
                      setAttributes({} as JSON);
                    }}
                    register={register}
                    value={selectedClass}
                    data={classes}
                    placeholder="Select Class"
                  />
                </div>
                <div>
                  <Label>Measure</Label>

                  <SelectField
                    id="measure"
                    validation={{ required: true }}
                    onChange={(e) => {
                      setSelectedMeasure(e.target.value);
                      setProduct({
                        ...defaultProduct,
                        measure: e.target.value,
                      });
                    }}
                    value={selectedMeasure}
                    register={register}
                    data={[
                      { id: "Count", name: "Count" },
                      { id: "Weight", name: "Weight" },
                      { id: "Volume", name: "Volume" },
                    ]}
                    placeholder="Select Measure"
                  />
                </div>
                <div>
                  <Label>Manufacturer's Item Number</Label>
                  <InputField
                    id="manufacturerItemNumber"
                    inputType="text"
                    readOnly={false}
                    onChange={(e) => {
                      setSelectedItemNumber(e.target.value);
                      setProduct({
                        ...defaultProduct,
                        itemNumber: e.target.value,
                      });
                    }}
                    value={selectedItemNumber}
                    placeholder="Manufacturer's Item Number"
                    register={register}
                  />
                </div>
                <div>
                  <Label>List Price</Label>

                  <InputField
                    id="price"
                    inputType="number"
                    onChange={(e) => {
                      setSelectedListPrice(e.target.value);
                      setProduct({
                        ...defaultProduct,
                        price: e.target.value,
                      });
                    }}
                    value={selectedListPrice}
                    placeholder="List Price"
                    register={register}
                    step={0.01}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <Label>Promo Item</Label>
                  <Controller
                    name="isPromoItem"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value}
                        onChange={field.onChange}
                        className={`${
                          field.value ? "bg-indigo-600" : "bg-gray-200"
                        } relative inline-flex h-6 w-11 items-center rounded-full`}
                      >
                        <span
                          className={`${
                            field.value ? "translate-x-6" : "translate-x-1"
                          } inline-block h-4 w-4 transform bg-white rounded-full`}
                        />
                      </Switch>
                    )}
                  />
                </div>
                <div>
                  <Label>Promo Code</Label>
                  <InputField
                    id="promotionCode"
                    inputType="text"
                    placeholder="Promo Code"
                    onChange={(e) => {
                      setSelectedPromoCode(e.target.value);
                      setProduct({
                        ...defaultProduct,
                        promoCode: e.target.value,
                      });
                    }}
                    value={selectedPromoCode}
                    register={register}
                  />
                </div>
                <div>
                  <Label>Manufacturer Facility</Label>
                  <InputField
                    id="manufacturerFacility"
                    inputType="text"
                    onChange={(e) => {
                      setSelectedFacility(e.target.value);
                      setProduct({
                        ...defaultProduct,
                        facility: e.target.value,
                      });
                    }}
                    value={selectedFacility}
                    placeholder="Manufacturer Facility"
                    register={register}
                  />
                </div>
                <div>
                  <Label>Channel</Label>
                  <Controller
                    name="channel"
                    control={control}
                    render={({ field }) => (
                      <SelectMultiField
                        id="channel"
                        {...field}
                        data={channels}
                        onChange={(e) => {
                          setSelectedChannels(e);
                          setProduct({
                            ...defaultProduct,
                            channels: e,
                          });
                        }}
                        value={selectedChannels}
                      ></SelectMultiField>
                    )}
                  />
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                  <Label>Images</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    {images.length == 0 && (
                      <div className="text-m font-light">
                        Add images using the documents section below
                      </div>
                    )}
                    {images.map((img: any, index: any) => (
                      <div key={index} className="relative">
                        <img
                          src={img.url}
                          alt={img.name}
                          className="h-24 w-24 object-cover rounded-md"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="py-4">
                <div className="text-xl h-16 bg-gray-100 flex justify-between py-4 mb-2">
                  <div className="self-center ml-2">Locations</div>
                  <div
                    className="justify-self-end h-8 w-8 self-center mr-2"
                    onClick={() => setViewLocation(!viewLocation)}
                  >
                    {viewLocation ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </div>
                </div>
                <div className="ml-2">
                  {viewLocation && <InventoryTable data={inventoryData} />}
                </div>
              </div>

              <div className="py-4">
                <div className="text-xl h-16 bg-gray-100 flex justify-between py-4 mb-2">
                  <div className="self-center ml-2">Relationships</div>
                  <div
                    className="justify-self-end h-8 w-8 self-center mr-2"
                    onClick={() => setViewRelations(!viewRelations)}
                  >
                    {viewRelations ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </div>
                </div>
                <div className="ml-2">
                  {viewRelations && (
                    <div>
                      <RelationshipsField productId={10} />
                    </div>
                  )}
                </div>
              </div>

              <div className="py-4">
                <div className="text-xl h-16 bg-gray-100 flex justify-between py-4 mb-2">
                  <div className="self-center ml-2">Documents</div>
                  <div
                    className="justify-self-end h-8 w-8 self-center mr-2"
                    onClick={() => setViewDocuments(!viewDocuments)}
                  >
                    {viewDocuments ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </div>
                </div>
                <div className="ml-2">
                  {viewDocuments && (
                    <div>
                      <ImageDrop
                        defaultImages={images}
                        setDefaultImages={setImages}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-2">
                <button type="submit" className="btn btn-blue">
                  Submit
                </button>

                <button
                  type="reset"
                  className="btn btn-gray"
                  onClick={() => handleClear()}
                >
                  Clear
                </button>
              </div>
            </form>
          </>
        );
      case "Attributes":
        return (
          <AttributeForm
            attributes={attributes}
            setAttributes={setAttributes}
            selectedClass={selectedClass}
          />
        );
      case "U/M (Items)":
        return (
          <SimpleTable
            columns={[
              { header: "U/M", key: "umType" },
              { header: "QOH", key: "qoh" },
              {
                header: "Discontinued",
                key: "status",
                customRender: (item) =>
                  item.status === "active" ? "No" : "Yes",
              },
              {
                header: "Online",
                key: "isOnline",
                customRender: (item) => (item.isOnline ? "Yes" : "No"),
              },
              { header: "List Price", key: "listPrice" },
              { header: "Avg. Cost", key: "averageCost" },
              { header: "SZ Margin", key: "szMargin" },
            ]}
            data={UMItems}
          ></SimpleTable>
        );
      case "Gallery":
        return (
          <div>
            <GalleryForm images={images} setImages={setImages} />
          </div>
        );
    }
  };

  return (
    <div>
      <TabsMenu
        currentPage={selectedPage}
        tabs={tabs}
        handleTabChange={setSelectedPage}
      />
      {renderForm()}
    </div>
  );
};

export default withAuth(ProductForm);
