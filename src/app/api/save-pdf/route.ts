import { generatePdf } from "@/libs/pdf";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { plan, planName } = body;

    if (!plan || !planName) {
      return NextResponse.json(
        { message: "Plan and PlanName are required" },
        { status: 400 }
      );
    }

    const pdfBytes = await generatePdf(body);

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=plan.pdf",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error generating PDF" },
      { status: 500 }
    );
  }
}
