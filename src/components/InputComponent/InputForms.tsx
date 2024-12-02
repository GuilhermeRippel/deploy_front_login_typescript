import React, { forwardRef } from "react";

type InputFormProps = {
  label: string;
  type: string;
  placeholder: string;
  children?: React.ReactNode;
};

const InputForms = forwardRef<HTMLInputElement, InputFormProps>(
  ({ label, type, placeholder, children }, ref) => {
    return (
      <div className="flex flex-col items-start w-[90%]">
        <label className="text-left mb-2 text-gray-700 font-medium">{label}</label>
        <div className="relative w-full">
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            className="bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent border border-gray-300 rounded-lg py-2 px-4 w-full shadow-md transition duration-200 ease-in-out"
          />
          {children && (
            <div className="absolute inset-y-0 right-4 flex items-center">{children}</div>
          )}
        </div>
      </div>
    );
  }
);

export default InputForms;
