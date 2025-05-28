import dotenv from "dotenv";
import { askGPT } from "../src/utils/openai";

dotenv.config(); // 루트 기준으로 명

console.log('실행은 되니?');

console.log("ENV KEY:", process.env.OPENAI_API_KEY); 

(async () => {
  const res = await askGPT("이번 달 식비가 너무 높아요. 어떻게 해야 할까요?");
  console.log("GPT 응답:", res);
})();
