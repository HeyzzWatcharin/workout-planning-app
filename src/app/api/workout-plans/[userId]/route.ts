import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/libs/mongodb";
import WorkoutPlan from "@/models/WorkoutPlan";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  await dbConnect();

  try {
    const plans = await WorkoutPlan.find({ userId }).sort({ createdAt: -1 });
    if (!plans || plans.length === 0) {
      return NextResponse.json(
        { message: "No workout plans found for this user" },
        { status: 404 }
      );
    }
    return NextResponse.json(plans);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching workout plans" },
      { status: 500 }
    );
  }
}
