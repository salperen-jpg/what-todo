import jwt from "jsonwebtoken";

const createToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
};

const verifyToken = (token) => {
  const isVerified = jwt.verify(token, process.env.JWT_SECRET);
  console.log(isVerified);
  return isVerified;
};

export { createToken, verifyToken };
