import { useState } from "react";
import InputField from "./InputField";
import Label from "./Label";

type Manufacturer = {
  id?: number;
  name: string;
  msaRequired: boolean;
  discontinued: boolean;
  active: boolean;
};

type ManufacturerFormProps = {
  initialData?: Manufacturer;
  onSubmit: (data: Manufacturer) => void | Promise<void>;
};

export default function ManufacturerForm({
  initialData,
  onSubmit,
}: ManufacturerFormProps) {
  console.log(initialData);
  const [name, setName] = useState<string>(initialData?.name || "");
  const [msaRequired, setMsaRequired] = useState<boolean>(
    initialData?.msaRequired || false
  );
  const [discontinued, setDiscontinued] = useState<boolean>(
    initialData?.discontinued || false
  );
  const [active, setActive] = useState<boolean>(initialData?.active || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, msaRequired, discontinued, active });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Name</Label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={msaRequired}
          onChange={(e) => setMsaRequired(e.target.checked)}
          className="form-checkbox h-5 w-5 text-indigo-600"
        />
        <Label className=" ml-2 ">MSA Required</Label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={discontinued}
          onChange={(e) => setDiscontinued(e.target.checked)}
          className="form-checkbox h-5 w-5 text-indigo-600"
        />
        <Label className=" ml-2 ">Discontinued</Label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
          className="form-checkbox h-5 w-5 text-indigo-600"
        />
        <Label className=" ml-2 ">Active</Label>
      </div>
      <div className="flex items-center space-x-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}
