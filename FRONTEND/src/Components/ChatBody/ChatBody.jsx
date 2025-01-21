export default function ChatBody() {
  return (
    <div className="flex flex-1 flex-col overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
      <div className="flex-1 p-6">
        <div className="flex items-end justify-end">
          <div className="bg-emerald-800 p-3 rounded-ee-none rounded-lg">
            <p className="text-sm">Hello, how can I help you?</p>
          </div>
        </div>
        <div className="flex items-start justify-start">
          <div className="bg-customColor p-3 rounded-ss-none rounded-lg">
            <p className="text-sm">Hello, how can I help you?</p>
          </div>
        </div>
      </div>
    </div>
  );
}
