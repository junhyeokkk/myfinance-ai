import express from 'express';
import { authenticateJWT, AuthRequest } from '../middlewares/authMiddleware';

const router = express.Router();

// router.get('/mypage', authenticateJWT, (req, res) => {
//     const authReq = req as AuthRequest;  // 타입 단언
//     const user = authReq.user;
//
//     if (!user) {
//         // 혹시 인증이 안 되어 user가 없으면 에러 처리
//         return res.status(401).json({ error: '사용자 정보가 없습니다.' });
//     }
//
//     res.json({ message: '개인 정보 접근 성공', user });
// });

export default router;
