import { getExpensesByMonthService } from './expense.service';
import { askGPT } from '../utils/openai';
import Expense, { IExpense } from '../models/Expense';

export const generateBudgetAdvice = async (userId: string, month: string) => {
  const expenses = await getExpensesByMonthService(userId, month);

  if (!expenses.length) {
    return {
      message: '해당 월의 소비 내역이 없습니다.',
    };
  }

  const summary = summarizeExpensesByCategory(expenses);

  const prompt = `
  다음은 사용자의 ${month} 소비 요약입니다:\n
  ${JSON.stringify(summary, null, 2)}
  
  위 데이터를 기반으로 다음과 같은 예산 조언을 해주세요:
  1. 어떤 소비 항목에서 절약이 가능한지
  2. 절약 이유와 구체적인 조언
  3. 월간 예산 목표를 어떻게 설정하면 좋을지
  `;

  const aiComment = await askGPT(prompt);

  return {
    summary,
    aiComment,
  };
};

// 간단한 카테고리별 합산 함수
function summarizeExpensesByCategory(expenses: IExpense[]) {
  const summary: Record<string, number> = {};
  for (const e of expenses) {
    const cat = e.category || '기타';
    summary[cat] = (summary[cat] || 0) + e.amount;
  }
  return summary;
}