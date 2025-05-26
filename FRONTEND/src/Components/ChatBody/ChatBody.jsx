import { useEffect, useRef, useState } from "react";
import { useChatClose } from "../../Context/ChatCloseProvidor";
import momemt from "moment";

export default function ChatBody({ chatMessages }) {
  const [messages, setMessages] = useState([]);
  const scrollToEnd = useRef(null);

  const { userId } = useChatClose();

  useEffect(() => {
    scrollToEnd.current.scrollTop = scrollToEnd.current.scrollHeight;
  }, [messages]);

  const formatTime = (date) => {
    let formatedTime = momemt(date).format("hh:mm A");
    return formatedTime;
  };

  const sortMessagesByDate = (messages) => {
    return messages.reduce((acc, message) => {
      let date = momemt(message.createdAt).format("DD-MM-YYYY");
      let today = new Date().toISOString();
      today = momemt(today).format("DD-MM-YYYY");
      if (date == today) date = "Today";
      if (!acc[date]) acc[date] = [];
      acc[date].push(message);
      return acc;
    }, {});
  };

  useEffect(() => {
    const sortedMessages = sortMessagesByDate(chatMessages);
    setMessages(sortedMessages);
  }, [chatMessages]);

  return (
    <div
      ref={scrollToEnd}
      className="flex flex-1 flex-col overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent"
    >
      <div className="flex-1 p-6">
        {Object.keys(messages).map((date, idx) => (
          <div key={idx} className="text-center">
            <h4 className="bg-slate-900 inline-block shadow-md rounded-lg max-w-32 px-3 py-1 text-sm my-4 text-gray-400">
              {date}
            </h4>
            {messages[date]?.length > 0
              ? messages[date].map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex items-end mb-0.5 ${
                      msg.sender == userId ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-3 ${
                        msg.sender == userId
                          ? "rounded-ee-none bg-emerald-800"
                          : "rounded-ss-none bg-customColor"
                      } max-w-lg break-words rounded-lg`}
                    >
                      <p className="text-sm">
                        {msg.content}
                        <span className=" text-xs ml-3 text-gray-400">
                          {formatTime(msg.createdAt)}
                        </span>
                      </p>
                    </div>
                  </div>
                ))
              : null}
          </div>
        ))}
      </div>
    </div>
  );
}
