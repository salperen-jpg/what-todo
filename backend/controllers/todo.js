import Todo from "../models/Todo.js";
import { BadRequest, NotFound } from "../errors/CustomError.js";
import { StatusCodes } from "http-status-codes";
const getTodos = async (req, res) => {
  const todos = await Todo.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ todos, msg: "Success" });
};

const addTodo = async (req, res) => {
  const { todo, isCompleted } = req.body;
  const { userId, role } = req.user;
  if (!todo) {
    throw new BadRequest("Please provide the values");
  }
  const newTodo = await Todo.create({ todo, isCompleted, createdBy: userId });
  res.status(StatusCodes.CREATED).json({ todo: newTodo });
};

const getSingleTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  res.status(StatusCodes.OK).json({ todo });
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { todo, isCompleted } = req.body;
  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { todo, isCompleted },
    {
      new: true,
      overwrite: true,
    }
  );
  res.send({ todo: updatedTodo });
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const deletedTodo = await Todo.findByIdAndDelete(id);
  res.status(200).json({
    todo: deletedTodo,
    msg: "succes",
  });
};

export { getTodos, addTodo, getSingleTodo, updateTodo, deleteTodo };
