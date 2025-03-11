import { ChatHeader, ChatBody, InputBox } from "../Components";
import { useState } from "react";
import socket from "../socket";
import { useEffect } from "react";

export default function Chat() {
  const [msg, setmsg] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("msg", (data) => {
      setMessages((prevMsges) => [...prevMsges, data]);
    });

    return () => {
      socket.off("msg");
    };
  }, []);

  const sendMsg = (e) => {
    e.preventDefault();
    socket.emit("msg", msg);
    setmsg("");
  };

  return (
    <div className="h-screen w-4/6 flex flex-col bg-gradient-to-r from-blue-800 via-gray-950 to-purple-800 text-white">
      <ChatHeader />
      <ChatBody messages={messages} socketId={socket.id} />
      <InputBox
        msg={msg}
        handleMsgInputBox={(msg) => setmsg(msg)}
        sendMsg={sendMsg}
      />
    </div>
  );
}
