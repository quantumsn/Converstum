import SendIcon from "@mui/icons-material/Send";

export default function InputBox() {
  return (
    <div className="flex justify-between p-4 bg-customColor">
      <input
        type="text"
        className="w-full p-2 rounded-lg focus:outline-none text-white bg-gray-700"
        placeholder="Type a message..."
      />
      <button className="bg-customColor ml-2 text-white p-2 rounded-lg">
        <SendIcon />
      </button>
    </div>
  );
}
