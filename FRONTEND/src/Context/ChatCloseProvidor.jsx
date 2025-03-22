import React, { createContext, useState, useContext } from "react";

const ChatCloseContext = createContext();

export const ChatCloseProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [chatClose, setChatClose] = useState(true);
  const [chatUser, setChatUser] = useState(null);
  const [roomId, setRoomId] = useState(null);

  const openChat = (chatUserData, roomId) => {
    setChatClose(false);
    setChatUser(chatUserData);
    setRoomId(roomId);
  };

  const closeChat = () => {
    setChatClose(true);
    setChatUser(null);
    setRoomId(null);
  };

  return (
    <ChatCloseContext.Provider
      value={{
        chatClose,
        openChat,
        userId,
        setUserId,
        closeChat,
        chatUser,
        roomId,
      }}
    >
      {children}
    </ChatCloseContext.Provider>
  );
};

export const useChatClose = () => {
  return useContext(ChatCloseContext);
};
