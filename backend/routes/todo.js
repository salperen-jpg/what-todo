import express from "express";
const router = express.Router();

import {
  getTodos,
  addTodo,
  getSingleTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.js";

router.route("/").get(getTodos);
router.route("/:id").get(getSingleTodo);

export default router;
