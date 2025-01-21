import { SearchBox, ContactBar } from "../Components";
import AddIcon from "@mui/icons-material/Add";

export default function Contacts() {
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
        <ContactBar />
      </div>
    </div>
  );
}
