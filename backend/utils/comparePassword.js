import bcrypt from "bcryptjs";

const comparePassword = async (password, hashedPassword) => {
  const isPasswordsMatched = await bcrypt.compare(password, hashedPassword);
  return isPasswordsMatched;
};

export default comparePassword;
