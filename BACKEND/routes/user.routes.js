import { Router } from "express";
import wrapAsync from "../utilit/wrapAsync.js";
import { loginUser, registerUser } from "../controllers/user.controller.js";

const router = Router();

router.post("/register", wrapAsync(registerUser));

router.post("/login", wrapAsync(loginUser));

router.get("/logout", (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    // secure: true,
    // sameSite: "None",
  });
  res.status(200).send({ message: "Logged out successfully" });
});

export default router;
