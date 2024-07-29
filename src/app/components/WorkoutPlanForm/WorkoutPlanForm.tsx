"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Step1 from "@/app/components/WorkoutPlanForm/MultiStepForm/FormStep1";
import Step2 from "@/app/components/WorkoutPlanForm/MultiStepForm/FormStep2";
import StepReview from "@/app/components/WorkoutPlanForm/MultiStepForm/FormStepReview";
import FormButton from "@/app/components/WorkoutPlanForm/FormButton";
import { processResponseData } from "@/app/utils/LLM";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { MultiStepFormProps } from "@/types/component";

const MultiStepForm: React.FC<MultiStepFormProps> = ({ user }) => {
  const methods = useForm();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [goals, setGoals] = useState<string[]>([]);
  const router = useRouter();

  const handleSendGenerateWorkoutSummary = async () => {
    try {
      setLoading(true);
      const formData = methods.getValues();
      const response = await fetch("/api/generate-plan/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      methods.setValue("plan", data.plan);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unexpected error occurred");
      }
    }
  };

  const handleSendGenerateWorkoutGoal = async () => {
    try {
      setLoading(true);
      const formData = methods.getValues();
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      const handleResponseFormat = processResponseData(data.data);
      setGoals(handleResponseFormat);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error generating workout goals:", err);
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unexpected error occurred");
      }
    }
  };

  const nextStep = async () => {
    methods.trigger();
    setStep(step + 1);

    switch (step) {
      case 1:
        await handleSendGenerateWorkoutGoal();
        break;

      case 2:
        await handleSendGenerateWorkoutSummary();
        break;

      default:
        break;
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const formData = methods.getValues();
      const response = await fetch("/api/workout-plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.uid,
          planName: formData.planName,
          plan: formData.plan,
        }),
      });
      setLoading(false);
      setTimeout(() => {
        router.push("/home");
      }, 2000);
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unexpected error occurred");
      }
    }
  };

  const onSavePlan = async () => {
    try {
      setLoading(true);
      const formData = methods.getValues();
      const response = await fetch("/api/save-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planName: formData.planName,
          dateOfBirth: formData.dateOfBirth,
          height: formData.height,
          weight: formData.weight,
          weeklyActivities: formData.weeklyActivities,
          workoutGoal: formData.workoutGoal,
          plan: formData.plan,
        }),
      });
      setLoading(false);
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "workout-planning.pdf";
        a.click();
        URL.revokeObjectURL(url);
      } else {
        console.error("Failed to download PDF");
      }
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unexpected error occurred");
      }
    }
  };

  const renderFormStep = (step: number) => {
    switch (step) {
      case 1: {
        return <Step1 />;
      }
      case 2: {
        return (
          <Step2
            loading={loading}
            goals={goals}
            onRegenerate={handleSendGenerateWorkoutGoal}
          />
        );
      }
      case 3: {
        return (
          <StepReview
            loading={loading}
            onRegenerate={handleSendGenerateWorkoutSummary}
          />
        );
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="text-black text-2xl self-center mb-8">
          STEP {step} OF 3
        </div>
        {renderFormStep(step)}

        <FormButton
          step={step}
          prevStep={prevStep}
          nextStep={nextStep}
          loading={loading}
          onSavePlan={onSavePlan}
        />
      </form>
    </FormProvider>
  );
};

export default MultiStepForm;
