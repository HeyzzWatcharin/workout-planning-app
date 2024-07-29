import * as yup from "yup";

export const multipleStepFormSchema = yup.object({
  planName: yup.string().required("Plan Name is required"),
  dateOfBirth: yup.date().required("Date of Birth is required"),
  height: yup.number().required("Height is required"),
  weight: yup.number().required("Weight is required"),
  weeklyActivities: yup.string().optional(),
  workoutGoal: yup.string().required("Workout Goal is required"),
  plan: yup.string(),
});
