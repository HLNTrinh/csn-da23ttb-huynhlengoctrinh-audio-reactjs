// SongPage.jsx
import { useParams, useLocation } from "react-router-dom";   // ⬅ thêm useLocation
import { useRef, useState, useEffect } from "react";
import { songsData } from "./songsData";
import "./songpage.css";
import UserTopbar from "./UserNavbar.jsx";  // ⬅ Bạn cần tạo file này


import { IoDownloadOutline } from "react-icons/io5";
import { BsJustifyLeft } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default function SongPageUser() {
  const { id } = useParams();
  const location = useLocation();                           // ⬅ lấy URL hiện tại
  const isUserPage = location.pathname.startsWith("/user"); // ⬅ kiểm tra trang user

  const audioRef = useRef(new Audio());
  const [playing, setPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [showLyrics, setShowLyrics] = useState(true);
  const [progress, setProgress] = useState(0);

  const song = songsData.find((s) => s.id === id);

  useEffect(() => {
    if (song) setCurrentSong(song);
  }, [song]);

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.audio;
      audioRef.current.play();
      setPlaying(true);
    }
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", () => setPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  if (!song) return <div className="not-found">Bài hát không tồn tại</div>;

  const togglePlay = (selectedSong = song) => {
    if (currentSong?.id !== selectedSong.id) {
      setCurrentSong(selectedSong);
      return;
    }

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const downloadSong = () => {
    const link = document.createElement("a");
    link.href = currentSong ? currentSong.audio : song.audio;
    link.download = `${currentSong ? currentSong.title : song.title}.mp3`;
    link.click();
  };

  const handleProgressChange = (e) => {
    const value = e.target.value;
    audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
    setProgress(value);
  };

  const playlist = [song, ...song.popularSongs];

  const playNext = () => {
    const index = playlist.findIndex((s) => s.id === currentSong.id);
    setCurrentSong(playlist[(index + 1) % playlist.length]);
  };

  const playPrev = () => {
    const index = playlist.findIndex((s) => s.id === currentSong.id);
    setCurrentSong(playlist[(index - 1 + playlist.length) % playlist.length]);
  };

  return (
    <div className="songpage-layout">
       <UserTopbar /> 
      <Sidebar />

      <div className="song-page">
        {/* HEADER */}
        <div className="header">
          <img src={song.cover} className="cover" />
          <div className="info">
            <p className="label">Song</p>
            <h1>{song.title}</h1>

            <div className="artist">
              <img src={song.artistImg} className="artist-img" />
              <p>{song.artist}</p>
            </div>

            <div className="btns">
              <button className="play" onClick={() => togglePlay(song)}>
                {currentSong?.id === song.id && playing ? "⏸ Pause" : "▶ Play"}
              </button>
              <button className="down" onClick={downloadSong}>Download</button>
            </div>
          </div>
        </div>

        {/* LYRICS */}
        <div className="lyrics-box">
          <div className="lyrics-header" onClick={() => setShowLyrics(!showLyrics)}>
            <h2>Lyrics</h2>
          </div>
          {showLyrics && <div className="lyrics">{song.lyrics}</div>}
        </div>

        {/* POPULAR SONGS */}
        <div className="popular">
          <h2>Popular songs by {song.artist}</h2>
          {song.popularSongs.map((s, i) => (
            <div key={i} className="pop-item">
              <div className="left">
                <img src={s.cover} />
                <div className="info">
                  <p className="title">{s.title}</p>
                  <p className="duration">{s.duration}</p>
                </div>
              </div>

              <div className="actions">
                <button className="like-btn">❤️</button>
                <button className="play-btn" onClick={() => togglePlay(s)}>▶</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PLAYER BAR */}
      {currentSong && (
        <div className="player-bar">
          <div className="player-left">
            <img src={currentSong.cover} className="player-img" />
            <div>
              <p className="player-title">{currentSong.title}</p>
              <p className="player-artist">{currentSong.artist}</p>
            </div>
          </div>

          <div className="player-controls">
            <div className="buttons">
              <button onClick={playPrev}><FaArrowLeft /></button>
              <button onClick={() => togglePlay(currentSong)}>
                {playing ? "⏸" : "▶"}
              </button>
              <button onClick={playNext}><FaArrowRight /></button>

              <div className="menu-container">
                <button className="menu-btn"><BsJustifyLeft /></button>
                <div className="menu-content">
                  <button onClick={downloadSong}><IoDownloadOutline /></button>
                </div>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="progress-bar"
            />
          </div>
        </div>
      )}
    </div>
  );
}
