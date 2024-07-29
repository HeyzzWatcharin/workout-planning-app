import Input from "@/app/components/Input";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const FormStep1 = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className="text-gray-900 text-4xl font-semibold mb-4">
        Enter Information
      </div>
      <div className="text-gray-400 text-lg mb-7">
        Note: Answer these questions as if you would a person
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-lg font-normal">Plan Name (Require)</label>
        <Controller
          name="planName"
          control={control}
          render={({ field }) => (
            <input
              className="p-2 border border-gray-300 rounded-lg mb-3 bg-slate-50"
              {...field}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-lg font-normal">Date of Birth (Require)</label>
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field }) => (
            <input
              className="p-2 border border-gray-300 rounded-lg mb-3 bg-slate-50"
              type="date"
              {...field}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-lg font-normal">Height (Require)</label>
        <Controller
          name="height"
          control={control}
          render={({ field }) => (
            <input
              className="p-2 border border-gray-300 rounded-lg mb-3 bg-slate-50"
              {...field}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-lg font-normal">
          Weight (Require)
        </label>
        <Controller
          name="weight"
          control={control}
          render={({ field }) => (
            <input
              className="p-2 border border-gray-300 rounded-lg mb-3 bg-slate-50"
              {...field}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-3">
        <label>Weekly Activities (Optional)</label>
        <Controller
          name="weeklyActivities"
          control={control}
          render={({ field }) => (
            <input
              className="p-2 border border-gray-300 rounded-lg mb-3 bg-slate-50"
              placeholder="optional"
              {...field}
            />
          )}
        />
      </div>
    </>
  );
};

export default FormStep1;
