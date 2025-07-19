import CloseIcon from "@mui/icons-material/Close";
import { useChatClose } from "../../Context/ChatCloseProvidor";
import socket from "../../socket";
import { useEffect, useState } from "react";
import ContactDetailsTab from "../ContactDetailsTab/ContactDetailsTab";

export default function ChatHeader() {
  const { closeChat, chatUser } = useChatClose();
  const [isOnline, setIsOnline] = useState(false);
  const [open, setOpen] = useState(false);

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

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <>
      <ContactDetailsTab toggleDrawer={toggleDrawer} open={open} />
      <div
        onClick={() => toggleDrawer(true)}
        className="flex p-4 bg-customColor"
      >
        <div className="flex items-center flex-1 cursor-pointer">
          <div className="flex">
            <p className="bg-green-500 rounded-full w-12 h-12 text-center text-4xl ">
              {chatUser.username
                ? chatUser.username[0].toUpperCase()
                : chatUser.nickname[0].toUpperCase()}
            </p>
            <div className="flex flex-col ml-4">
              <h4 className="text-lg font-semibold">
                {chatUser.username
                  ? chatUser.username[0].toUpperCase() +
                    chatUser.username.slice(1)
                  : chatUser.nickname[0].toUpperCase() +
                    chatUser.nickname.slice(1)}
              </h4>
              <p className="text-sm text-gray-400">
                {isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleCloseChat}
          className="bg-customColor text-white p-2 rounded-lg"
        >
          <CloseIcon />
        </button>
      </div>
    </>
  );
}
