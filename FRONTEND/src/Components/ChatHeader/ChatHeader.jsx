import CloseIcon from "@mui/icons-material/Close";
import { useChatClose } from "../../Context/ChatCloseProvidor";
import socket from "../../socket";
import { useEffect, useState } from "react";

export default function ChatHeader() {
  const { closeChat, chatUser } = useChatClose();
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    socket.emit("checkOnlineStatus", chatUser.originalId || chatUser._id);

    socket.on("onlineStatus", ({ chatUserId, isOnline }) => {
      if (chatUserId === chatUser.originalId || chatUserId === chatUser._id) {
        setIsOnline(isOnline);
      }
    });

    return () => {
      socket.off("onlineStatus");
    };
  }, [chatUser]);

  const handleCloseChat = () => {
    closeChat();
  };

  return (
    <div className="flex justify-between p-4 bg-customColor">
      <div className="flex">
        <p className="bg-green-500 rounded-full w-12 h-12 text-center text-4xl ">
          {chatUser.username
            ? chatUser.username[0].toUpperCase()
            : chatUser.nickname[0].toUpperCase()}
        </p>
        <div className="flex flex-col ml-4">
          <h4 className="text-lg font-semibold">
            {chatUser.username
              ? chatUser.username[0].toUpperCase() + chatUser.username.slice(1)
              : chatUser.nickname[0].toUpperCase() + chatUser.nickname.slice(1)}
          </h4>
          <p className="text-sm text-gray-400">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <button
        onClick={handleCloseChat}
        className="bg-customColor text-white p-2 rounded-lg"
      >
        <CloseIcon />
      </button>
    </div>
  );
}
