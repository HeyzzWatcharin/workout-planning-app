import { OpenAI } from "openai";
import { FormData } from "@/types/form";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generate = async (prompt: string) => {
  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    stream: true,
  });
  return response;
};

export const generatePromptWorkoutGoal = (formData: FormData) => {
  return `Based on the following information, create up to 5 workout goals. Each goal should be a maximum of 50 characters:
  
  Plan Name: ${formData.planName}
  Date of Birth: ${formData.dateOfBirth}
  Height: ${formData.height}
  Weight: ${formData.weight}
  Weekly Activities: ${formData.weeklyActivities}
  
  Provide concise workout goals for the user.`;
};

export const generatePromptSummary = (formData: FormData) => {
  return `Based on the following information, create a weekly workout plan summary for the user. The summary should include details of exercises for each day from Monday to Sunday, specifying the activities, duration (in minutes), number of exercises, and any precautions the user should take. The summary should be concise and no longer than 2000 characters.
Format:
Summary Detail:\n
[Overall health details of the user, referred to the user with the word you]\n
\n
  Plan Name: ${formData.planName}\n
  Date of Birth: ${formData.dateOfBirth}\n
  Height: ${formData.height}\n
  Weight: ${formData.weight}\n
  Weekly Activities: ${formData.weeklyActivities}\n
  Workout Goal: ${formData.workoutGoal}\n
\n
Monday:\n -[Activity], [Duration] minutes, [Number of Exercises] exercises. Precautions: [Precautions]\n
Tuesday:\n -[Activity], [Duration] minutes, [Number of Exercises] exercises. Precautions: [Precautions]\n
Wednesday:\n -[Activity], [Duration] minutes, [Number of Exercises] exercises. Precautions: [Precautions]\n
Thursday:\n -[Activity], [Duration] minutes, [Number of Exercises] exercises. Precautions: [Precautions]\n
Friday:\n -[Activity], [Duration] minutes, [Number of Exercises] exercises. Precautions: [Precautions]\n
Saturday:\n -[Activity], [Duration] minutes, [Number of Exercises] exercises. Precautions: [Precautions]\n
Sunday:\n -[Activity], [Duration] minutes, [Number of Exercises] exercises. Precautions: [Precautions]\n
\n
You body in next month:\n -[You in next month]\n
Caution:\n -[Caution]`;
};