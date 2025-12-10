// src/components/AudioPlayer.jsx
import { useRef, useState } from "react";

export default function AudioPlayer({ children }) {
  const audioRef = useRef();
  const [currentSong, setCurrentSong] = useState(null);

  const playSong = (song) => {
    setCurrentSong(song);

    setTimeout(() => {
      audioRef.current?.play();
    }, 100);
  };

  return (
    <>
      <audio ref={audioRef} src={currentSong?.url}></audio>

      {/* Truyền playSong xuống component con */}
      {children({ playSong })}
    </>
  );
}
