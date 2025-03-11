import bcrypt from "bcrypt";

const hashPassword = async (plainPass) => {
  const saltRounds = 10;
  let salt = await bcrypt.genSalt(saltRounds);
  let hashedPass = await bcrypt.hash(plainPass, salt);
  return hashedPass;
};

const checkPassword = async (hashedPass, plainPass) => {
  let res = await bcrypt.compare(plainPass, hashedPass);
  return res;
};

export { hashPassword, checkPassword };
