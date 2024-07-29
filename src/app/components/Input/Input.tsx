import React from "react";
import { useFormContext } from "react-hook-form";

interface InputProps {
  InputLabel: string;
  type?: string;
  require?: boolean;
  fieldName: string;
}

const Input = ({
  InputLabel,
  type,
  require = false,
  fieldName,
}: InputProps) => {
  const { register } = useFormContext();
  return (
    <>
      <label className="text-lg font-normal">{InputLabel}</label>
      <input
        type={type}
        className="p-2 border border-gray-300 rounded-lg mb-3"
        {...register(fieldName, { required: require })}
      />
    </>
  );
};

export default Input;
