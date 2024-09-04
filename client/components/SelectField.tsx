"use client";

interface InputProps {
  id: string;
  readOnly?: boolean;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  register?: (name: string, validation?: any) => any;
  validation?: object;
  data?: any[];
  value?: any;
  required?: boolean;
}

const SelectField: React.FC<InputProps> = ({
  id,
  readOnly = false,
  placeholder,
  onChange,
  onBlur,
  register,
  validation,
  data,
  value,
  required = false,
}) => {
  const registerProps = register
    ? register(id, validation ? validation : {})
    : {};
  return (
    <select
      value={value}
      id={id}
      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
      {...registerProps}
      onChange={(e) => {
        if (registerProps.onChange) registerProps.onChange(e);
        if (onChange) onChange(e);
      }}
      onBlur={(e) => {
        if (registerProps.onBlur) registerProps.onBlur(e);
        if (onBlur) onBlur(e);
      }}
      readOnly={readOnly}
    >
      <option>{placeholder}</option>
      {data?.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
};
export default SelectField;
