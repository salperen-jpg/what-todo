import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import hashPassword from "../utils/hashPassword.js";
import { Unauthenticated } from "../errors/CustomError.js";
import comparePassword from "../utils/comparePassword.js";
import { createToken } from "../utils/token.js";

const register = async (req, res) => {
  const isFirstUser = (await User.count()) === 0;
  req.body.role = isFirstUser ? "admin" : "user";

  req.body.password = await hashPassword(req.body.password);

  const user = await User.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "user created successfully !!!" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const thePerson = await User.findOne({ email });
  if (!thePerson) {
    throw new Unauthenticated("invalid credentials");
  }
  const isPassCorrect = await comparePassword(password, thePerson.password);
  if (!isPassCorrect) {
    throw new Unauthenticated("Wrong credentials");
  }

  const token = createToken({ userId: thePerson._id, role: thePerson.role });
  console.log(token);

  const oneDayInMs = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    expires: new Date(Date.now() + oneDayInMs),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json("User logged in!!!");
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(StatusCodes.OK).json({ msg: "Logged out" });
};

export { register, login, logout };
