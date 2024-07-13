import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { join } from "../../../constants/helpers";
import {
  categoriesIcons,
  getApplications,
  getSuggestions,
} from "../../../constants/main";
import Loading from "../../../components/loading/Loading";
import { Application, Category } from "../../../constants/types";

function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

  // Add shorkeys

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setIsLoading(true);

        setSuggestions(await getSuggestions());
        console.log(await getSuggestions());

        const fetchedApplications = await getApplications();
        setApplications(fetchedApplications);
        setCategories([
          "all",
          ...new Set(fetchedApplications.map((a) => a.category)),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAsync();
  }, []);

  const containerClassName = join([
    "fixed text-gray-400 transition-all duration-300 z-50",
    isOpen
      ? "top-20 right-48 left-48 h-[80vh] rounded-2xl bg-slate-100 p-1.5"
      : "top-0 right-0 left-0 flex h-20 items-center bg-slate-200 cursor-pointer",
  ]);

  const backgroundClass = join([
    "fixed bg-black bg-opacity-20 backdrop-blur-sm z-40 transition-[opacity] duration-300",
    isOpen ? "opacity-1 inset-0" : "opacity-0",
  ]);

  const searchBarClass = join([
    "flex justify-between items-center w-full rounded-2xl transition-all duration-300",
    isOpen ? "bg-slate-200 py-3 px-6" : "px-12",
  ]);

  const searchBarKeyClass = join([
    "bg-white flex items-center gap-2 rounded-lg shadow-sm",
    isOpen ? "py-1 px-2" : "py-2 px-4",
  ]);

  function handleSearch() {
    if (!isOpen) {
      setIsOpen(true);
    }
  }

  const suggestionsMapper = (
    <div className="flex flex-row gap-2 overflow-auto no-scrollbar p-2">
      {suggestions.map((s, i) => (
        <button
          key={`${i}_${s.substring(0, 3)}`}
          className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300"
          onClick={() => alert(s)}
        >
          <Icon icon="lucide:sparkle" />
          <span className="whitespace-nowrap">{s}</span>
        </button>
      ))}
    </div>
  );

  const categoriesMapper = (
    <div className="flex flex-row gap-2 overflow-auto no-scrollbar p-2 mt-2">
      {categories.map((s, i) => (
        <button
          key={`${i}_${s.substring(0, 3)}`}
          className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            selectedCategory === s
              ? "bg-gray-800 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-500 font-semibold"
          }`}
          onClick={() => setSelectedCategory(s)}
        >
          {categoriesIcons[s] && (
            <Icon
              icon={categoriesIcons[s]}
              fontSize={22}
              className="text-gray-400"
            />
          )}
          <span className="whitespace-nowrap capitalize">{s}</span>
        </button>
      ))}
    </div>
  );

  return (
    <>
      <div className={containerClassName} onClick={handleSearch}>
        <div className={searchBarClass}>
          {isOpen ? (
            <>
              <Icon icon="ri:search-line" fontSize={26} />
              <input
                type="text"
                className="bg-transparent text-xl flex-1 pl-2 focus:outline-none"
                placeholder="Find info, Ask questions or Run queries"
                disabled={isLoading}
              />
            </>
          ) : (
            <p className="text-2xl">Search for anything</p>
          )}
          <div className={searchBarKeyClass}>
            {isOpen ? (
              <span>'/' for commands</span>
            ) : (
              <>
                <Icon icon="ep:menu" />
                <span className="flex items-center">
                  <Icon icon="ph:command-bold" />E
                </span>
              </>
            )}
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loading />
          </div>
        ) : (
          <div className="opacity-0 animate-fade-in">
            {isOpen && suggestionsMapper}
            {isOpen && categoriesMapper}
          </div>
        )}
      </div>
      <div className={backgroundClass} onClick={() => setIsOpen(false)} />
    </>
  );
}

export default Search;
