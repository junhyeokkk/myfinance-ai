import {Router} from "express";
import {login, signup} from "../controllers/auth.controller";
import { loginValidator, signupValidator } from "../validators/authValidator";
import { validate } from "../middlewares/validate";

const router = Router();

router.post('/signup', signupValidator, validate, signup);
router.post('/login', loginValidator, validate, login);

export default router;