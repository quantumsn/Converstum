import { ChatCloseProvider } from "./Context/ChatCloseProvidor";
import { Outlet } from "react-router-dom";
import { FlashMsgProvidor } from "./Context/FlashMsgProvidor";
import { AuthProvidor } from "./Context/AuthProvidor";
import { useState, useEffect } from "react";

function App() {
  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileUA =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(
        userAgent
      );

    if (isMobileUA) {
      setAllowed(false);
    }
  }, []);

  if (!allowed) {
    return (
      <div className="flex justify-center items-center h-100vh text-center text-lg p-5">
        🚫 This application is only available on desktop/laptop devices.
      </div>
    );
  }

  return (
    <ChatCloseProvider>
      <AuthProvidor>
        <FlashMsgProvidor>
          <Outlet />
        </FlashMsgProvidor>
      </AuthProvidor>
    </ChatCloseProvider>
  );
}

export default App;
