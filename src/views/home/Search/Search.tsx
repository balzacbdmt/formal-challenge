import { Icon } from "@iconify/react/dist/iconify.js";
import { Fragment, useEffect, useRef, useState } from "react";
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
  const [mode, setMode] = useState<"application" | "command">("application");
  const [preSelectedIndex, setPreSelectedIndex] = useState<number | null>(null);
  const scrollablePartRef = useRef<HTMLDivElement>(null);

  // Fetch data
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

  // Keyboard events
  useEffect(() => {
    function onKeyPress(event: KeyboardEvent) {
      if (!isOpen) {
        if ((event.metaKey || event.ctrlKey) && event.key === "e") {
          setIsOpen(true);
        }
      } else {
        if (event.key === "/") {
          setMode("command");
          setPreSelectedIndex(null);
        }
        if (event.key === "Escape") {
          setIsOpen(false);
          setMode("application");
        }
        if (event.key === "Tab") {
          const currentCategoryIndex = categories.indexOf(selectedCategory);
          if (currentCategoryIndex === categories.length - 1) {
            setSelectedCategory(categories[0]);
          } else {
            setSelectedCategory(categories[currentCategoryIndex + 1]);
          }
          event.preventDefault();
        }
        if (event.metaKey || event.ctrlKey) {
          let target: Application | undefined = undefined;
          if (event.shiftKey) {
            target = applications.find(
              (a) =>
                a.shortcut[0] === "cmd" &&
                a.shortcut[1] === "shift" &&
                a.shortcut[2] === event.key.toLowerCase()
            );
          } else {
            target = applications.find(
              (a) =>
                (a.shortcut[0] === "cmd" || a.shortcut[0] === "ctrl") &&
                a.shortcut[1] === event.key.toLowerCase()
            );
          }
          if (target) {
            alert(target?.title);
          }
          event.preventDefault();
        }
        if (event.key === "ArrowDown") {
          if (preSelectedIndex === null) {
            setPreSelectedIndex(0);
          } else {
            setPreSelectedIndex(preSelectedIndex + 1);
          }
          event.preventDefault();
        }
        if (event.key === "ArrowUp") {
          if (preSelectedIndex) {
            setPreSelectedIndex(preSelectedIndex - 1);
          }
          event.preventDefault();
        }
        if (event.key === "Enter" && preSelectedIndex) {
          const preSelectedRow = document.getElementById(
            `${mode}_${preSelectedIndex}`
          );
          if (preSelectedRow) {
            const id = preSelectedRow.getAttribute("data-application-id");
            if (id) {
              let applicationPreSelected;
              if (mode === "application") {
                applicationPreSelected = applications.find(
                  (a) => a.id === Number(id)
                );
              }
              if (mode === "command") {
                applicationPreSelected = commands.find(
                  (a) => a.id === Number(id)
                );
              }
              alert(applicationPreSelected?.title);
            }
          }
        }
      }
    }

    window.addEventListener("keydown", onKeyPress);

    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, [isOpen, selectedCategory, preSelectedIndex]);

  // Auto scroll on keyboard event
  useEffect(() => {
    if (preSelectedIndex !== null) {
      const preSelectedRow = document.getElementById(
        `${mode}_${preSelectedIndex}`
      );

      if (scrollablePartRef.current && preSelectedRow) {
        const scrollablePart = scrollablePartRef.current;
        const scrollablePartRect = scrollablePart.getBoundingClientRect();
        const preSelectedRowRect = preSelectedRow.getBoundingClientRect();

        // Calculate the desired scroll position
        const scrollTopRelativeToDiv =
          preSelectedRowRect.top -
          scrollablePartRect.top +
          scrollablePart.scrollTop -
          scrollablePart.clientHeight +
          preSelectedRow.clientHeight;

        // Scroll to the calculated position
        scrollablePart.scrollTo({
          top: scrollTopRelativeToDiv,
          behavior: "smooth",
        });
      }
    }
  }, [preSelectedIndex]);

  const containerClassName = join([
    "fixed text-gray-dark transition-all duration-300 z-50",
    isOpen
      ? "top-4 inset-x-12 md:top-10 md:inset-x-24 lg:top-20 lg:inset-x-48 h-[92vh] md:h-[90vh] lg:h-[80vh] rounded-2xl bg-slate-light p-1.5 flex flex-col overflow-hidden"
      : "top-0 right-0 left-0 flex h-20 items-center bg-slate cursor-pointer",
  ]);

  const backgroundClass = join([
    "fixed bg-black bg-opacity-20 backdrop-blur-sm z-40 transition-[opacity] duration-300",
    isOpen ? "opacity-1 inset-0" : "opacity-0",
  ]);

  const searchBarClass = join([
    "flex justify-between gap-4 items-center w-full rounded-2xl transition-all duration-300",
    isOpen ? "bg-slate py-3 px-6" : "px-12",
  ]);

  function handleSearch() {
    if (!isOpen) {
      setIsOpen(true);
    }
  }

  function searchBarButtonValue() {
    if (isOpen) {
      if (mode === "command") {
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
          className="flex items-center gap-2 bg-gray-light px-4 py-2 rounded-full hover:bg-gray"
          onClick={() => alert(s)}
        >
          <Icon icon="lucide:sparkle" />
          <span className="whitespace-nowrap">{s}</span>
        </button>
      ))}
    </div>
  );

  const categoriesMapper = (
    <div className="flex justify-between gap-4 p-2 mt-2">
      <div className="flex flex-row gap-2 overflow-auto no-scrollbar">
        {categories.map((s, i) => (
          <button
            key={`${i}_${s.substring(0, 3)}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors font-medium ${
              selectedCategory === s
                ? "bg-black text-white"
                : "bg-gray-light hover:bg-gray text-black"
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
                className="text-gray-dark"
              />
            )}
            <span className="whitespace-nowrap capitalize">{s}</span>
          </button>
        ))}
      </div>
      <Key keys={["tab", "tabs"]} />
    </div>
  );

  const applicationsMapper = () => {
    let rowIndex = 0;
    return (
      <div ref={scrollablePartRef} className="flex-1 overflow-scroll pb-4">
        {categories
          .filter((c) => c !== "all")
          .filter((c) =>
            selectedCategory !== "all" ? c === selectedCategory : true
          )
          .map((c) => {
            return (
              <Fragment key={c}>
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
                  .map((a) => {
                    rowIndex++;
                    const className = join([
                      "flex justify-between items-center w-full p-2 sm:pr-6 rounded-xl hover:bg-white",
                      rowIndex === preSelectedIndex ? "bg-white" : "",
                    ]);
                    return (
                      <button
                        key={a.id}
                        id={`application_${rowIndex}`}
                        className={className}
                        onMouseOver={() => setPreSelectedIndex(null)}
                        data-application-id={a.id}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="p-2 rounded text-white"
                            style={{ backgroundColor: categoriesColor[c] }}
                          >
                            <Icon icon={a.icon} />
                          </div>
                          <div className="flex flex-col items-start sm:flex-row sm:gap-3 sm:items-center">
                            <p className="text-black text-base sm:text-xl font-medium">
                              {a.title}
                            </p>
                            <p className="text-left text-sm sm:text-base">
                              {a.description}
                            </p>
                          </div>
                        </div>
                        <Key keys={a.shortcut} isUppercase />
                      </button>
                    );
                  })}
              </Fragment>
            );
          })}
      </div>
    );
  };

  const commandsMapper = () => {
    let rowIndex = 0;
    return (
      <div className="flex-1 overflow-scroll pb-4">
        {commandsCategories
          .filter((c) => c !== "all")
          .map((cc) => (
            <Fragment key={cc}>
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
                .map((c) => {
                  rowIndex++;
                  const className = join([
                    "flex items-center gap-3 w-full p-2 pr-6 rounded-xl hover:bg-white",
                    rowIndex === preSelectedIndex ? "bg-white" : "",
                  ]);
                  return (
                    <button
                      key={c.id}
                      className={className}
                      id={`command_${rowIndex}`}
                      onMouseOver={() => setPreSelectedIndex(null)}
                      data-application-id={c.id}
                    >
                      <div className="p-2 rounded bg-white">
                        <Icon icon={c.icon} />
                      </div>
                      <div className="flex lg:gap-3 flex-col lg:flex-row">
                        <div className="md:flex text-left gap-3">
                          <p className="text-black text-lg md:text-xl font-medium whitespace-nowrap">
                            {c.title}
                          </p>
                          {c.tags.map((t, i) => (
                            <span
                              key={t}
                              className={
                                "py-1 px-2 text-sm rounded " +
                                (i > 0
                                  ? "bg-green-light text-green-dark"
                                  : "bg-blue-light text-blue-dark")
                              }
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <p className="lg:truncate text-left">{c.description}</p>
                      </div>
                    </button>
                  );
                })}
            </Fragment>
          ))}
      </div>
    );
  };

  return (
    <>
      <div className={containerClassName} onClick={handleSearch}>
        <div className={searchBarClass}>
          {isOpen ? (
            <>
              <Icon icon="ri:search-line" fontSize={26} />
              <input
                type="text"
                className="bg-transparent text-xl flex-1 pl-2 focus:outline-none truncate"
                placeholder="Find info, Ask questions or Run queries"
                disabled={isLoading}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </>
          ) : (
            <p className="text-2xl truncate text-nowrap">Search for anything</p>
          )}
          <Key
            keys={searchBarButtonValue()}
            isUppercase={!isOpen}
            className={isOpen ? undefined : "px-4 py-2"}
            onClick={
              isOpen && mode === "application"
                ? () => setMode("command")
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
                {mode === "application" ? (
                  <>
                    {suggestionsMapper}
                    {categoriesMapper}
                    {applicationsMapper()}
                    <div className="flex justify-between p-1 md:p-4 gap-2">
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
                  commandsMapper()
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
