const getTodos = async (req, res) => {
  res.status(200).send("Here already");
};

const addTodo = async (req, res) => {};

const getSingleTodo = async (req, res) => {
  const { id } = req.params;
  res.status(200).send("single todo");
};

const updateTodo = async (req, res) => {};

const deleteTodo = async (req, res) => {};

export { getTodos, addTodo, getSingleTodo, updateTodo, deleteTodo };
