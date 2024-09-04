import { useState } from "react";
import { Switch } from "@headlessui/react";
import InputField from "./InputField";
import Label from "./Label";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface RoleFormProps {
  initialData?: { name: string; isActive: boolean };
  onSubmit: (data: { name: string; status: boolean }) => void;
  onCancel: () => void;
}

const RoleForm: React.FC<RoleFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [status, setStatus] = useState(initialData?.isActive || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, status });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-md">
      <div>
        <h2 className="text-lg font-bold text-blue-600 mb-4">
          User Role Information
        </h2>
        <div className="mb-4">
          <Label>Role Name:</Label>
          <InputField
            id="name"
            inputType="text"
            required={true}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex items-center mb-4">
          <Label className=" mr-2 ">Is Active?</Label>
          <Switch
            checked={status}
            onChange={setStatus}
            className={classNames(
              status ? "bg-green-600" : "bg-gray-200",
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            )}
          >
            <span
              className={classNames(
                status ? "translate-x-6" : "translate-x-1",
                "inline-block h-4 w-4 transform bg-white rounded-full transition-transform"
              )}
            />
          </Switch>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            SAVE
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            CANCEL
          </button>
        </div>
      </div>
    </form>
  );
};

export default RoleForm;
