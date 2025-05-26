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
      if (data.chatId === roomId) {
        setMessages((prevMsges) => [...prevMsges, data]);
      }
    });

    return () => {
      socket.off("msg");
    };
  }, [roomId]);

  useEffect(() => {
    if (roomId != null) {
      api
        .get(`messages/${roomId}`)
        .then((res) => {
          setMessages(res.data);
        })
        .catch((err) => {
          console.error(err.response.data);
        });
    }
    setMessages([]);
  }, [roomId]);

  const sendMsg = async (e) => {
    e.preventDefault();

    try {
      let msgRes = await api.post(`messages/${roomId}`, {
        content: msg,
        sender: userId,
        receiver: chatUser.originalId || chatUser._id,
      });

      let chatRes = await api.post(`chats/${roomId}`, {
        participants: [userId, chatUser.originalId || chatUser._id],
        lastMessage: msgRes.data._id,
      });

      socket.emit("msg", {
        _id: msgRes.data._id,
        content: msg,
        chatId: roomId,
        sender: userId,
        receiver: chatUser.originalId || chatUser._id,
        createdAt: msgRes.data.createdAt,
        isRead: false,
      });
      console.log(chatRes.data);
      console.log(msgRes.data);
    } catch (err) {
      console.error(err.response);
    }

    try {
    } catch (err) {
      console.error(err);
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
