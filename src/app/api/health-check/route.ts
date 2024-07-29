import dbConnect from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();
  return NextResponse.json({ message: "Connected to MongoDB successfully" });
}
