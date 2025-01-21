import Chat from "../Layouts/Chat";
import Contacts from "../Layouts/Contacts";
import About from "../Layouts/About";
import { useChatClose } from "../Context/ChatCloseProvidor";

export default function Home() {
  const { chatClose } = useChatClose();
  return (
    <div className="flex min-w-full bg-gray-900 text-white">
      <Contacts />
      {chatClose ? <Chat /> : <About />}
    </div>
  );
}
