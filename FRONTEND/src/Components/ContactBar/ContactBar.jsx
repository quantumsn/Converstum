export default function ContactBar({ username, lastMsg }) {
  return (
    <div className="flex gap-4 items-center p-2 border-b border-gray-700 hover:bg-gray-800 cursor-pointer">
      <img
        className="rounded-full w-16 h-16"
        src="https://xsgames.co/randomusers/avatar.php?g=male"
        alt="U"
      />
      <div>
        <h2 className="text-lg font-semibold">Unknown</h2>
        <p className="text-gray-400">Last message</p>
      </div>
    </div>
  );
}
