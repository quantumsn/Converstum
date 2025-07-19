import React from "react";
import { useContext, createContext, useState } from "react";

const FlashMsgContext = createContext();

export const FlashMsgProvidor = ({ children }) => {
  const [flashMsg, setFlashMsg] = useState(null);

  return (
    <FlashMsgContext.Provider value={{ flashMsg, setFlashMsg }}>
      {children}
    </FlashMsgContext.Provider>
  );
};

export const useFlashMsgContext = () => {
  return useContext(FlashMsgContext);
};
