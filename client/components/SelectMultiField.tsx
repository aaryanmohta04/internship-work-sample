"use client";
import Select from "react-select";
import { forwardRef, useId } from "react";

interface InputProps {
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  register?: (name: string, validation?: any) => any;
  validation?: object;
  data?: any[];
  value?: any;
  required?: boolean;
}

//value should be in a "value, label" object array form, and data should be in a "name, data" object array form. 
const SelectMultiField: React.FC<InputProps> = forwardRef(
  (
    {
      id,
      onChange,
      onBlur,
      register,
      validation,
      data,
      value,
      required = false,
    },
    ref
  ) => {
    const registerProps = register
      ? register(id, validation ? validation : {})
      : {};
    return (
      <Select
        ref={ref}
        instanceId={useId()}
        isMulti
        value={value}
        id={id}
        className="mt-1 rounded-md w-full"
        {...registerProps}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          if (registerProps.onChange) registerProps.onChange(e);
          if (onChange) onChange(e);
        }}
        onBlur={(e) => {
          if (registerProps.onBlur) registerProps.onBlur(e);
          if (onBlur) onBlur(e);
        }}
        required={required}
        options={data?.map((item) => ({ value: item.id, label: item.name }))}
      ></Select>
    );
  }
);
export default SelectMultiField;
