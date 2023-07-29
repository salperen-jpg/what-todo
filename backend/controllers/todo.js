import Todo from "../models/Todo.js";
import { BadRequest, NotFound } from "../errors/CustomError.js";
import { StatusCodes } from "http-status-codes";
const getTodos = async (req, res) => {
  const todos = await Todo.find({});
  res.status(StatusCodes.OK).json({ todos, msg: "Success" });
};

const addTodo = async (req, res) => {
  const { todo } = req.body;
  if (!todo) {
    throw new BadRequest("Please provide the values");
  }
  const newTodo = await Todo.create({ todo });
  res.status(StatusCodes.CREATED).json({ todo: newTodo });
};

const getSingleTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  if (!todo) throw new NotFound(`No todo with the id : ${id}`);
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
  if (!updateTodo) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No todo with the id : ${id}` });
  }
  res.send({ todo: updatedTodo });
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const deletedTodo = await Todo.findByIdAndDelete(id);
  if (!deletedTodo) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No todo with the id : ${id}` });
  }
  res.status(200).json({
    todo: deletedTodo,
    msg: "succes",
  });
};

export { getTodos, addTodo, getSingleTodo, updateTodo, deleteTodo };
