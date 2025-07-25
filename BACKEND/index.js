import "dotenv/config";
import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import CustomError from "./utilit/customError.js";
import initializeSocketIO from "./socket.js";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import messageRoutes from "./routes/message.routes.js";

const dbUrl = process.env.ATLASDB_URL;

main()
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

initializeSocketIO(io);

app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/user", userRoutes);
app.use("/api/contacts", contactRoutes);

app.all("/api/*", (req, res, next) => {
  throw new CustomError("Page Not Found", 404);
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went Wrong" } = err;
  res.status(statusCode).json({
    error: message,
  });
});

const port = process.env.PORT || 3000;
httpServer
  .listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
  });
