"use client";

interface InputProps {
  id: string;
  inputType: string;
  readOnly?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: (name: string, validation?: any) => any;
  validation?: object;
  step?: number;
  required?: boolean;
}

const InputField: React.FC<InputProps> = ({
  id,
  inputType,
  readOnly = false,
  placeholder,
  value,
  onChange,
  onBlur,
  register,
  validation,
  step,
  required,
}) => {
  const registerProps = register
    ? register(id, validation ? validation : {})
    : {};
  return (
    <input
      id={id}
      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
      type={inputType}
      placeholder={placeholder}
      value={value}
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
      step={step}
      required={required}
    ></input>
  );
};
export default InputField;
