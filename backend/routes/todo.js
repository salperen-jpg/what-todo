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

export default router;
