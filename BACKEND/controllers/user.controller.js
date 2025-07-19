import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { hashPassword, checkPassword } from "../utilit/passwordHash&Check.js";
import CustomError from "../utilit/customError.js";

const registerUser = async (req, res) => {
  const { email, username, password } = req.body;
  const hashedPassword = await hashPassword(password);

  const existingUser = await User.findOne({
    $or: [{ username: username.trim() }, { email: email.trim() }],
  });
  if (existingUser) {
    throw new CustomError(
      "Username or Email already exists, please try another one.",
      400
    );
  }

  const newUser = new User({
    username: username.trim(),
    email: email.trim(),
    password: hashedPassword,
  });
  const savedUser = await newUser.save();

  let payload = { _id: savedUser._id, username: savedUser.username };
  let secret = process.env.SECRET;
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: "7d",
  });
  res.cookie("authToken", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    // sameSite: "None", // Cross-origin
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ message: "Welcome Bhoiya" });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  let userData = await User.findOne({ username });

  if (userData != null) {
    let isPasswordCorrect = await checkPassword(userData.password, password);
    if (isPasswordCorrect) {
      let payload = { _id: userData._id, username: userData.username };
      let secret = process.env.SECRET;
      const token = jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn: "7d",
      });
      res.cookie("authToken", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        // sameSite: "None", // Cross-origin
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ message: "Welcome Back Bhoiya" });
    } else {
      throw new CustomError("Password is incorrect", 401);
    }
  } else {
    throw new CustomError("Username is incorrect or User is not exist !", 401);
  }
};

export { registerUser, loginUser };
