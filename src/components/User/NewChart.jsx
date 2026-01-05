import { useState, useEffect } from "react";
import "./newchart.css";
import SidebarUser from "./SidebarUser";
import UserNavbar from "./UserNavbar";
import MiniPlayer from "./MiniPlayer";
import { GoHeart, GoHeartFill } from "react-icons/go";

/* ================= HELPERS ================= */
const getLibraryKey = (user) =>
  user ? `library_${user.id || user.username}` : null;

const getNotifyKey = (user) =>
  user ? `notifications_${user.id || user.username}` : null;

/* ================= SONG DATA ================= */
const songs = [
  {
    id: 1,
    img: "https://image-cdn.nct.vn/song/2025/12/08/V/Y/X/f/1765165771131_300.jpg",
    title: "Chờ Anh Về",
    artist: "ANH TRAI 'SAY HI', B Ray, AMEE",
    album: "ANH TRAI 'SAY HI' 2025, TẬP 13",
    duration: "03:34",
    audio: "/music/CHỜ ANH VỀ.mp3",
  },
  {
    id: 2,
    img: "/convers/6.jpg",
    title: "Không Buông",
    artist: "Hngle, Ari",
    album: "Không Buông (Single)",
    duration: "03:54",
    audio: "/music/Không Buông.mp3",
  },
  {
    id: 3,
    img: "https://image-cdn.nct.vn/song/2025/11/26/Z/U/0/5/1764129218488_300.jpg",
    title: "ĐỂ THƯƠNG ĐỂ CHO NHAU",
    artist: "Otis, Yeolan",
    album: "ĐỂ THƯƠNG ĐỂ CHO NHAU (Single)",
    duration: "04:28",
    audio: "/music/ĐỂ THƯƠNG ĐỂ CHO NHAU.mp3",
  },
   {
    id:4,
    img: "https://image-cdn.nct.vn/song/2025/12/07/3/5/0/8/1765089647304_300.jpg",
    title: "Sẽ Qua Sớm Thôi",
    artist: "CODYNAMVO",
    album: "Sẽ Qua Sớm Thôi (Single)",
    duration: "04:19",
    audio: "/music/Sẽ Qua Sớm Thôi.mp3",
  },
  {
    id:5,
     img: "https://image-cdn.nct.vn/song/2025/11/28/m/Z/m/l/1764309023569_300.jpg", 
     title: "The Fate of Ophelia",
      artist: "Taylor Swift, The Chainsmokers",
      album: "The Fate of Ophelia (Single)",
      duration: "03:43",
      audio:"/music/The Fate of Ophelia.mp3",
  },
  { id:6,
    title: "NOT CUTE ANYMORE", artist: "ILLIT" ,
    img:"https://image-cdn.nct.vn/song/2025/11/24/g/I/I/y/1763980894698_300.jpg",
     album: "NOT CUTE ANYMORE (Single)",
    duration: "03:40",
    audio:"/music/NOT CUTE ANYMORE.mp3",
  },
  { id:7,
    img:"https://image-cdn.nct.vn/song/2024/11/21/5/9/b/6/1732159976457_300.jpg",
    title: "Pin Dự Phòng",
    artist: "Dương Domic,Lou Hoàng", 
    album: "Dương Domic (Single)",
      duration: "03:25",
      audio:"/music/Pin Dự Phòng.mp3",
  },
  { id:8,
    img: "https://image-cdn.nct.vn/song/2025/11/25/1/b/e/5/1764049685571_300.jpg", title: "Anh Sẽ Quên Được Em", artist: "QuocKiet",
    album: "Anh Sẽ Quên Được Em (Single)",
      duration: "03:40",
      audio:"/music/Anh Sẽ Quên Được Em.mp3",
  },
   {id:9,
    img: "https://image-cdn.nct.vn/song/2020/08/06/6/0/8/0/1596715581082_300.jpg", title:"Phải Là Yêu", artist:"HIEUTHUHAI, HURRYKNG", audio:"/music/Phải Là Yêu.mp3",
    album: "Phải Là Yêu (Single)",
      duration: "05:23",
  },

  {id:10,

     img: "https://image-cdn.nct.vn/song/2025/11/21/C/Y/j/k/1763719323352_300.jpg", title:"QUAN TRỌNG KHÔNG?", artist:"choi", audio:"/music/QUAN TRỌNG KHÔNG_.mp3",
       album: "Quan trọng không(Single)",
      duration: "04:20",
  },
];

/* ================= COMPONENT ================= */
export default function NewChart() {
  const [chartSongs, setChartSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const libraryKey = getLibraryKey(user);
  const notifyKey = getNotifyKey(user);

  const [library, setLibrary] = useState([]);

  const isLoved = (song) =>
    library.some((s) => s.audio === song.audio);

  /* ===== INIT CHART ===== */
  useEffect(() => {
    const init = songs.map((s, i) => ({
      ...s,
      rank: i + 1,
    }));
    setChartSongs(init);
  }, []);

  /* ===== SYNC LIBRARY REALTIME ===== */
  useEffect(() => {
    if (!libraryKey) return;

    const syncLibrary = () => {
      const data = JSON.parse(localStorage.getItem(libraryKey)) || [];
      setLibrary(data);
    };

    syncLibrary();
    window.addEventListener("library-updated", syncLibrary);
    return () =>
      window.removeEventListener("library-updated", syncLibrary);
  }, [libraryKey]);

  /* ===== PLAY ===== */
  const handlePlay = (song) => {
    setCurrentSong(song);
    setCurrentIndex(chartSongs.findIndex((s) => s.id === song.id));
  };

  const playNext = () => {
    if (currentIndex === null) return;
    const next = (currentIndex + 1) % chartSongs.length;
    setCurrentIndex(next);
    setCurrentSong(chartSongs[next]);
  };

  const playPrev = () => {
    if (currentIndex === null) return;
    const prev =
      (currentIndex - 1 + chartSongs.length) % chartSongs.length;
    setCurrentIndex(prev);
    setCurrentSong(chartSongs[prev]);
  };

  /* ===== ❤️ + 🔔 TOGGLE ===== */
  const toggleLibrary = (song, e) => {
    e.stopPropagation();
    if (!user) return alert("Bạn cần đăng nhập");

    const exists = isLoved(song);
    let updatedLib = [];

    const notifications = JSON.parse(
      localStorage.getItem(notifyKey) || "[]"
    );

    if (exists) {
      updatedLib = library.filter((s) => s.audio !== song.audio);
      notifications.unshift({
        id: Date.now(),
        type: "remove",
        text: `${song.title} đã bị xóa khỏi thư viện`,
        time: new Date().toLocaleTimeString(),
      });
    } else {
      updatedLib = [...library, song];
      notifications.unshift({
        id: Date.now(),
        type: "add",
        text: `${song.title} đã được thêm vào thư viện`,
        time: new Date().toLocaleTimeString(),
      });
    }

    setLibrary(updatedLib);
    localStorage.setItem(libraryKey, JSON.stringify(updatedLib));
    localStorage.setItem(notifyKey, JSON.stringify(notifications));

    window.dispatchEvent(new Event("library-updated"));
    window.dispatchEvent(new Event("notificationUpdated"));
  };

  /* ================= UI ================= */
  return (
    <div style={styles.container}>
  <div style={styles.sidebar}>
         <SidebarUser />
       </div>
      <div style={styles.mainContent}>
        <div style={styles.navbar}>
                 <UserNavbar />
               </div>
        <div className="chart-container">
          <h1 className="chart-title">BXH Nhạc Mới</h1>
{/* ===== HEADER ===== */}
<div className="song-header">
  <div className="header-left">
    <span className="header-rank">#</span>
    <span className="header-song">Bài hát</span>
  </div>

  <div className="header-album">Album</div>

  <div className="header-right">
    <span className="header-time">Thời gian</span>
  </div>
</div>

          <div className="song-list">
            {chartSongs.map((song) => {
              const active = currentSong?.id === song.id;

              return (
                <div
                  key={song.id}
                  className={`song-item ${active ? "playing" : ""}`}
                  onClick={() => handlePlay(song)}
                >
                  <div className="song-left">
                    <div className="rank">{song.rank}</div>
                    <img src={song.img} className="song-img" />
                    <div className="meta">
                      <div className="meta-title">{song.title}</div>
                      <div className="meta-artist">{song.artist}</div>
                    </div>
                  </div>

                  <div className="song-album1">{song.album}</div>

                  <div className="song-right">
                    <button
                      className={`heart-btn ${
                        active || isLoved(song) ? "show" : ""
                      }`}
                      onClick={(e) => toggleLibrary(song, e)}
                    >
                      {isLoved(song) ? (
                        <GoHeartFill color="#ff4f6d" />
                      ) : (
                        <GoHeart />
                      )}
                    </button>

                    <span className="duration">{song.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {currentSong && (
        <MiniPlayer
          song={currentSong}
          onNext={playNext}
          onPrev={playPrev}
        />
      )}
    </div>
  );
}

/* ================= STYLES ================= */
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
