import { useState, useRef } from "react";
import "./newchart.css";
import SidebarUser from "./SidebarUser";
import UserNavbar from "./UserNavbar";

const songs = [
  {
    rank: 1,
    change: 62,
    img: "https://image-cdn.nct.vn/song/2025/12/08/V/Y/X/f/1765165771131_300.jpg",
    title: "Chờ Anh Về",
    artists: "ANH TRAI 'SAY HI', B Ray, AMEE",
    album: "ANH TRAI 'SAY HI' 2025, TẬP 13",
    duration: "03:34",
    audio: "/audios/cho-anh-ve.mp3",
  },
  {
    rank: 2,
    img: "https://image-cdn.nct.vn/song/2025/11/28/9/6/7/6/1764318421000_300.jpg",
    title: "Anh Đã Vừa Lòng Chưa?",
    artists: "Phí Phương Anh, RIN9, DREAMEr",
    album: "Anh đã vừa lòng chưa? (Single)",
    duration: "03:54",
    audio: "/audios/vua-long-chua.mp3",
  },
  {
    rank: 3,
    img: "https://image-cdn.nct.vn/song/2025/12/08/V/Y/X/f/1765165771131_300.jpg",
    title: "GIẤC MỘNG VỠ",
    artists: "ANH TRAI 'SAY HI', Ryn Lee",
    album: "ANH TRAI 'SAY HI' 2025, TẬP 13",
    duration: "04:28",
    audio: "/audios/bach-tuong-vi.mp3",
  },
   {
    rank: 4,
    img: "https://image-cdn.nct.vn/song/2025/12/07/3/5/0/8/1765089647304_300.jpg",
    title: "Sẽ Qua Sớm Thôi",
    artists: "CODYNAMVO",
    album: "Sẽ Qua Sớm Thôi(Single)",
    duration: "04:19",
    audio: "/audios/bach-tuong-vi.mp3",
  },
];

export default function NewChart() {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef(new Audio());

  const handlePlay = (song, index) => {
    // Nếu click đúng bài đang phát → pause/play
    if (currentIndex === index) {
      audioRef.current.paused ? audioRef.current.play() : audioRef.current.pause();
      return;
    }

    // Đổi bài mới
    audioRef.current.src = song.audio;
    audioRef.current.play();
    setCurrentIndex(index);
    setCurrentSong(song);
  };

  return (
    <div style={styles.layout}>

      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <SidebarUser />
      </div>

      {/* MAIN */}
      <div style={styles.main}>

        {/* NAVBAR */}
        <div style={styles.navbar}>
          <UserNavbar />
        </div>

        {/* CONTENT */}
        <div style={styles.content}>
          <div className="chart-container">
            <h1 className="chart-title">
              BXH Nhạc Mới <span className="play-btn">▶</span>
            </h1>

            <div className="song-list">
              {songs.map((song, index) => (
                <div
                  className={`song-item ${currentIndex === index ? "playing" : ""}`}
                  key={index}
                  onClick={() => handlePlay(song, index)}
                >
                  <div className="rank">{song.rank}</div>

                  <div className="song-info">
                    <img src={song.img} alt="" className="song-img" />
                    <div className="meta">
                      <div className="meta-title">{song.title}</div>
                      <div className="meta-artist">{song.artists}</div>
                    </div>
                  </div>

                  <div className="album">{song.album}</div>
                  <div className="duration">{song.duration}</div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* PLAYER BAR Ở CUỐI TRANG */}
        {currentSong && (
          <div className="player-bar">
            <div className="player-left">
              <img src={currentSong.img} className="player-img" />
              <div>
                <p className="player-title">{currentSong.title}</p>
                <p className="player-artist">{currentSong.artists}</p>
              </div>
            </div>

            <audio ref={audioRef} controls className="audio-full">
              <source src={currentSong.audio} type="audio/mp3" />
            </audio>
          </div>
        )}

      </div>
    </div>
  );
}

// LAYOUT FIXED
const styles = {
  layout: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    background: "#0d0734",
    color: "white",
  },

  sidebar: {
    width: "240px",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    background: "#08041f",
  },

  main: {
    marginLeft: "20px", 
    width: "calc(100% - 240px)",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },

  navbar: {
    height: "63px",
    position: "fixed",
    top: 0,
    width: "calc(100% - 240px)",
    zIndex: 20,
    background: "#0d0734",
  },

  content: {
    marginTop: "0px",
    flex: 1,
    overflowY: "auto",
    padding: "20px",
  },
};
