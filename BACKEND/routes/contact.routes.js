import { Router } from "express";
import wrapAsync from "../utilit/wrapAsync.js";
import checkAuth from "../middleware.js";
import CustomError from "../utilit/customError.js";

import User from "../models/user.model.js";
import Chat from "../models/chat.model.js";
import Contact from "../models/contacts.model.js";

const router = Router();

router.post(
  "/",
  checkAuth,
  wrapAsync(async (req, res) => {
    const { nickname, email } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser || existUser == null)
      throw new CustomError("User not exist or Write correct email", 400);
    const newContact = new Contact({ owner: req.user._id, nickname, email });
    await newContact.save();
    res.status(200).json({ message: "Contact added successfully" });
  })
);

router.get(
  "/",
  checkAuth,
  wrapAsync(async (req, res) => {
    let chats = await Chat.find({ participants: req.user._id })
      .populate("participants", "username email")
      .select("lastMessage createdAt updatedAt");

    let contacts = await Promise.all(
      chats.map(async (chat) => {
        let contact = chat.participants.find(
          (participant) => participant._id != req.user._id
        );

        let isSavedContact = await Contact.findOne({
          owner: req.user._id,
          email: contact.email,
        });

        if (!isSavedContact || isSavedContact == null) {
          contact.username = contact.email;
        } else {
          contact.username = isSavedContact.nickname;
        }

        // console.log(contact);

        return {
          contact,
          lastMessage: chat.lastMessage,
          createdAt: chat.createdAt,
          updatedAt: chat.updatedAt,
        };
      })
    );

    res.status(200).json({ chats: contacts, user: req.user });
  })
);

export default router;
