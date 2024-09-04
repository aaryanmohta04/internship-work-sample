"use client";

interface InputProps {
  className?: string;
  children: string;
}

const Label: React.FC<InputProps> = ({ children, className }) => {
  const styling = className || "";
  return (
    <label
      className={"block text-sm font-medium text-gray-700" + styling}
    >{children}</label>
  );
};
export default Label;
