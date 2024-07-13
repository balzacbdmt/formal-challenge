import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { join } from "../../../constants/helpers";

function Search() {
  const [isOpen, setIsOpen] = useState(false);

  // Add shorkeys

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
      </div>
      <div className={backgroundClass} onClick={() => setIsOpen(false)} />
    </>
  );
}

export default Search;
