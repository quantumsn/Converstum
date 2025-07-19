import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../../api.js";
import { useFlashMsgContext } from "../../Context/FlashMsgProvidor.jsx";
import { useChatClose } from "../../Context/ChatCloseProvidor.jsx";
import { useEffect } from "react";

export default function AddContactDialog({ open, handleClose }) {
  const [isSaving, setIsSaving] = useState(false);
  const [contactDetails, setContactDetails] = useState({
    nickname: "",
    email: "",
  });

  const { chatUser } = useChatClose();

  useEffect(() => {
    if (chatUser) {
      setContactDetails({
        ...contactDetails,
        email: chatUser.email || "",
      });
    }
  }, [chatUser]);

  const { setFlashMsg } = useFlashMsgContext();

  const handleChange = (e) => {
    setContactDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      let res = await api.post("/contacts", contactDetails);
      setFlashMsg({
        content: res.data.message,
        status: "success",
      });
      chatUser.username = contactDetails.nickname;
    } catch (err) {
      setFlashMsg({
        content: err.response.data.error,
        status: "failed",
      });
    } finally {
      setIsSaving(false);
    }
    handleClose();
    setContactDetails({ nickname: "", email: "" });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className="bg-gray-900 text-white">
        {"Add Contact"}
      </DialogTitle>
      <DialogContent>
        <TextField
          id="nickname"
          name="nickname"
          label="Nickname"
          className="!mt-4"
          variant="outlined"
          fullWidth
          value={contactDetails.nickname}
          onChange={(e) => handleChange(e)}
        />

        <TextField
          id="email"
          name="email"
          label="Email"
          className="!my-4"
          variant="outlined"
          fullWidth
          value={contactDetails.email}
          onChange={(e) => handleChange(e)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          disabled={isSaving}
          startIcon={
            isSaving ? <CircularProgress color="inherit" size={20} /> : null
          }
          onClick={handleSave}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
