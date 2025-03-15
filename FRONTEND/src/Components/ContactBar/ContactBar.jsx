export default function ContactBar({ username, lastMsg }) {
  return (
    <div className="flex gap-4 items-center p-2 border-b border-gray-700 hover:bg-gray-800 cursor-pointer">
      <p className="bg-green-500 rounded-full w-14 h-14 text-center text-5xl ">
        {username[0].toUpperCase()}
      </p>
      <div>
        <h2 className="text-lg font-semibold">{username}</h2>
        <p className="text-gray-400">Last message</p>
      </div>
    </div>
  );
}
