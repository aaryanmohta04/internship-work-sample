import { useState } from "react";
import InputField from "./InputField";
import SelectMultiField from "./SelectMultiField";
import Label from "./Label";
type StoreFormProps = {
  initialData: Store;
  onSubmit: (data: Store) => void;
};

const storeTypes = [
  { id: "Chain", name: "Chain" },
  { id: "E-Commerce/Catalog", name: "E-Commerce/Catalog" },
  { id: "Multi-store", name: "Multi-store" },
  { id: "Single Store", name: "Single Store" },
  { id: "Vending", name: "Vending" },
  { id: "Wholesale", name: "Wholesale" },
];

export default function StoreForm({ initialData, onSubmit }: StoreFormProps) {
  const [formData, setFormData] = useState<Store>(initialData);
  const [selectedTypes, setSelectedTypes] = useState<any>(
    initialData?.type || []
  );
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formData.type = selectedTypes;
    onSubmit(formData);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>
          Warehouse (Store) Code
        </Label>
        <InputField
          inputType="text"
          id="code"
          value={formData.code}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div>
        <Label>
          Warehouse (Store) Name
        </Label>
        <InputField
          inputType="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div>
        <Label>
          Warehouse (Store) Type
        </Label>
        <SelectMultiField
          id="type"
          value={selectedTypes}
          onChange={setSelectedTypes}
          required={true}
          data={storeTypes}
        />
      </div>
      <div>
        <Label>
          Address
        </Label>
        <InputField
          inputType="text"
          id="address"
          value={formData.address}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div>
        <Label>City</Label>
        <InputField
          inputType="text"
          id="city"
          value={formData.city}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div>
        <Label>State</Label>
        <InputField
          inputType="text"
          id="state"
          value={formData.state}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div>
        <Label>
          Country
        </Label>
        <InputField
          inputType="text"
          id="country"
          value={formData.country}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div>
        <Label>
          Zipcode
        </Label>
        <InputField
          inputType="text"
          id="zipcode"
          value={formData.zipcode}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div>
        <Label>
          Phone #
        </Label>
        <InputField
          inputType="text"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Label>
          Discontinued:
        </Label>
        <input
          type="checkbox"
          id="discontinued"
          checked={formData.discontinued}
          onChange={handleSwitchChange}
          className="form-checkbox h-5 w-5 text-indigo-600"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300"
          onClick={() => handleSubmit}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
