import CustomError from "../utilit/customError.js";
import User from "../models/user.model.js";
import Contact from "../models/contacts.model.js";

const createContact = async (req, res) => {
  const { nickname, email } = req.body;
  const existUser = await User.findOne({ email });
  if (!existUser || existUser == null)
    throw new CustomError("User not exist or Write correct email", 400);
  const newContact = new Contact({
    owner: req.user._id,
    nickname: nickname.toLowerCase(),
    email: email.toLowerCase(),
    originalId: existUser._id,
  });
  await newContact.save();
  res.status(200).json({ message: "Contact added successfully" });
};

const getContacts = async (req, res) => {
  const contacts = await Contact.find({ owner: req.user._id });

  res.status(200).json(contacts);
};

const searchContacts = async (req, res) => {
  let { nickname } = req.query;
  if (!nickname) throw new CustomError("Please provide nickname", 400);
  let contacts = await Contact.find({
    owner: req.user._id,
    nickname: { $regex: nickname, $options: "i" },
  }).populate("owner", "email username");
  res.status(200).json(contacts);
};

export { createContact, getContacts, searchContacts };
