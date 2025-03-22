import { useState, useEffect } from "react";
import api from "../api";
import { SearchBox, ContactBar } from "../Components";
import AddIcon from "@mui/icons-material/Add";
import { useChatClose } from "../Context/ChatCloseProvidor";
import socket from "../socket";

export default function Contacts() {
  const [contacts, setContacts] = useState(null);

  const { openChat, userId, setUserId } = useChatClose();

  useEffect(() => {
    const getData = async () => {
      try {
        let res = await api.get("contacts");

        setContacts(res.data.chats);
        setUserId(res.data.user._id);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleChatOpen = (contact) => {
    let roomId = [userId, contact._id].sort().join("-");
    openChat(contact, roomId);
    socket.emit("joinRoom", { userId: userId, friendID: contact._id });
  };

  return (
    <div className=" flex-col h-screen w-2/6 border-r-2 border-gray-700 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
      <div className="p-4 sticky top-0 bg-gray-900 ">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl m-2 text-gray-100 font-bold">Chats</h2>
          <button className="bg-customColor p-2 rounded-full">
            <AddIcon />
          </button>
        </div>
        <SearchBox />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {contacts != null &&
          contacts.map((contact) => (
            <div
              key={contact.contact._id}
              onClick={() => handleChatOpen(contact.contact)}
            >
              <ContactBar
                username={contact.contact.username}
                lastMsg={contact.lastMessage}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
