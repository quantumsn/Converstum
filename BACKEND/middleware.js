import jwt from "jsonwebtoken";
import CustomError from "./utilit/customError.js";

const checkAuth = (req, res, next) => {
  const token = req.headers.cookie?.split("=")[1];

  if (!token) {
    throw new CustomError("You must be logged in", 401);
  } else {
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      next(err);
    }
  }
};

export default checkAuth;
