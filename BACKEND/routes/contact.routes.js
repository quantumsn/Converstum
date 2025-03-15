import { Router } from "express";
import wrapAsync from "../utilit/wrapAsync.js";
import checkAuth from "../middleware.js";

import User from "../models/user.model.js";

const router = Router();

router.get(
  "/",
  checkAuth,
  wrapAsync(async (req, res) => {
    const contacts = await User.find().select("username email");
    res.status(200).json({ contacts, user: req.user });
  })
);

export default router;
