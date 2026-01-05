export const LibraryProvider = ({ children }) => {
  const [librarySongs, setLibrarySongs] = useState([]);

  const addToLibrary = (song) => {
    const exists = librarySongs.some((s) => s.id === song.id);
    if (exists) return;
    const updated = [...librarySongs, song];
    setLibrarySongs(updated);
    localStorage.setItem("librarySongs", JSON.stringify(updated));
  };

  return (
    <LibraryContext.Provider value={{ librarySongs, addToLibrary }}>
      {children}
    </LibraryContext.Provider>
  );
};
