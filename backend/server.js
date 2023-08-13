import "express-async-errors";
import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cookieParser from "cookie-parser";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// middlewares
// access to body
app.use(express.json());
app.use(cookieParser());
import { auth } from "./middlewares/auth.js";

// routes
import todoRouter from "./routes/todo.js";
import userRouter from "./routes/user.js";
app.use("/api/v1/todos", auth, todoRouter);
app.use("/api/v1/auth", userRouter);

// errors
import notFound from "./middlewares/not-found.js";
import customErrorHandler from "./middlewares/CustomErrorHandler.js";
app.use(notFound);
app.use(customErrorHandler);

// startup
const PORT = process.env.port || 5000;

import { connectToDB } from "./db/connect.js";
const startUp = async () => {
  // connect to db later on
  try {
    await connectToDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`server is listening on port  ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startUp();
