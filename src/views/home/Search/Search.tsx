import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { join } from "../../../constants/helpers";
import {
  categoriesColor,
  categoriesIcons,
  getApplications,
  getCommands,
  getSuggestions,
} from "../../../constants/main";
import Loading from "../../../components/loading/Loading";
import { Application, Category, Command } from "../../../constants/types";
import Key from "../../../components/key/Key";

function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [commands, setCommands] = useState<Command[]>([]);
  const [commandsCategories, setCommandsCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [inputValue, setInputValue] = useState("");
  const [mode, setMode] = useState<"applications" | "commands">("applications");

  // Add shorkeys

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setIsLoading(true);

        setSuggestions(await getSuggestions());

        const fetchedApplications = await getApplications();
        setApplications(fetchedApplications);
        setCategories([
          "all",
          ...new Set(fetchedApplications.map((a) => a.category)),
        ]);

        const fetchedCommands = await getCommands();
        setCommands(fetchedCommands);
        setCommandsCategories([
          "all",
          ...new Set(fetchedCommands.map((a) => a.category)),
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
      ? "top-20 right-48 left-48 h-[80vh] rounded-2xl bg-slate-100 p-1.5 flex flex-col overflow-hidden"
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

  function handleSearch() {
    if (!isOpen) {
      setIsOpen(true);
    }
  }

  function searchBarButtonValue() {
    if (isOpen) {
      if (mode === "commands") {
        return ["enter", "Run Command"];
      }
      return ["'/' for commands"];
    }
    return ["menu", "cmd", "e"];
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
    <div className="flex justify-between p-2 mt-2">
      <div className="flex flex-row gap-2 overflow-auto no-scrollbar">
        {categories.map((s, i) => (
          <button
            key={`${i}_${s.substring(0, 3)}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors font-semibold ${
              selectedCategory === s
                ? "bg-gray-800 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-500"
            }`}
            style={{
              backgroundColor:
                selectedCategory === s ? categoriesColor[s] : undefined,
            }}
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
      <Key keys={["tab", "tabs"]} />
    </div>
  );

  const applicationsMapper = (
    <div className="flex-1 overflow-scroll pb-4">
      {categories
        .filter((c) => c !== "all")
        .filter((c) =>
          selectedCategory !== "all" ? c === selectedCategory : true
        )
        .map((c) => (
          <>
            {!inputValue && (
              <h4 className="font-medium uppercase pl-2 pt-4 tracking-wider">
                {c}
              </h4>
            )}
            {applications
              .filter((a) => a.category === c)
              .filter((a) =>
                inputValue
                  ? a.title.toLowerCase().includes(inputValue.toLowerCase())
                  : true
              )
              .map((a) => (
                <button className="flex justify-between w-full p-2 pr-6 rounded-xl hover:bg-white">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded text-white"
                      style={{ backgroundColor: categoriesColor[c] }}
                    >
                      <Icon icon={a.icon} />
                    </div>
                    <p className="text-black text-xl font-medium">{a.title}</p>
                    <p>{a.description}</p>
                  </div>
                  <Key keys={a.shortcut} isUppercase />
                </button>
              ))}
          </>
        ))}
    </div>
  );

  const commandsMapper = (
    <div className="flex-1 overflow-scroll pb-4">
      {commandsCategories
        .filter((c) => c !== "all")
        .map((cc) => (
          <>
            {!inputValue && (
              <h4 className="font-medium uppercase pl-2 pt-4 tracking-wider">
                {cc}
              </h4>
            )}
            {commands
              .filter((c) => c.category === cc)
              .filter((c) =>
                inputValue
                  ? c.title.toLowerCase().includes(inputValue.toLowerCase())
                  : true
              )
              .map((c) => (
                <button className="flex items-center gap-3 w-full p-2 pr-6 rounded-xl hover:bg-white">
                  <div className="p-2 rounded bg-white">
                    <Icon icon={c.icon} />
                  </div>
                  <p className="text-black text-xl font-medium">{c.title}</p>
                  {c.tags.map((t, i) => (
                    <span
                      className={
                        "py-1 px-2 text-sm rounded " +
                        (i > 0
                          ? "bg-green-200 text-green-600"
                          : "bg-blue-200 text-blue-600")
                      }
                    >
                      {t}
                    </span>
                  ))}
                  <p>{c.description}</p>
                </button>
              ))}
          </>
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
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </>
          ) : (
            <p className="text-2xl">Search for anything</p>
          )}
          <Key
            keys={searchBarButtonValue()}
            isUppercase={!isOpen}
            className={isOpen ? undefined : "px-4 py-2"}
            onClick={
              isOpen && mode === "applications"
                ? () => setMode("commands")
                : undefined
            }
          />
        </div>
        {isOpen && (
          <>
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <Loading />
              </div>
            ) : (
              <div className="flex flex-col opacity-0 animate-fade-in overflow-hidden h-full">
                {mode === "applications" ? (
                  <>
                    {suggestionsMapper}
                    {categoriesMapper}
                    {applicationsMapper}
                    <div className="flex justify-between p-4">
                      <div className="flex gap-2 items-center">
                        <Key keys={["arrows-y"]} className={"px-4 py-2"} />
                        <span>Move</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Key keys={["enter"]} className={"px-4 py-2"} />
                        <span>Open</span>
                        <Key keys={["esc"]} className={"px-4 py-2"} />
                        <span>Close</span>
                      </div>
                    </div>
                  </>
                ) : (
                  commandsMapper
                )}
              </div>
            )}
          </>
        )}
      </div>
      <div className={backgroundClass} onClick={() => setIsOpen(false)} />
    </>
  );
}

export default Search;
