import { param, query, body, validationResult } from "express-validator";
import { BadRequest } from "../errors/CustomError.js";
import mongoose from "mongoose";

const validationWithErrorHandler = (chainValues) => {
  return [
    chainValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errMessages = errors.array().map((err) => err.msg);
        throw new BadRequest(errMessages);
      }
      next();
    },
  ];
};

const todoChain = () =>
  body("todo")
    .notEmpty()
    .withMessage("Please provide the todo!")
    .isLength({ min: 3, max: 100 })
    .withMessage("Todo must be between 3 char and 100 char!");

export const todoValidation = validationWithErrorHandler(todoChain());

// id validation

const idParamChain = () =>
  param("id")
    .custom((value) => {
      console.log(value);
      return mongoose.Types.ObjectId.isValid(value);
    })
    .withMessage("Unmatched id param");

export const idValidation = validationWithErrorHandler(idParamChain());
