// src/Today.jsx
import { useState } from "react";
import PlaylistGrid from "./PlaylistGrid";
import PlaylistPage from "./PlaylistPage";

export default function Today({ onPlaySong }) {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  return (
    <>
      {!selectedPlaylist ? (
        <PlaylistGrid onSelect={setSelectedPlaylist} />
      ) : (
        <PlaylistPage
          playlist={selectedPlaylist}
          onBack={() => setSelectedPlaylist(null)}
          onPlaySong={onPlaySong}
        />
      )}
    </>
  );
}
