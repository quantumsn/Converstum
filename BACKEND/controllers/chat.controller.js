import CustomError from "../utilit/customError.js";
import Chat from "../models/chat.model.js";
import Contact from "../models/contacts.model.js";

const getChats = async (req, res) => {
  let chats = await Chat.find({ participants: req.user._id })
    .populate("participants", "username email savedContact")
    .populate("lastMessage")
    .select("lastMessage chatId createdAt updatedAt");

  let contacts = await Promise.all(
    chats.map(async (chat) => {
      let contact = chat.participants.find(
        (participant) => participant._id != req.user._id
      );

      // console.log(chat);

      let isSavedContact = await Contact.findOne({
        owner: req.user._id,
        email: contact.email,
      });

      if (!isSavedContact || isSavedContact == null) {
        contact.username = contact.email;
      } else {
        contact.username = isSavedContact.nickname;
        contact.savedContact = true;
      }

      return {
        contact,
        chatId: chat.chatId,
        lastMessage: chat.lastMessage,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
      };
    })
  );

  res.status(200).json({ chats: contacts, user: req.user });
};

const createChat = async (req, res) => {
  const { chatId } = req.params;
  const { participants, lastMessage } = req.body;

  const exitingChat = await Chat.findOne({ chatId });
  if (exitingChat) {
    await Chat.findByIdAndUpdate(exitingChat._id, { lastMessage });
    res.status(200).json({ message: "Chat already exists" });
  } else {
    if (!participants)
      throw new CustomError("Participants and last message are required", 400);

    const chat = new Chat({ chatId, participants, lastMessage });
    await chat.save();

    res.status(201).json({ message: "Chat created successfully" });
  }
};

export { getChats, createChat };
