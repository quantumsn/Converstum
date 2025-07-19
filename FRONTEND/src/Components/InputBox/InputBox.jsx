import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export default function InputBox({
  msg,
  handleMsgInputBox,
  sendMsg,
  isSending,
}) {
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
      <Button
        type="submit"
        className="!bg-customColor !ml-2 text-white !p-2 !rounded-lg"
        disabled={isSending || msg.trim() === ""}
        startIcon={
          isSending ? <CircularProgress color="secondary" size={20} /> : null
        }
      >
        <SendIcon />
      </Button>
    </form>
  );
}
