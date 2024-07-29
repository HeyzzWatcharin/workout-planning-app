import React from "react";
import Button from "../../Button";
import { FormButtonProps } from "@/types/component";

const FormButton = ({
  step,
  prevStep,
  nextStep,
  loading,
  onSavePlan,
}: FormButtonProps) => {
  return (
    <div className="self-center justify-center gap-6 flex mt-10">
      {step && step > 1 && <Button onClick={prevStep}>Back</Button>}
      {step && step < 3 && (
        <Button
          className={`""
            ${
              loading
                ? "!bg-gray-300 hover:!bg-gray-300 cursor-not-allowed border border-transparent !text-gray-400 hover:!text-gray-400"
                : "!bg-gray-900 hover:!bg-transparent !text-gray-100 hover:!text-gray-900 py-4 px-8 border border-transparent hover:!border-gray-900 font-semibold"
            }`}
          onClick={nextStep}
          disabled={loading}
        >
          Next
        </Button>
      )}
      {step === 3 && (
        <>
          {" "}
          <Button
            className={`""
       ${
         loading
           ? "!bg-gray-300 hover:!bg-gray-300 cursor-not-allowed border border-transparent !text-gray-400 hover:!text-gray-400"
           : "!bg-gray-900 hover:!bg-transparent !text-gray-100 hover:!text-gray-900 py-4 px-8 border border-transparent hover:!border-gray-900 font-semibold"
       }`}
            onClick={onSavePlan}
            disabled={loading}
          >
            Save Plan
          </Button>
          <Button
            className={`""
       ${
         loading
           ? "!bg-gray-300 hover:!bg-gray-300 cursor-not-allowed border border-transparent !text-gray-400 hover:!text-gray-400"
           : "!bg-gray-900 hover:!bg-transparent !text-gray-100 hover:!text-gray-900 py-4 px-8 border border-transparent hover:!border-gray-900 font-semibold"
       }`}
            type="submit"
            disabled={loading}
          >
            Create Plan
          </Button>
        </>
      )}
    </div>
  );
};

export default FormButton;
