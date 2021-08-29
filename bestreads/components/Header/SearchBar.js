import {useState} from "react";
import {useRouter} from "next/router";

export default function SearchBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      router.push(`/books?search=${searchQuery}`);
    }
  };
  return (
    <input
      type="text"
      htmlFor="search-bar"
      placeholder="search for books"
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyDown={(e) => handleKeyDown(e)}
      className="border-l border-r border-b border-gray-200 h-16 w-1/2 p-4 text-sm outline-none transition-all duration-75 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300"
    />
  );
}
