import express from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import {createExpense, deleteExpense, getExpensesByMonth, updateExpense} from "../controllers/expense.controller";

const router = express.Router();

router.post('/expenses', authenticateJWT, createExpense);
router.get('/expenses', authenticateJWT, getExpensesByMonth);
router.patch('/expenses/:id', authenticateJWT, updateExpense);
router.delete('/expenses/:id', authenticateJWT, deleteExpense);

export default router;