import { param, query, body, validationResult } from "express-validator";
import { BadRequest, NotFound } from "../errors/CustomError.js";
import mongoose from "mongoose";
import Todo from "../models/Todo.js";
import User from "../models/User.js";

const validationWithErrorHandler = (chainValues) => {
  return [
    chainValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errMessages = errors.array().map((err) => err.msg);
        if (errMessages[0].startsWith("Todo")) {
          throw new NotFound(errMessages);
        }
        throw new BadRequest(errMessages);
      }
      next();
    },
  ];
};

// todo validation
const todoChain = () => [
  body("todo")
    .notEmpty()
    .withMessage("Please provide the todo!")
    .isLength({ min: 3, max: 100 })
    .withMessage("Todo must be between 3 char and 100 char!"),
  body("isCompleted").notEmpty().withMessage("Please provide the completed!"),
];

export const todoValidation = validationWithErrorHandler(todoChain());

// id validation
const idParamChain = () =>
  param("id").custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequest("Invalid id parameter");
    const specificTodo = await Todo.findById(value);
    if (!specificTodo)
      throw new NotFound(`Todo is not found with the id : ${value}`);
  });

export const idValidation = validationWithErrorHandler(idParamChain());

// user login validation
const userParamChain = () => {
  return [
    body("name").notEmpty().withMessage("Name can not be empty"),
    body("email")
      .notEmpty()
      .withMessage("Mail can not be empty")
      .isEmail()
      .withMessage("Wrong format")
      .custom(async (value) => {
        const isEmailInUse = await User.findOne({ email: value });
        if (isEmailInUse) {
          throw new Error("Email already in use!!!");
        }
      }),
    body("password")
      .notEmpty()
      .withMessage("Password can not be empty")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ];
};

export const userValidation = validationWithErrorHandler(userParamChain());

// user register validation

const userLoginChain = () => [
  body("email")
    .notEmpty()
    .withMessage("Mail can not be empty")
    .isEmail()
    .withMessage("Wrong format"),
  body("password")
    .notEmpty()
    .withMessage("Password can not be empty")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const userLoginValidation = validationWithErrorHandler(userLoginChain());
