import jwt from "jsonwebtoken";

const initializeSocketIO = (io) => {
  return io.on("connection", (socket) => {
    let username = null;
    console.log("New client connected:", socket.id);
    if (socket.handshake.headers.cookie) {
      let token = socket.handshake.headers.cookie.split("=")[1];
      const decoded = jwt.verify(token, process.env.SECRET);
      console.log(decoded);
      username = decoded.username;
    }

    socket.on("joinRoom", ({ userId, friendID }) => {
      let roomId = [userId, friendID].sort().join("-");
      socket.join(roomId);
      console.log(`${username} joined room: ${roomId}`);
      console.log("Rooms:", socket.rooms);
    });

    socket.on("msg", (data) => {
      console.log("Data from client", data);
      // io.emit("msg", { msg: data, id: socket.id });
      io.to(data.roomId).emit("msg", { msg: data.msg, id: socket.id });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export default initializeSocketIO;
