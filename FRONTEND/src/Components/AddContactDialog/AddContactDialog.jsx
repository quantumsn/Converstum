import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import api from "../../api.js";

export default function AddContactDialog({ open, handleClose }) {
  const [contactDetails, setContactDetails] = useState({
    nickname: "",
    email: "",
  });

  const handleChange = (e) => {
    setContactDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      let res = await api.post("/contacts", contactDetails);
      console.log(res.data);
    } catch (error) {
      console.error("Error saving contact:", error.response.data.error);
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
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
