import express from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import {createExpense, getExpensesByMonth} from "../controllers/expense.controller";

const router = express.Router();

router.post('/expenses', authenticateJWT, createExpense);

export default router;