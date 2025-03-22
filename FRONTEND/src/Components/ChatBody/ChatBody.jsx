import { useEffect, useRef } from "react";
import { useChatClose } from "../../Context/ChatCloseProvidor";

export default function ChatBody({ messages, socketId }) {
  const scrollToEnd = useRef(null);

  const { userId } = useChatClose();

  useEffect(() => {
    scrollToEnd.current.scrollTop = scrollToEnd.current.scrollHeight;
  }, [messages]);

  return (
    <div
      ref={scrollToEnd}
      className="flex flex-1 flex-col overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent"
    >
      <div className="flex-1 p-6">
        {messages?.length > 0
          ? messages.map((msg, idx) => (
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
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
