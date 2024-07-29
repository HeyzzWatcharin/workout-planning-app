import { WorkoutPlanType } from "@/types/model";
import mongoose from "mongoose";

const WorkoutPlanSchema = new mongoose.Schema<WorkoutPlanType>(
  {
    userId: {
      type: String,
      required: true,
    },
    planName: { type: String, required: true },
    plan: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform: function (_, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

const WorkoutPlan =
  mongoose.models.WorkoutPlan ||
  mongoose.model<WorkoutPlanType>("WorkoutPlan", WorkoutPlanSchema);

export default WorkoutPlan;
