import { Router } from "express";
import wrapAsync from "../utilit/wrapAsync.js";
import checkAuth from "../middleware.js";
import CustomError from "../utilit/customError.js";

import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

const router = Router();

router.post(
  "/:chatId",
  checkAuth,
  wrapAsync(async (req, res) => {
    const { chatId } = req.params;
    const { participants, lastMessage } = req.body;

    const exitingChat = await Chat.findOne({ chatId });
    if (exitingChat) {
      await Chat.findByIdAndUpdate(exitingChat._id, { lastMessage });
      res.status(200).json({ message: "Chat already exists" });
    } else {
      if (!participants)
        throw new CustomError(
          "Participants and last message are required",
          400
        );

      const chat = new Chat({ chatId, participants, lastMessage });
      await chat.save();

      res.status(201).json({ message: "Chat created successfully" });
    }
  })
);

router.get(
  "/:chatId",
  checkAuth,
  wrapAsync(async (req, res) => {
    const { chatId } = req.params;
    const chat = await Chat.findOne({ chatId });
    if (!chat) throw new CustomError("Chat not found", 404);
    // const messages = await Message.find({ chatId });
    res.status(200).json(chat);
  })
);

export default router;
