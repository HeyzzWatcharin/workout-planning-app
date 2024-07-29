import Button from "@/app/components/Button";
import Loading from "@/app/components/Loading";
import { formatSummaryPlan } from "@/app/utils/form";
import { FormStepReviewProps } from "@/types/component";
import React from "react";
import { useFormContext } from "react-hook-form";

const FormStepReview: React.FC<FormStepReviewProps> = ({
  loading,
  onRegenerate,
}) => {
  const { getValues } = useFormContext();
  const { plan } = getValues();
  return (
    <>
      <div className="text-gray-900 text-4xl font-semibold mb-4">
        Save or Regenerate Workout Plan
      </div>
      {!loading && plan !== "" ? (
        <div>
          <div className="text-gray-900 text-lg mb-4">
            {formatSummaryPlan(plan)}
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

export default FormStepReview;
