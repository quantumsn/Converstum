import { ChatHeader, ChatBody, InputBox } from "../Components";

export default function Chat() {
  return (
    <div className="h-screen w-4/6 flex flex-col bg-gradient-to-r from-blue-800 via-gray-950 to-purple-800 text-white">
      <ChatHeader />
      <ChatBody />
      <InputBox />
    </div>
  );
}
