import { Router } from "express";
import wrapAsync from "../utilit/wrapAsync.js";
import checkAuth from "../middleware.js";
import { createChat, getChats } from "../controllers/chat.controller.js";

const router = Router();

router.get("/", checkAuth, wrapAsync(getChats));

router.post("/:chatId", checkAuth, wrapAsync(createChat));

export default router;
