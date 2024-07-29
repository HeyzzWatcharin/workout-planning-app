import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { FormData } from "@/types/form";

export async function generatePdf(data: FormData): Promise<Uint8Array> {
  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;
    const maxWidth = 550;
    const existPlan = data.plan
      ? wrapText(maxWidth, font, fontSize, 100, data.plan.replace(/\n/g, " "))
      : "-";
    const textContent = [
      `Plan Name: ${data.planName}`,
      `Date of Birth: ${data.dateOfBirth}`,
      `Height: ${data.height} cm`,
      `Weight: ${data.weight} kg`,
      `Workout Goal: ${data.workoutGoal}`,
      `Weekly Activities: ${data.weeklyActivities || "Not specified"}`,
      `Plan: ${existPlan || "Not specified"}`,
    ];

    const { height } = page.getSize();
    let yPosition = height - fontSize;

    textContent.forEach((line) => {
      const wrappedLines = wrapText(maxWidth, font, fontSize, 100, line);
      wrappedLines.forEach((wrappedLine) => {
        page.drawText(wrappedLine, {
          x: 25,
          y: yPosition,
          size: fontSize,
          font: font,
          color: rgb(0, 0, 0),
        });
        yPosition -= fontSize + 5;
      });
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Error generating PDF");
  }
}

const wrapText = (
  maxWidth: number,
  font: any,
  fontSize: number,
  maxCharsPerLine: number,
  text: string
): string[] => {
  let line = "";
  const lines: string[] = [];

  if (text) {
    const words = text.split(" ");
    words.forEach((word) => {
      const testLine = line + (line ? " " : "") + word;
      if (
        font.widthOfTextAtSize(testLine, fontSize) > maxWidth ||
        testLine.length > maxCharsPerLine
      ) {
        if (line.length > 0) {
          lines.push(line);
        }
        line = word;
      } else {
        line = testLine;
      }
    });

    if (line.length > 0) {
      lines.push(line);
    }
  }

  return lines;
};
