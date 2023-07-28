import express from "express";
const router = express.Router();

import {
  getTodos,
  addTodo,
  getSingleTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.js";

router.route("/").get(getTodos).post(addTodo);
router.route("/:id").get(getSingleTodo).patch(updateTodo).delete(deleteTodo);

export default router;
