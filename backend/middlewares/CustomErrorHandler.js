import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors/CustomError.js";

const customErrorHandler = (err, req, res, next) => {
  console.log(err);
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "Please try again later." });
};

export default customErrorHandler;
