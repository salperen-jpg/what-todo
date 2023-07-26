import express from "express";
import dotenv from "dotenv";
dotenv.config();
import todoRouter from "./routes/todo.js";
import "express-async-errors";
import morgan from "morgan";
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// middlewares
// access to body
app.use(express.json());
// routes
app.use("/api/v1/todos", todoRouter);

// errors
import notFound from "./middlewares/not-found.js";
app.use(notFound);
// startup
const PORT = process.env.port || 5000;

const startUp = async () => {
  // connect to db later on
  try {
    app.listen(PORT, () => console.log(`server is listening on port  ${PORT}`));
  } catch (error) {}
};

startUp();
