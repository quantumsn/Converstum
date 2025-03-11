import { Schema } from "mongoose";
import mongoose from "mongoose";

const contactSchema = new Schema(
  {
    owener: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    contacts: [
      {
        nickname: {
          type: String,
          required: true,
        },
        contactId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
