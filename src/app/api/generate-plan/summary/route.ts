import { NextRequest, NextResponse } from "next/server";
import { generate, generatePromptSummary } from "@/libs/openai";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();
    const propmtCommand = generatePromptSummary(formData);

    const response = await generate(propmtCommand);
    const stream = response.toReadableStream();

    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let result = "";

    return new Promise((resolve, reject) => {
      function read() {
        reader
          .read()
          .then(({ done, value }) => {
            if (done) {
              const parsedResult = result
                .trim()
                .split("\n")
                .map((line) => JSON.parse(line));

              const content = parsedResult
                .map((chunk) => chunk.choices[0].delta.content)
                .filter(Boolean)
                .join("");

              resolve(NextResponse.json({ plan: content }));
              return;
            }
            result += decoder.decode(value, { stream: true });
            read();
          })
          .catch(reject);
      }
      read();
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "unknown error" }, { status: 500 });
  }
}
