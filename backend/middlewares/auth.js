import { Unauthenticated } from "../errors/CustomError.js";
import { verifyToken } from "../utils/token.js";

export const auth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new Unauthenticated("Unauthorized");
  try {
    const { userId, role } = verifyToken(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new Unauthenticated("Unauthorized");
  }
};
