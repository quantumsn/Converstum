import { Router } from "express";
import wrapAsync from "../utilit/wrapAsync.js";
import checkAuth from "../middleware.js";

import User from "../models/user.model.js";
import Chat from "../models/chat.model.js";

const router = Router();

router.get(
  "/",
  checkAuth,
  wrapAsync(async (req, res) => {
    // const contacts = await User.find().select("username email");
    let chats = await Chat.find({ participants: req.user._id })
      .populate("participants", "username email")
      .select("lastMessage createdAt updatedAt");

    let contacts = chats.map((chat) => {
      let contact = chat.participants.find(
        (participant) => participant._id != req.user._id
      );
      return {
        contact,
        lastMessage: chat.lastMessage,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
      };
    });
    // console.log(contacts);

    res.status(200).json({ chats: contacts, user: req.user });
  })
);

export default router;
