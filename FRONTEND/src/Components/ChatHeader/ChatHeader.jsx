import CloseIcon from "@mui/icons-material/Close";
import { useChatClose } from "../../Context/ChatCloseProvidor";

export default function ChatHeader() {
  const { setChatClose } = useChatClose();

  const handleCloseChat = () => {
    setChatClose(false);
  };

  return (
    <div className="flex justify-between p-4 bg-customColor">
      <div className="flex">
        <img
          className=" rounded-full h-12 w-12"
          src="https://xsgames.co/randomusers/avatar.php?g=male"
        />
        <div className="flex flex-col ml-4">
          <h4 className="text-lg font-semibold">Unknown</h4>
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
