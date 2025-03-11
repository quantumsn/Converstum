import SendIcon from "@mui/icons-material/Send";

export default function InputBox({ msg, handleMsgInputBox, sendMsg }) {
  return (
    <form
      onSubmit={(e) => sendMsg(e)}
      className="flex justify-between p-4 bg-customColor"
    >
      <input
        type="text"
        value={msg}
        onChange={(e) => handleMsgInputBox(e.target.value)}
        className="w-full p-2 rounded-lg focus:outline-none text-white bg-gray-700"
        placeholder="Type a message..."
      />
      <button
        type="submit"
        className="bg-customColor ml-2 text-white p-2 rounded-lg"
      >
        <SendIcon />
      </button>
    </form>
  );
}
