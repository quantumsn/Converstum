import jwt from "jsonwebtoken";

const initializeSocketIO = (io) => {
  return io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);
    if (socket.handshake.headers.cookie) {
      let token = socket.handshake.headers.cookie.split("=")[1];
      const decoded = jwt.verify(token, process.env.SECRET);
      console.log(decoded);
    }

    socket.on("msg", (data) => {
      console.log("Data from client", data);
      io.emit("msg", { msg: data, id: socket.id });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export default initializeSocketIO;
