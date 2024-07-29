import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/libs/mongodb";
import WorkoutPlan from "@/models/WorkoutPlan";


export async function GET(req: NextRequest) {
  await dbConnect();

  const plans = await WorkoutPlan.find();
  return NextResponse.json(plans);
}

export async function POST(req: NextRequest) {
  await dbConnect();

  const data = await req.json();
  const newPlan = new WorkoutPlan(data);
  await newPlan.save();
  return NextResponse.json(newPlan);
}