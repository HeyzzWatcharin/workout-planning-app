import mongoose from "mongoose";

export interface InformationType {
  userId: mongoose.Schema.Types.ObjectId;
  planName: string;
  dateOfBirth: Date;
  height: string;
  weight: string;
  weeklyActivities?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserType {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkoutGoalType {
  userId: mongoose.Schema.Types.ObjectId;
  goal: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ExercisesPlanType {
  name: string;
  sets: number;
  reps: number;
}

interface PlanType {
  day: string;
  exercises: ExercisesPlanType[];
}

export interface WorkoutPlanType {
  userId: string;
  planName: string;
  plan: string;
  createdAt: Date;
  updatedAt: Date;
}
