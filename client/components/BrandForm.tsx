import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { fetchManufacturersForSelection } from "@/lib/api/Manufacturer";
import { fetchClassesForSelection } from "@/lib/api/Class";
import SelectField from "./SelectField";
import SelectMultiField from "./SelectMultiField";
import InputField from "./InputField";
import Label from "./Label";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type BrandFormProps = {
  initialData?: Brand;
  onSubmit: (data: any) => void | Promise<void>;
};

const BrandForm = ({ initialData, onSubmit }: BrandFormProps) => {
  const router = useRouter();

  const [name, setName] = useState(initialData?.name || "");
  const [manufacturer, setManufacturer] = useState(
    initialData?.manufacturer
      ? {
          value: initialData.manufacturer.id,
          label: initialData.manufacturer.name,
        }
      : null
  );
  const [classes, setClasses] = useState<any>(
    initialData?.brandClasses.map((cls) => ({
      value: cls.classEntity.id,
      label: cls.classEntity.name,
    })) || []
  );
  const [narrative, setNarrative] = useState(initialData?.narrative || "");
  const [discontinued, setDiscontinued] = useState(
    initialData?.discontinued || false
  );
  const [isActive, setIsActive] = useState<boolean>(
    initialData?.isActive || true
  );
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [availableClasses, setAvailableClasses] = useState<Class[]>([]);

  useEffect(() => {
    fetchManufacturersForSelection().then((data) => {
      setManufacturers(data);
    });
    fetchClassesForSelection().then((data) => {
      setAvailableClasses(data);
    });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const payload = {
      name,
      classes: classes.map((cls: any) => cls.value),
      narrative,
      discontinued: discontinued ? "active" : "inactive",
      isActive,
      updatedBy: "1", // Replace with actual user context
      manufacturerId: manufacturer?.value,
    };
    console.log(payload);
    // await onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <Label>Brand Full Name</Label>
        <InputField
          id="brandFullName"
          inputType="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required={true}
        />
      </div>
      <div className="mb-4">
        <Label>Manufacturer</Label>
        <SelectField
          id="manufacturer"
          value={manufacturer?.value}
          onChange={(e) =>
            setManufacturer({
              value: Number(e.target.value),
              label: String(e.target.options[e.target.selectedIndex].text),
            })
          }
          data={manufacturers}
        />
      </div>
      <div className="mb-4">
        <Label>Class</Label>
        <SelectMultiField
          id="classes"
          data={availableClasses}
          required={true}
          onChange={setClasses}
          value={classes}
        />
      </div>
      <div className="mb-4">
        <Label>Narrative</Label>
        <ReactQuill
          value={narrative}
          onChange={setNarrative}
          className="mt-1"
        />
      </div>
      <div className="mb-4 flex items-center">
        <Label className=" mr-2">Discontinued</Label>
        <input
          type="checkbox"
          checked={discontinued}
          onChange={(e) => setDiscontinued(e.target.checked)}
          className="form-checkbox h-5 w-5 text-indigo-600"
        />
      </div>
      <div className="mb-4 flex items-center">
        <Label className=" mr-2">Active</Label>
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="form-checkbox h-5 w-5 text-indigo-600"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          SAVE
        </button>
        <button
          type="button"
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2"
          onClick={() => router.push("/brand/listing")}
        >
          CANCEL
        </button>
      </div>
    </form>
  );
};

export default BrandForm;
