import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { useChatClose } from "../../Context/ChatCloseProvidor";
import AddContactDialog from "../AddContactDialog/AddContactDialog";
import { useState } from "react";

export default function ContactDetailsTab({ toggleDrawer, open }) {
  const { chatUser } = useChatClose();
  const [addDialog, setaddDialog] = useState(false);
  return (
    <div>
      <Drawer
        PaperProps={{
          className: "!bg-[#111b21]",
        }}
        anchor="right"
        open={open}
        onClose={() => toggleDrawer(false)}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 bg-customColor">
            <h2 className="text-lg font-semibold text-gray-400">
              Contact Details
            </h2>
            <button onClick={() => toggleDrawer(false)} className="text-white">
              Close
            </button>
          </div>
          <Divider />
          <Box
            sx={{ width: 500 }}
            className="flex flex-col items-center p-6 rounded-b-lg"
          >
            <div className="w-24 h-24 rounded-full bg-[#075e54] flex items-center justify-center text-4xl text-white font-bold mb-4 shadow-lg">
              <span>
                {chatUser.username
                  ? chatUser.username[0].toUpperCase()
                  : chatUser.nickname[0].toUpperCase()}
              </span>
            </div>

            <h3 className="text-xl font-semibold text-white mb-1">
              {chatUser.username || chatUser.nickname}
            </h3>

            <p className="text-gray-400 text-sm mb-2">{chatUser.email}</p>

            <div className="w-full mt-2">
              <div className="text-white text-sm bg-[#202c33] flex justify-between rounded px-3 py-2">
                {chatUser.savedContact ? (
                  <span>This is a saved contact.</span>
                ) : (
                  <>
                    This contact is not saved.{" "}
                    <button
                      onClick={() => setaddDialog(true)}
                      className="bg-green-600 p-2 rounded-full mr-2"
                    >
                      Save Contact
                    </button>
                  </>
                )}
              </div>
            </div>
            <AddContactDialog
              open={addDialog}
              handleClose={() => setaddDialog(false)}
            />
          </Box>
        </div>
      </Drawer>
    </div>
  );
}
