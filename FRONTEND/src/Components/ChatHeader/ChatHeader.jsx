import CloseIcon from "@mui/icons-material/Close";
import { useChatClose } from "../../Context/ChatCloseProvidor";

export default function ChatHeader() {
  const { closeChat, chatUser } = useChatClose();

  const handleCloseChat = () => {
    closeChat();
  };

  return (
    <div className="flex justify-between p-4 bg-customColor">
      <div className="flex">
        <p className="bg-green-500 rounded-full w-12 h-12 text-center text-4xl ">
          {chatUser.username[0].toUpperCase()}
        </p>
        <div className="flex flex-col ml-4">
          <h4 className="text-lg font-semibold">{chatUser.username}</h4>
          <p className="text-sm text-gray-400">Offline</p>
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
