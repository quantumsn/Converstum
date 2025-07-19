import { ChatHeader, ChatBody, InputBox, Loader } from "../Components";
import { useState } from "react";
import socket from "../socket";
import { useEffect } from "react";
import { useChatClose } from "../Context/ChatCloseProvidor";
import api from "../api";
import { useFlashMsgContext } from "../Context/FlashMsgProvidor";

export default function Chat() {
  const [msg, setmsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [loading, setLoading] = useState(false);

  let { roomId, userId, chatUser } = useChatClose();
  let { setFlashMsg } = useFlashMsgContext();

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
      setLoading(true);

      api
        .get(`messages/${roomId}`)
        .then((res) => {
          setMessages(res.data);
        })
        .catch((err) => {
          setFlashMsg({
            content: err.response.data.error,
            status: "failed",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setMessages([]);
  }, [roomId]);

  const sendMsg = async (e) => {
    e.preventDefault();
    if (msg.trim() === "") return;
    setIsSending(true);
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
        receiverUsername: msgRes.data.receiverUsername,
        senderUsername: msgRes.data.senderUsername,
      });
    } catch (err) {
      setFlashMsg({
        content: err.response.data.error,
        status: "failed",
      });
    } finally {
      setIsSending(false);
    }

    setmsg("");
  };

  return (
    <div className="h-screen w-4/6 flex flex-col bg-gradient-to-r from-blue-800 via-gray-950 to-purple-800 text-white">
      <ChatHeader />

      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <ChatBody chatMessages={messages} socketId={socket.id} />
      )}
      <InputBox
        msg={msg}
        handleMsgInputBox={(msg) => setmsg(msg)}
        sendMsg={sendMsg}
        isSending={isSending}
      />
    </div>
  );
}
