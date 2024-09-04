import { useState } from "react";
import Label from "./Label";
import { Switch } from "@headlessui/react";

export type CustomerGroup = {
  id?: number;
  name: string;
  status: string;
  customerCount?: number;
};

type CustomerGroupFormProps = {
  initialData?: CustomerGroup;
  onSubmit: (data: CustomerGroup) => void | Promise<void>;
};

export default function CustomerGroupForm({
  initialData,
  onSubmit,
}: CustomerGroupFormProps) {
  const [name, setName] = useState<string>(initialData?.name || "");

  const [discontinued, setDiscontinued] = useState<boolean>(
    initialData?.status == "inactive" ? true : false
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentCustomerGroup: CustomerGroup = {
      name: name,
      status: discontinued ? "inactive" : "active",
    };
    onSubmit(currentCustomerGroup);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Group Name*</Label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Discontinued
        </label>
        <Switch
          checked={discontinued}
          onChange={setDiscontinued}
          className={`${discontinued ? "bg-red-600" : "bg-gray-200"}
                relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span
            aria-hidden="true"
            className={`${discontinued ? "translate-x-5" : "translate-x-0"}
                pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
          />
        </Switch>
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
