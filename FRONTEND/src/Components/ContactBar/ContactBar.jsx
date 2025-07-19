import moment from "moment";
import { useChatClose } from "../../Context/ChatCloseProvidor";
import api from "../../api.js";
import { useEffect } from "react";

export default function ContactBar({ username, lastMsg, changeIsReadStatus }) {
  const { chatUser, userId } = useChatClose();

  useEffect(() => {
    if (chatUser?._id === lastMsg?.sender && lastMsg?.isRead === false) {
      messageSeen(lastMsg.id);
      changeIsReadStatus({ ...lastMsg, isRead: true });
    }
  }, [chatUser, lastMsg]);

  const messageSeen = async (id) => {
    try {
      const res = await api.put(`messages/${id}/edit`, { isRead: true });
      // console.log(res.data);
    } catch (err) {
      console.log(err.response.data.error);
    }
  };

  return (
    <div className="flex items-center px-4 py-3 hover:bg-[#202c33] transition-colors cursor-pointer border-b border-[#222d34]">
      <div className="flex-shrink-0">
        <div className="bg-[#075e54] text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold">
          {username[0].toUpperCase()}
        </div>
      </div>

      <div className="flex-1 min-w-0 ml-4">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold text-white truncate">
            {username[0].toUpperCase() + username.slice(1)}
          </h2>
          <div className="flex items-center gap-2 min-w-fit">
            <span
              className={`text-xs ml-2 ${
                lastMsg?.sender === userId || lastMsg?.isRead === true
                  ? "text-gray-400"
                  : chatUser?._id === lastMsg?.sender
                  ? "text-gray-400"
                  : "text-green-500"
              }`}
            >
              {lastMsg?.createdAt
                ? moment(lastMsg.createdAt).calendar(null, {
                    sameDay: "LT",
                    lastDay: "[Yesterday]",
                    lastWeek: "ddd",
                    sameElse: "D MMM",
                  })
                : ""}
            </span>
            {lastMsg?.isRead === false &&
              lastMsg?.sender !== userId &&
              chatUser?._id !== lastMsg.sender && (
                <span className="ml-2 w-3 h-3 rounded-full bg-green-500 text-white text-xs font-bold"></span>
              )}
          </div>
        </div>

        <p
          className={`truncate text-sm mt-1 ${
            lastMsg?.sender === userId || lastMsg?.isRead === true
              ? "text-gray-400"
              : chatUser?._id === lastMsg?.sender
              ? "text-gray-400"
              : "text-white font-medium"
          }`}
        >
          {lastMsg?.content
            ? lastMsg.content.length > 45
              ? lastMsg.content.slice(0, 45) + "..."
              : lastMsg.content
            : ""}
        </p>
      </div>
    </div>
  );
}
