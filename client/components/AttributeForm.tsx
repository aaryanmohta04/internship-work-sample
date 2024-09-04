import { fetchClassById } from "@/lib/api/Class";
import { useState, useEffect } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";

interface AttributeFormProps {
  selectedClass: any;
  attributes: Record<string, any> | undefined;
  setAttributes: any;
}

const AttributeForm: React.FC<AttributeFormProps> = ({
  selectedClass,
  attributes = {},
  setAttributes,
}) => {
  const [classData, setClassData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedClass) {
        const data = await fetchClassById(selectedClass);
        setClassData(data);
      }
    };

    fetchData();
  }, [selectedClass]);

  const handleInputChange = (fieldName: string, value: any) => {
    setAttributes({
      ...attributes,
      [fieldName]: value,
    });
  };

  const renderInputField = (attribute: any) => {
    const defaultValue = attributes[attribute.displayName] || "";

    switch (attribute.type) {
      case "CheckBox":
        return (
          <div key={attribute.id}>
            <label>
              <input
                type="checkbox"
                name={attribute.fieldName}
                defaultChecked={defaultValue === "true"}
                onChange={(e) =>
                  handleInputChange(
                    attribute.displayName,
                    e.target.checked ? "true" : "false"
                  )
                }
              />
              {attribute.displayName}
            </label>
          </div>
        );
      case "TextBox":
        return (
          <div key={attribute.id}>
            <label>
              {attribute.displayName}
              <InputField
                inputType={attribute.isInteger ? "number" : "text"}
                id={attribute.fieldName}
                required={attribute.isRequired}
                value={defaultValue}
                onChange={(e) =>
                  handleInputChange(attribute.displayName, e.target.value)
                }
              />
            </label>
          </div>
        );
      case "DropDown":
        const transformedData = attribute.values.map((value: string) => ({
          id: value,
          name: value,
        }));
        return (
          <div key={attribute.id}>
            <label>
              {attribute.displayName}
              <SelectField
                id={attribute.fieldName}
                required={attribute.isRequired}
                data={transformedData}
                placeholder={`Select ${attribute.displayName}`}
                value={defaultValue}
                onChange={(e) =>
                  handleInputChange(attribute.displayName, e.target.value)
                }
              />
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {selectedClass ? (
        classData && classData.classAttributes.length > 0 ? (
          classData.classAttributes.map((classAttribute: any) =>
            renderInputField(classAttribute.attribute)
          )
        ) : (
          <div>No attributes available for this class.</div>
        )
      ) : (
        <div>Select a Class first!</div>
      )}
    </div>
  );
};

export default AttributeForm;
