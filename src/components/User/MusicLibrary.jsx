import { useState, useEffect } from "react";
import "./music-library.css";
import SidebarUser from "./SidebarUser";
import UserNavbar from "./UserNavbar";
import MiniPlayer from "./MiniPlayer";
import { GoHeart, GoHeartFill } from "react-icons/go";

/* ===== ALBUM DEMO ===== */
const albums = [
  {
    id: 1,
    title: "ANH TRAI 'SAY HI' 2025",
    img: "https://image-cdn.nct.vn/song/2025/12/08/V/Y/X/f/1765165771131_300.jpg",
  },
];

export default function MusicLibrary() {
  /* ================= STATE ================= */
  const [tab, setTab] = useState("songs");
  const [songTab, setSongTab] = useState("liked");
  const [library, setLibrary] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [index, setIndex] = useState(-1);

  /* ================= USER ================= */
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const libraryKey = user
    ? `library_${user.id || user.username}`
    : null;

  /* ================= LOAD LIBRARY ================= */
  useEffect(() => {
    if (!libraryKey) return;

    const loadLibrary = () => {
      const data =
        JSON.parse(localStorage.getItem(libraryKey)) || [];
      setLibrary(data);
    };

    loadLibrary();
    window.addEventListener("libraryUpdated", loadLibrary);
    return () =>
      window.removeEventListener("libraryUpdated", loadLibrary);
  }, [libraryKey]);

  /* ================= FILTER ================= */
  const displayedSongs =
    songTab === "uploaded"
      ? library.filter(
          (s) => s.uploadedBy === user?.username
        )
      : library;

  /* ================= PLAYER ================= */
  const playSong = (song, i, list) => {
    setPlaylist(list);
    setIndex(i);
    setCurrentSong(song);
  };

  const next = () => {
    if (!playlist.length) return;
    const i = (index + 1) % playlist.length;
    setIndex(i);
    setCurrentSong(playlist[i]);
  };

  const prev = () => {
    if (!playlist.length) return;
    const i = (index - 1 + playlist.length) % playlist.length;
    setIndex(i);
    setCurrentSong(playlist[i]);
  };

  /* ================= ❤️ LIKE ================= */
  const isLoved = (song) =>
    library.some((s) => s.audio === song.audio);

  const toggleLike = (song) => {
    if (!libraryKey) {
      alert("Bạn cần đăng nhập");
      return;
    }

    const updated = isLoved(song)
      ? library.filter((s) => s.audio !== song.audio)
      : [...library, song];

    localStorage.setItem(libraryKey, JSON.stringify(updated));
    setLibrary(updated);
    window.dispatchEvent(new Event("libraryUpdated"));
  };

  return (
    <div style={styles.container}>
      {/* ========== SIDEBAR ========== */}
      <div style={styles.sidebar}>
        <SidebarUser />
      </div>

      {/* ========== MAIN ========== */}
      <div style={styles.mainContent}>
        <div style={styles.navbar}>
          <UserNavbar />
        </div>

        <h1 className="chart1-title">THƯ VIỆN</h1>

        {/* ===== TABS ===== */}
        <div className="library-tabs">
          {["songs", "album", "mv"].map((t) => (
            <button
              key={t}
              className={tab === t ? "active" : ""}
              onClick={() => setTab(t)}
            >
              {t === "songs" ? "BÀI HÁT" : t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* ===== FILTER ===== */}
        {tab === "songs" && (
          <div className="library-filter">
            <button
              className={`filter-btn ${
                songTab === "liked" ? "active" : ""
              }`}
              onClick={() => setSongTab("liked")}
            >
              ❤️ YÊU THÍCH
            </button>
            <button
              className={`filter-btn ${
                songTab === "uploaded" ? "active" : ""
              }`}
              onClick={() => setSongTab("uploaded")}
            >
              ⬆️ ĐÃ TẢI LÊN
            </button>
          </div>
        )}

        {/* ===== SONG LIST ===== */}
        {tab === "songs" && (
          <div className="song-table1">
            <div className="song-header1">
              <span>Bài hát</span>
              <span>Album</span>
              <span className="col-end-header">
                Thời gian
              </span>
            </div>

            {displayedSongs.length === 0 ? (
              <p className="empty-text">
                {songTab === "uploaded"
                  ? "Bạn chưa tải lên bài hát nào"
                  : "Chưa có bài hát yêu thích"}
              </p>
            ) : (
              displayedSongs.map((song, i) => (
                <div
                  key={song.audio}
                  className={`song-row ${
                    currentSong?.audio === song.audio
                      ? "playing"
                      : ""
                  }`}
                  onClick={() =>
                    playSong(song, i, displayedSongs)
                  }
                >
                  {/* SONG */}
                  <div className="col-song">
                    <img
                      src={song.img}
                      alt={song.title}
                      className="song-img1"
                    />
                    <div className="song-meta">
                      <p className="music-meta-title1">
                        {song.title}
                      </p>
                      <p className="music-meta-artist1">
                        {song.artist}
                      </p>
                    </div>
                  </div>

                  {/* ALBUM */}
                  <div className="col-album">
                    {song.album || "--"}
                  </div>
                  <div className="col-end">
                    <button
                      className={`heart-btn-row ${
                        isLoved(song) ? "active" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(song);
                      }}
                    >
                      {isLoved(song) ? (
                        <GoHeartFill />
                      ) : (
                        <GoHeart />
                      )}
                    </button>

                    <span className="song-time">
                      {song.duration || "--:--"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ===== ALBUM ===== */}
        {tab === "album" && (
          <div className="album-grid">
            {albums.map((a) => (
              <div key={a.id} className="album-item">
                <img src={a.img} alt={a.title} />
                <p>{a.title}</p>
              </div>
            ))}
          </div>
        )}

        {/* ===== MV ===== */}
        {tab === "mv" && (
          <div className="empty-text">
            Chưa có MV
          </div>
        )}
      </div>

      {/* ===== MINI PLAYER ===== */}
      {currentSong && (
        <MiniPlayer
          song={currentSong}
          onNext={next}
          onPrev={prev}
        />
      )}
    </div>
  );
}

/* ================= STYLE ================= */
const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  sidebar: {
    width: "240px",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
  },
  mainContent: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    width: "calc(100% - 240px)",
    background: "#0d0734ff",
    overflowY: "scroll",
    overflowX: "hidden",
    scrollbarWidth: "none",
  },
  navbar: {
    width: "calc(100% - 240px)",
    height: "70px",
    position: "sticky",
    top: 0,
    padding: "10px",
    zIndex: 10,
  },
};