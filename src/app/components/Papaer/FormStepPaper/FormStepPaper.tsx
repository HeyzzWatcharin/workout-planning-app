import { ChildrenProps } from "@/types/form";
import React from "react";

const FormStepPaper: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div className="p-12 rounded-3xl bg-white shadow-lg flex flex-col items-center">
      <div className="flex flex-col gap-3 px-[60px] py-[50px] text-black w-full">
        {children}
      </div>
    </div>
  );
};

export default FormStepPaper;
