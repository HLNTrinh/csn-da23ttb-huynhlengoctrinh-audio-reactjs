import { useState, useEffect } from "react";
import "./playlistDetail.css";
import MiniPlayer from "./MiniPlayer";
import { FaArrowLeft } from "react-icons/fa6";
import { GoHeart, GoHeartFill } from "react-icons/go";

const getLibraryKey = (user) =>
  user ? `library_${user.id || user.username}` : null;

const getNotifyKey = (user) =>
  user ? `notifications_${user.id || user.username}` : null;

export default function PlaylistDetail({ playlist, onBack }) {
  const [currentSong, setCurrentSong] = useState(null);

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const libraryKey = getLibraryKey(user);
  const notifyKey = getNotifyKey(user);

  const [library, setLibrary] = useState([]);

  /* ===== LOAD LIBRARY ===== */
  useEffect(() => {
    if (!libraryKey) return;
    const saved = JSON.parse(localStorage.getItem(libraryKey)) || [];
    setLibrary(saved);

    const sync = () => {
      const data = JSON.parse(localStorage.getItem(libraryKey)) || [];
      setLibrary(data);
    };

    window.addEventListener("library-updated", sync);
    return () => window.removeEventListener("library-updated", sync);
  }, [libraryKey]);

  /* ===== CHECK ❤️ ===== */
  const isLoved = (song) =>
    library.some((s) => s.audio === song.audio);

  /* ===== TOGGLE ❤️ + 🔔 ===== */
 const toggleLibrary = (song) => {
  if (!user) {
    alert("Bạn cần đăng nhập");
    return;
  }

  const exists = isLoved(song);
  let updatedLib = [];

  const notifications = JSON.parse(
    localStorage.getItem(notifyKey) || "[]"
  );

  if (exists) {
    // 💔 BỎ KHỎI THƯ VIỆN
    updatedLib = library.filter((s) => s.audio !== song.audio);

    notifications.unshift({
      id: Date.now(),
      type: "library-remove",
      songId: song.id,
      text: `${song.title} đã bị xóa khỏi thư viện`,
      time: new Date().toLocaleTimeString(),
    });
  } else {
    // ❤️ THÊM VÀO THƯ VIỆN
    updatedLib = [...library, song];

    notifications.unshift({
      id: Date.now(),
      type: "library-add",
      songId: song.id,
      text: `${song.title} đã được thêm vào thư viện`,
      time: new Date().toLocaleTimeString(),
    });
  }

  // LƯU LIBRARY
  setLibrary(updatedLib);
  localStorage.setItem(libraryKey, JSON.stringify(updatedLib));

  // LƯU NOTIFICATION
  localStorage.setItem(
    notifyKey,
    JSON.stringify(notifications)
  );

  // 🔄 SYNC TOÀN APP
  window.dispatchEvent(new Event("library-updated"));
  window.dispatchEvent(new Event("notificationUpdated"));
};


  return (
    <>
      <div className="playlist-page">
        {/* ===== LEFT ===== */}
        <div className="playlist-left">
          <img src={playlist.img} className="playlist-cover" />

          <div className="playlist-meta">
            <h4>Playlist · {playlist.songs.length} Songs</h4>
            <h1>{playlist.name}</h1>
            <p>{playlist.artist}</p>

            <div className="playlist-actions">
              <button
                className="playall-btn"
                onClick={() => setCurrentSong(playlist.songs[0])}
              >
                ▶ PHÁT NGẪU NHIÊN
              </button>

              <button className="icon-btn back-btn" onClick={onBack}>
                <FaArrowLeft />
              </button>
            </div>
          </div>
        </div>

        {/* ===== RIGHT ===== */}
        <div className="playlist-right">
          <table className="song1-table">
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
                <tr
                  key={song.id || i}
                  className="song-row1"
                  onClick={() => setCurrentSong(song)}
                >
                  <td>{i + 1}</td>

                  <td className="song-title-cell1">
                    <img
                      src={song.img || playlist.img}
                      className="song-thumb1"
                    />
                    <span>{song.title}</span>
                  </td>

                  <td>{song.uploader || "Admin"}</td>
                  <td>{song.artist}</td>

                  <td className="time-cell">
                    <button
                      className={`heart-btn-row ${
                        isLoved(song) ? "active" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLibrary(song);
                      }}
                    >
                      {isLoved(song) ? <GoHeartFill /> : <GoHeart />}
                    </button>

                    <span className="song-time">
                      {song.duration || "03:20"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== MINI PLAYER ===== */}
      <MiniPlayer song={currentSong} />
    </>
  );
}
