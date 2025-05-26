import jwt from "jsonwebtoken";
import CustomError from "./utilit/customError.js";

const onlineUsers = [];

const initializeSocketIO = (io) => {
  io.use((socket, next) => {
    let token = socket.handshake.headers.cookie?.split("=")[1];
    if (token) {
      try {
        let decoded = jwt.verify(token, process.env.SECRET);
        socket.username = decoded.username;
        socket.userId = decoded._id;
        next();
      } catch (err) {
        console.log(err);
        throw new CustomError(err.name, 401);
      }
    }
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.username);

    onlineUsers.push(socket.userId);

    socket.on("checkOnlineStatus", (chatUserId) => {
      let isOnline = onlineUsers.includes(chatUserId);
      io.emit("onlineStatus", { chatUserId, isOnline });
    });

    socket.on("joinRoom", ({ userId, friendID }) => {
      let roomId = [userId, friendID].sort().join("-");
      socket.join(roomId);
      // console.log(`${socket.username} joined room: ${roomId}`);
    });

    socket.on("msg", (data) => {
      io.to(data.chatId).emit("msg", {
        id: data._id,
        content: data.content,
        chatId: data.chatId,
        sender: data.sender,
        receiver: data.receiver,
        createdAt: data.createdAt,
        isRead: data.isRead,
      });
      io.emit("newMsg", {
        id: data._id,
        content: data.content,
        chatId: data.chatId,
        sender: data.sender,
        receiver: data.receiver,
        createdAt: data.createdAt,
        isRead: data.isRead,
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.username);

      onlineUsers.splice(onlineUsers.indexOf(socket.userId), 1);
      io.emit("checkOnlineStatus", socket.userId);
      console.log(`${socket.username} is Offline`);
    });
  });
};

export default initializeSocketIO;
