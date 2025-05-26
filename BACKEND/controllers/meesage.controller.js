import CustomError from "../utilit/customError.js";
import Message from "../models/message.model.js";
import Chat from "../models/chat.model.js";

const sentMessage = async (req, res) => {
  const { chatId } = req.params;
  const { sender, content, receiver } = req.body;

  const existsChat = await Chat.find({ chatId });

  if (existsChat) {
    const message = new Message({ chatId, sender, content, receiver });
    let savedMsg = await message.save();
    res.status(201).json({
      message: "Message sent successfully",
      _id: savedMsg._id,
      createdAt: savedMsg.createdAt,
    });
  } else {
    throw new CustomError("Chat does not exists", 404);
  }
};

const updateMessage = async (req, res) => {
  const { id } = req.params;
  const { isRead } = req.body;
  const updatedMessage = await Message.findByIdAndUpdate(
    id,
    { isRead },
    { runValidators: true }
  );

  res.status(200).json(updatedMessage);
};

const getMessages = async (req, res) => {
  const { chatId } = req.params;
  const messages = await Message.find({ chatId });
  if (!messages) throw new CustomError("No messages found", 404);
  res.status(200).json(messages);
};

export { sentMessage, getMessages, updateMessage };
