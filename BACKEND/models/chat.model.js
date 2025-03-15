import { Schema } from "mongoose";
import mongoose from "mongoose";

const chatSchema = new Schema({
  chatId: {
    type: String,
    required: true,
  },
  participants: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  lastMessage: {
    type: String,
    required: true,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
