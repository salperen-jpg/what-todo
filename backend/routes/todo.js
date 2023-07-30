import express from "express";
const router = express.Router();

import {
  getTodos,
  addTodo,
  getSingleTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.js";
import { idValidation, todoValidation } from "../middlewares/validation.js";

router.route("/").get(getTodos).post(todoValidation, addTodo);
router
  .route("/:id")
  .get(idValidation, getSingleTodo)
  .patch(idValidation, todoValidation, updateTodo)
  .delete(idValidation, deleteTodo);

export default router;
