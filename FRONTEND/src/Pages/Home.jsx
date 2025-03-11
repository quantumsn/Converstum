import { Suspense, lazy } from "react";
const Chat = lazy(() => import("../Layouts/Chat")); // Chat.jsx loaded when it's needed.. okay bro ?
import Contacts from "../Layouts/Contacts";
import About from "../Layouts/About";
import { useChatClose } from "../Context/ChatCloseProvidor";

export default function Home() {
  const { chatClose } = useChatClose();
  return (
    <div className="flex min-w-full bg-gray-900 text-white">
      <Contacts />
      {chatClose ? (
        <Suspense fallback={<div>Loading chat...</div>}>
          <Chat />
        </Suspense>
      ) : (
        <About />
      )}
    </div>
  );
}
