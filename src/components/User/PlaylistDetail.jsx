import { useState } from "react";
import "./playlistDetail.css";
import MiniPlayer from "./MiniPlayer";
import { MdDownload } from "react-icons/md";
import { FaRegPlayCircle } from "react-icons/fa";
export default function PlaylistDetail({ playlist, onBack }) {

  // 🟢 State chứa bài hát đang phát
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <>
      <div className="playlist-page">

        {/* LEFT SIDE */}
        <div className="playlist-left">
          <img src={playlist.img} className="playlist-cover" />

          <div className="playlist-meta">
            <h4 className="playlist-small">
              Playlist · {playlist.songs.length} Songs
            </h4>

            <h1 className="playlist-title">{playlist.name}</h1>

            <p className="playlist-artists">{playlist.artist}</p>

            <div className="playlist-actions">
              <button className="playall-btn"
                onClick={() => setCurrentSong(playlist.songs[0])}
              >
             <FaRegPlayCircle />PlayAll
              </button>

              <button className="download-btn"><MdDownload />Download</button>

              <button className="back-btn" onClick={onBack}>
                ← Back
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: songs */}
        <div className="playlist-right">
          <table className="song-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Uploader</th>
                <th>Artist</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {playlist.songs.map((song, i) => (
                <tr key={i} className="song-row">

                  <td>{i + 1}</td>

                  {/* 🟢 CLICK ẢNH → HIỆN PLAYER */}
                  <td className="song-title-cell">
                    <img
                      src={song.img || playlist.img}
                      className="song-thumb"
                      onClick={() => setCurrentSong(song)}
                      style={{ cursor: "pointer" }}
                    />
                    <span className="song-title">{song.title}</span>
                  </td>

                  <td>{song.uploader}</td>
                  <td>{song.artist}</td>
                  <td>{song.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* 🟢 MINI PLAYER (hiện khi có bài hát) */}
      <MiniPlayer
        song={currentSong}
        onAddToLibrary={(s) => console.log("ADD TO LIBRARY:", s)}
      />
    </>
  );
}
