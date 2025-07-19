import CloseIcon from "@mui/icons-material/Close";
import { useFlashMsgContext } from "../../Context/FlashMsgProvidor";

export default function FlashMsg({ flashMsg }) {
  const { setFlashMsg } = useFlashMsgContext();

  const handleClose = () => {
    setFlashMsg(null);
  };
  return (
    <div
      className={`${
        flashMsg?.status == "success"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }
      flex items-center justify-between p-4 mb-4 text-sm rounded-lg w-1/2 fixed top-4 left-1/4 z-50`}
    >
      <p>{flashMsg?.content}</p>
      <button onClick={handleClose}>
        <CloseIcon />
      </button>
    </div>
  );
}
