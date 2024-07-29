export const formatSummaryPlan = (text: string) => {
    return text.split("\n").map((line, index) => (
      <p key={index} className="mb-2">
        {line}
      </p>
    ));
  };