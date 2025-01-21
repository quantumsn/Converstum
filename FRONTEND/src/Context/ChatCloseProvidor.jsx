import React, { createContext, useState, useContext } from "react";

const ChatCloseContext = createContext();

export const ChatCloseProvider = ({ children }) => {
  const [chatClose, setChatClose] = useState(true);

  return (
    <ChatCloseContext.Provider value={{ chatClose, setChatClose }}>
      {children}
    </ChatCloseContext.Provider>
  );
};

export const useChatClose = () => {
  return useContext(ChatCloseContext);
};
