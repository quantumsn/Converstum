import { Schema } from "mongoose";
import mongoose from "mongoose";

const chatSchema = new Schema(
  {
    chatId: {
      type: String,
      required: true,
      unique: true,
    },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
