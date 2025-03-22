import { Router } from "express";
import wrapAsync from "../utilit/wrapAsync.js";
import checkAuth from "../middleware.js";
import CustomError from "../utilit/customError.js";

import Message from "../models/message.model.js";
import Chat from "../models/chat.model.js";

const router = Router();

router.post(
  "/:chatId",
  checkAuth,
  wrapAsync(async (req, res) => {
    const { chatId } = req.params;
    const { sender, content, receiver } = req.body;

    const existsChat = await Chat.find({ chatId });

    if (existsChat) {
      const message = new Message({ chatId, sender, content, receiver });
      await message.save();
      res.status(201).json({ message: "Message sent successfully" });
    } else {
      throw new CustomError("Chat does not exists", 404);
    }
  })
);

router.get(
  "/:chatId",
  checkAuth,
  wrapAsync(async (req, res) => {
    const { chatId } = req.params;
    const messages = await Message.find({ chatId });
    if (!messages) throw new CustomError("No messages found", 404);
    res.status(200).json(messages);
  })
);

export default router;
