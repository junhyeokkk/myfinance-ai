import { Router } from "express";
import {
  createExpense,
  getExpensesByMonth,
  updateExpense,
  deleteExpense,
  getMonthlyTotalAmount
} from "../controllers/expense.controller";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();

router.use(authenticateJWT); // 라우터 전체에 인증 적용

// 소비 내역 CRUD
router.post('/', createExpense);
router.get('/', getExpensesByMonth);
router.get('/summary', getMonthlyTotalAmount);
router.patch('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;
