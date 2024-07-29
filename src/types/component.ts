import { User } from "firebase/auth";
import { PlanListType } from "./dashBoard";
import { ChildrenProps } from "./form";

interface ButtonType {
    onClick?: () => void;
    type?: "submit" | "reset" | "button";
    className?: string;
    disabled?: boolean;
  }
  
  export type ButtonProp = ChildrenProps & ButtonType;


  export interface LoaderProps {
    className?: string;
  }

  export interface TableProps {
    data?: PlanListType[];
    loading?: boolean;
  }

  export interface FormButtonProps {
    step: number;
    prevStep: () => void;
    nextStep: () => void;
    onSavePlan: () => void;
    loading: boolean;
  }

  export interface Step2Props {
    goals: string[];
    onRegenerate: () => Promise<void>;
    loading: boolean;
  }

  export interface FormStepReviewProps {
    onRegenerate: () => Promise<void>;
    loading: boolean;
  }
  
  export interface MultiStepFormProps {
    user: User | null;
  }