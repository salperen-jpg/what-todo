import { Router } from "express";
const router = Router();
import { login, register } from "../controllers/user.js";
import { userValidation } from "../middlewares/validation.js";

router.post("/register", userValidation, register);
router.post("/login", login);

export default router;
