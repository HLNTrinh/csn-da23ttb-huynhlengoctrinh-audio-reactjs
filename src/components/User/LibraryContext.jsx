import { createContext, useContext, useState, useEffect } from "react";

const LibraryContext = createContext();

export function LibraryProvider({ children }) {
  const [library, setLibrary] = useState([]);

  // load từ localStorage
  useEffect(() => {
    const saved = localStorage.getItem("library");
    if (saved) setLibrary(JSON.parse(saved));
  }, []);

  const addToLibrary = (song) => {
    const updated = [...library, song];
    setLibrary(updated);
    localStorage.setItem("library", JSON.stringify(updated));
  };

  return (
    <LibraryContext.Provider value={{ library, addToLibrary }}>
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  return useContext(LibraryContext);
}
