// AudioPlayerProvider.jsx
import { createContext, useRef, useState } from "react";

export const AudioContext = createContext();

export default function AudioPlayerProvider({ children }) {
  const audioRef = useRef();
  const [currentSong, setCurrentSong] = useState(null);

  const playSong = (song) => {
    setCurrentSong(song);
    setTimeout(() => audioRef.current?.play(), 100);
  };

  return (
    <AudioContext.Provider value={{ currentSong, playSong }}>
      <audio ref={audioRef} src={currentSong?.url} />
      {children}
    </AudioContext.Provider>
  );
}
