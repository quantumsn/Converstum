import SearchIcon from "@mui/icons-material/Search";
import debounce from "lodash.debounce";
import { useState, useCallback } from "react";
import api from "../../api.js";
import { useChatClose } from "../../Context/ChatCloseProvidor.jsx";
import socket from "../../socket.js";

export default function SearchBox() {
  const [quary, setQuary] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [userId, setUserId] = useState("");

  const { openChat } = useChatClose();

  const fetchContacts = async (quary) => {
    try {
      let res = await api.get(`/contacts/search?nickname=${quary}`);
      setSuggestions(res.data);
      setUserId(res.data[0].owner._id);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const debouncedFetch = useCallback(
    debounce((value) => fetchContacts(value), 300),
    []
  );

  const handleChange = (e) => {
    setQuary(e.target.value);
    if (e.target.value !== "") {
      debouncedFetch(e.target.value);
    } else {
      setSuggestions([]);
    }
  };

  const handleChatOpen = (contact) => {
    let roomId = [userId, contact.originalId].sort().join("-");
    openChat(contact, roomId);
    socket.emit("joinRoom", { userId: userId, friendID: contact.originalId });
  };

  return (
    <div className=" relative flex justify-between py-4">
      <input
        type="text"
        value={quary}
        onChange={handleChange}
        className="w-full p-2 rounded-lg focus:outline-none text-white bg-gray-700"
        placeholder="Search by nickname..."
      />

      {suggestions.length > 0 && (
        <ul className="absolute top-full bg-gray-800 text-white w-full mt-1 shadow-lg rounded-lg max-h-60 overflow-y-auto z-20 border border-gray-700">
          {suggestions.map((contact) => (
            <li
              key={contact._id}
              onClick={() => handleChatOpen(contact)}
              className="p-3 hover:bg-gray-700 cursor-pointer transition duration-200 ease-in-out rounded-md"
            >
              <div className="flex items-center">
                <div className="flex-grow">
                  <p className="font-medium">
                    {contact.nickname[0].toUpperCase() +
                      contact.nickname.slice(1)}
                  </p>
                  <p className="text-sm text-gray-400">{contact.email}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
