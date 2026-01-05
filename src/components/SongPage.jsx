// SongPage.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { songsData } from "../data/songsData.js";

import MiniPlayer from "../components/User/MiniPlayer";

// ICON
import { FaPlay, FaDownload } from "react-icons/fa";

// GUEST
import Topbar from "./Topbar";
import Sidebar from "./Sidebar.jsx";

// USER
import NavbarUser from "./User/UserNavbar";
import SidebarUser from "./User/SidebarUser";

import "./songpage.css";

export default function SongPage() {
  const { id } = useParams();
  const [currentSong, setCurrentSong] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const song = songsData.find((s) => s.id === id);

  useEffect(() => {
    if (song) setCurrentSong(song);
  }, [song]);

  if (!song) return <div>Bài hát không tồn tại</div>;

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        {currentUser ? <SidebarUser /> : <Sidebar />}
      </div>

      {/* MAIN CONTENT */}
      <div style={styles.mainContent}>
        <div style={styles.navbar}>
          {currentUser ? <NavbarUser /> : <Topbar />}
        </div>

        <div className="song-page">
          {/* HEADER */}
          <div className="header">
            <img
              src={song.img}
              className="cover"
              alt={song.title}
              onClick={() => setCurrentSong(song)}
            />

            <div className="info">
              <p className="label">Song</p>
              <h1>{song.title}</h1>
              <p>{song.artist}</p>

              {/* ACTIONS */}
              <div className="actions">
                <button
                  className="play-btn"
                  onClick={() => setCurrentSong(song)}
                >
                  <FaPlay /> Phát
                </button>

                {song.audio && (
                  <a
                    href={song.audio}
                    download
                    className="download-btn"
                  >
                    <FaDownload /> Tải xuống
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* LYRICS */}
          <div className="lyrics-box">
            <h2>Lyrics</h2>
            <div className="lyrics">
              {song.lyrics || "Chưa có lời bài hát"}
            </div>
          </div>
        </div>
      </div>

      {/* MINIPLAYER */}
      {currentSong && <MiniPlayer song={currentSong} />}
    </div>
  );
}
const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  sidebar: {
    width: "240px",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
  },
  mainContent: {
     marginLeft: "0px",
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  width: "calc(100% - 240px)",
  background: "#0d0734ff",

  overflowY: "scroll",  // cho phép cuộn dọc
  overflowX: "hidden",  // ẩn cuộn ngang
  scrollbarWidth: "none", // Firefox
  },
  navbar: {
    width: "calc(100% - 240px)",
    height: "70px",          // TUỲ: chỉnh chiều cao navbar nếu muốn
   position: "sticky",
    top: 0,
    padding: "10px 10px",
    zIndex: 10,
   
  },
};
