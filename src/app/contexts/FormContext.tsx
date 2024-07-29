import React, { createContext, useContext } from "react";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { multipleStepFormSchema } from "@/types/multipleFormSchema";
import { FormData } from "@/types/form";

const FormContext = createContext<UseFormReturn<FormData> | undefined>(
  undefined
);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

const schema = multipleStepFormSchema;

interface FormProviderProps {
  children: React.ReactNode;
}

export const FormProviderWrapper: React.FC<FormProviderProps> = ({
  children,
}) => {
  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      planName: "",
      dateOfBirth: new Date(),
      height: 0,
      weight: 0,
      weeklyActivities: "",
    },
  });

  return (
    <FormContext.Provider value={methods}>
      <FormProvider {...methods}>{children}</FormProvider>
    </FormContext.Provider>
  );
};
