import { ChildrenProps } from "@/types/form";
import React from "react";

const Paper: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div className="min-h-screen py-[60px] px-[150px] flex-col justify-center items-center w-full">
      {children}
    </div>
  );
};

export default Paper;
