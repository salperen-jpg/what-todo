import { Todo } from "../models/Todo.js";

const getTodos = async (req, res) => {
  const todos = await Todo.find({});
  res.status(200).send({ todos, msg: "Success" });
};

const addTodo = async (req, res) => {
  const { todo } = req.body;
  if (!todo) {
    throw new Error("Please provide the values");
  }
  const newTodo = await Todo.create({ todo });
  res.status(200).json({ todo: newTodo });
};

const getSingleTodo = async (req, res) => {
  const { id } = req.params;
  res.status(200).send("single todo");
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { todo, isCompleted } = req.body;
  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: id },
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
  const deletedTodo = await Todo.findOneAndDelete({ _id: id });
  console.log(deletedTodo);
  res.send("Generic message!");
};

export { getTodos, addTodo, getSingleTodo, updateTodo, deleteTodo };
