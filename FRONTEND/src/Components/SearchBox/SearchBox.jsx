import SearchIcon from "@mui/icons-material/Search";

export default function SearchBox() {
  return (
    <div className="flex justify-between py-4">
      <input
        type="text"
        className="w-full p-2 rounded-lg focus:outline-none text-white bg-gray-700"
        placeholder="Search by nickname..."
      />
      <button className="ml-3 text-white p-2 rounded-lg">
        <SearchIcon />
      </button>
    </div>
  );
}
