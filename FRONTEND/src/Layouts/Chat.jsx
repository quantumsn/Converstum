import { ChatHeader, ChatBody, InputBox } from "../Components";
import { useState } from "react";
import socket from "../socket";
import { useEffect } from "react";
import { useChatClose } from "../Context/ChatCloseProvidor";
import api from "../api";

export default function Chat() {
  const [msg, setmsg] = useState("");
  const [messages, setMessages] = useState([]);

  let { roomId, userId, chatUser } = useChatClose();

  useEffect(() => {
    socket.on("msg", (data) => {
      setMessages((prevMsges) => [...prevMsges, data]);
    });

    return () => {
      socket.off("msg");
    };
  }, []);

  useEffect(() => {
    if (roomId != null) {
      api
        .get(`messages/${roomId}`)
        .then((res) => {
          setMessages(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    setMessages([]);
  }, [roomId]);

  const sendMsg = async (e) => {
    e.preventDefault();
    if (msg != "" || msg != null) {
      socket.emit("msg", {
        content: msg,
        sender: userId,
        receiver: chatUser._id,
        roomId,
        createdAt: new Date().toISOString(),
      });

      try {
        let res = await api.post(`messages/${roomId}`, {
          content: msg,
          sender: userId,
          receiver: chatUser._id,
        });
        console.log(res.data);
      } catch (err) {
        console.error(err.response.data);
      }

      try {
        let res = await api.post(`chat/${roomId}`, {
          participants: [userId, chatUser._id],
          lastMessage: msg,
        });
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    setmsg("");
  };

  return (
    <div className="h-screen w-4/6 flex flex-col bg-gradient-to-r from-blue-800 via-gray-950 to-purple-800 text-white">
      <ChatHeader />
      <ChatBody chatMessages={messages} socketId={socket.id} />
      <InputBox
        msg={msg}
        handleMsgInputBox={(msg) => setmsg(msg)}
        sendMsg={sendMsg}
      />
    </div>
  );
}
