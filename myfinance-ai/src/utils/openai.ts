import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config(); // 루트 기준으로 명

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 반드시 .env에 존재해야 함
});

export const askGPT = async (prompt: string): Promise<string> => {
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", // 또는 "gpt-3.5-turbo"
    messages: [
      {
        role: "system",
        content: "당신은 소비 습관을 분석하고 똑똑한 예산 조언을 해주는 개인 금융 코치입니다.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
  });

  return res.choices[0]?.message?.content?.trim() || "";
};
