import { Router } from "express";
const router = Router();
import { login, register, logout } from "../controllers/user.js";
import {
  userValidation,
  userLoginValidation,
} from "../middlewares/validation.js";

router.post("/register", userValidation, register);
router.post("/login", userLoginValidation, login);
router.get("/logout", logout);

export default router;
