import { Router } from "express";
import wrapAsync from "../utilit/wrapAsync.js";
import checkAuth from "../middleware.js";
import {
  getMessages,
  sentMessage,
  updateMessage,
} from "../controllers/meesage.controller.js";

const router = Router();

router.post("/:chatId", checkAuth, wrapAsync(sentMessage));

router.put("/:id/edit", checkAuth, wrapAsync(updateMessage));

router.get("/:chatId", checkAuth, wrapAsync(getMessages));

export default router;
