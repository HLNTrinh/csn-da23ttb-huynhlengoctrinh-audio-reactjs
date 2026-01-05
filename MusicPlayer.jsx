import { useState } from "react";
import { songsData } from "../data/songsData";
import LyricsSync from "./LyricsSync";

export default function MusicPlayer() {
  const [currentSong, setCurrentSong] = useState(songsData[0]);

  return (
    <div>
      {/* chọn bài */}
      {songsData.map(song => (
        <button key={song.id} onClick={() => setCurrentSong(song)}>
          {song.title}
        </button>
      ))}

      {/* player + lyrics */}
      <LyricsSync song={currentSong} />
    </div>
  );
}
