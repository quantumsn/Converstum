import { useState, useEffect } from "react";
import api from "../api";
import { SearchBox, ContactBar, ContactLoader } from "../Components";
import AddIcon from "@mui/icons-material/Add";
import { useChatClose } from "../Context/ChatCloseProvidor";
import socket from "../socket";
import { AddContactDialog } from "../Components";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useFlashMsgContext } from "../Context/FlashMsgProvidor";
import { useAuth } from "../Context/AuthProvidor";

export default function Contacts() {
  const [contacts, setContacts] = useState(null);
  const [addDialog, setaddDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const { openChat, userId, setUserId, chatUser } = useChatClose();
  const { setFlashMsg } = useFlashMsgContext();
  const { setIsAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        let res = await api.get("chats");

        const sortedChats = res.data.chats.sort((a, b) => {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
        setContacts(sortedChats);
        setUserId(res.data.user._id);

        login();
      } catch (err) {
        setFlashMsg({
          content: err.response.data.error,
          status: "failed",
        });
        if (err.response.status === 401) {
          setIsAuthenticated(false);
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    socket.on("newMsg", (data) => {
      setContacts((prevContacts) => {
        const exist = prevContacts.some(
          (contact) => contact.chatId === data.chatId
        );
        if (exist) {
          const updatedContacts = prevContacts.map((contact) => {
            if (contact.chatId === data.chatId) {
              return {
                ...contact,
                lastMessage: data,
                updatedAt: data.createdAt,
              };
            }
            return contact;
          });
          return updatedContacts.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
        } else {
          return [
            ...prevContacts,
            {
              chatId: data.chatId,
              contact: {
                username:
                  userId === data.sender
                    ? data.receiverUsername
                    : data.senderUsername,
              },
              lastMessage: data.content,
            },
          ];
        }
      });
    });

    return () => {
      socket.off("msg");
    };
  }, []);

  const changeIsReadStatus = (data) => {
    setContacts((prevContacts) => {
      const updatedContacts = prevContacts.map((contact) => {
        if (contact.chatId === data.chatId) {
          return {
            ...contact,
            lastMessage: data,
            updatedAt: data.createdAt,
          };
        }
        return contact;
      });
      return updatedContacts;
    });
  };

  const handleChatOpen = (contact) => {
    let roomId = [userId, contact._id].sort().join("-");
    openChat(contact, roomId);
    socket.emit("joinRoom", { userId: userId, friendID: contact._id });
  };

  const handleLogout = async () => {
    try {
      let res = await api.get("/user/logout");
      logout();
      navigate("/login");
      setFlashMsg({
        content: res.data.message,
        status: "success",
      });
    } catch (err) {
      setFlashMsg({
        content: err.response.data.error,
        status: "failed",
      });
    }
  };

  return (
    <div className=" flex-col h-screen w-2/6 border-r-2 border-gray-700 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
      <div className="p-4 sticky top-0 bg-gray-900 ">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl m-2 text-gray-100 font-bold">Chats</h2>
          <div>
            <button
              onClick={() => setaddDialog(true)}
              className="bg-customColor p-2 rounded-full mr-2"
            >
              <AddIcon />
            </button>
            <button
              onClick={() => handleLogout()}
              className="bg-customColor p-2 rounded-full"
            >
              <LogoutIcon />
            </button>
          </div>
        </div>
        <SearchBox />
      </div>
      <AddContactDialog
        open={addDialog}
        handleClose={() => setaddDialog(false)}
      />
      <div className="flex flex-col gap-4 mt-4">
        {loading ? (
          <>
            <ContactLoader key={"0"} />
            <ContactLoader key={"1"} />
            <ContactLoader key={"2"} />
          </>
        ) : (
          contacts != null &&
          contacts.map((contact) => (
            <div
              key={contact.contact._id}
              onClick={() => handleChatOpen(contact.contact)}
            >
              <ContactBar
                username={contact.contact.username}
                lastMsg={contact.lastMessage}
                changeIsReadStatus={changeIsReadStatus}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
