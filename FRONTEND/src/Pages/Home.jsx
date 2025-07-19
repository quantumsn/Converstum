import { Suspense, lazy } from "react";
const Chat = lazy(() => import("../Layouts/Chat")); // Chat.jsx loaded when it's needed.. okay bro ?
const Contacts = lazy(() => import("../Layouts/Contacts"));
import About from "../Layouts/About";
import { useChatClose } from "../Context/ChatCloseProvidor";
import { FlashMsg } from "../Components";
import { useFlashMsgContext } from "../Context/FlashMsgProvidor";

export default function Home() {
  const { chatClose } = useChatClose();
  const { flashMsg } = useFlashMsgContext();
  return (
    <div className="flex min-w-full bg-gray-900 text-white">
      {flashMsg != null && <FlashMsg flashMsg={flashMsg} />}
      <Contacts />
      {chatClose ? (
        <About />
      ) : (
        <Suspense fallback={<div>Loading chat...</div>}>
          <Chat />
        </Suspense>
      )}
    </div>
  );
}
