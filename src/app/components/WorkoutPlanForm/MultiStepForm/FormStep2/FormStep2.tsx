import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Button from "@/app/components/Button";
import Loading from "@/app/components/Loading";
import { Step2Props } from "@/types/component";

const FormStep2 = ({ goals, onRegenerate, loading }: Step2Props) => {
  const { control, setValue } = useFormContext();

  return (
    <>
      <div className="text-gray-900 text-4xl font-semibold mb-4">
        Enter Goal Plan
      </div>

      {!loading && goals.length > 0 ? (
        <div className="flex flex-col">
          <label className="text-lg font-normal">
            Select Goal Plan (Require)
          </label>
          <Controller
            name="workoutGoal"
            control={control}
            render={({ field }) => (
              <input
                className="p-2 border border-gray-300 rounded-lg my-3 bg-slate-50"
                {...field}
              />
            )}
          />
          <div className="text-center space-y-4 space-x-4">
            {goals.map((goal, index) => (
              <Button key={index} onClick={() => setValue("workoutGoal", goal)}>
                {goal}
              </Button>
            ))}
          </div>
          <div className="my-6 text-center space-y-4">
            <hr />
            <Button
              onClick={() => onRegenerate()}
              className="hover:bg-transparent px-4 py-2 text-sm hover:text-gray-900 hover:!border-gray-900 !rounded-2xl"
            >
              Regenerate Goals
            </Button>
            <hr />
          </div>
        </div>
      ) : (
        <div>
          <Loading className="h-auto my-12" />
        </div>
      )}
    </>
  );
};

export default FormStep2;
