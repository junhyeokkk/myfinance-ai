import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { analyzeExpenses } from "../controllers/ai.controller";

const router = Router();

router.use(authenticateJWT); // 라우터 전체에 인증 적용

router.post('/analyze', analyzeExpenses);

export default router;
