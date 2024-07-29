import { ReactNode } from "react";
import { InferType } from "yup";
import { multipleStepFormSchema } from "./multipleFormSchema";

export interface ChildrenProps {
  children: ReactNode;
}

export type FormData = InferType<typeof multipleStepFormSchema>;
