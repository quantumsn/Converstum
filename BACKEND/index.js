import "dotenv/config";
import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Socket ID : ", socket.id);

  socket.on("msg", (data) => {
    console.log("Data from client", data);
    io.emit("msg", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const port = process.env.PORT;
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
