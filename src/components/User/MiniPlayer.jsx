import { useEffect, useRef, useState } from "react";
import "./miniPlayer.css";
import {
  MdSkipPrevious,
  MdSkipNext,
  MdPlayArrow,
  MdPause,
  MdDownload,
} from "react-icons/md";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { LuTimerReset } from "react-icons/lu";

/* ===== HELPER ===== */
const getLibraryKey = (user) =>
  user ? `library_${user.id || user.username}` : null;

const getNotifyKey = (user) =>
  user ? `notifications_${user.id || user.username}` : null;

export default function MiniPlayer({ song, onNext, onPrev }) {
  const audioRef = useRef(null);
  const lastAudio = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoved, setIsLoved] = useState(false);
  const [toast, setToast] = useState("");

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const libraryKey = getLibraryKey(user);
  const notifyKey = getNotifyKey(user);
  const isLoggedIn = !!user;

  /* ================= AUTO PLAY ================= */
  useEffect(() => {
    if (!audioRef.current || !song?.audio) return;

    if (lastAudio.current === song.audio) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setPlaying(true);
      return;
    }

    lastAudio.current = song.audio;
    audioRef.current.src = song.audio;
    audioRef.current.currentTime = 0;

    audioRef.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [song]);

  /* ================= SYNC ❤️ ================= */
  useEffect(() => {
    if (!libraryKey || !song?.audio) return;

    const syncLibrary = () => {
      const lib = JSON.parse(localStorage.getItem(libraryKey)) || [];
      setIsLoved(lib.some((s) => s.audio === song.audio));
    };

    syncLibrary();
    window.addEventListener("libraryUpdated", syncLibrary);
    return () =>
      window.removeEventListener("libraryUpdated", syncLibrary);
  }, [song, libraryKey]);

  /* ================= PROGRESS ================= */
  const onTimeUpdate = () => {
    const a = audioRef.current;
    if (!a?.duration) return;
    setProgress((a.currentTime / a.duration) * 100);
  };

  const seek = (e) => {
    const a = audioRef.current;
    if (!a?.duration) return;
    a.currentTime = (e.target.value / 100) * a.duration;
  };

  /* ================= CONTROLS ================= */
  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;

    if (a.paused) {
      a.play();
      setPlaying(true);
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  const reset = () => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
    setPlaying(false);
    setProgress(0);
  };

  /* ================= ❤️ + 🔔 ================= */
  const toggleLibrary = () => {
  if (!isLoggedIn) {
    alert("Bạn cần đăng nhập");
    return;
  }
  if (!song?.audio) return;

  const lib = JSON.parse(localStorage.getItem(libraryKey)) || [];
  const exists = lib.some((s) => s.audio === song.audio);

  let updatedLib = [];
  const notifications = JSON.parse(
    localStorage.getItem(notifyKey) || "[]"
  );

  if (exists) {
    // 💔 REMOVE
    updatedLib = lib.filter((s) => s.audio !== song.audio);
    setToast("💔 Đã xóa khỏi thư viện");

    notifications.unshift({
      id: Date.now(),
      type: "library-remove",
      songId: song.id,
      text: `${song.title} đã bị xóa khỏi thư viện`,
      time: new Date().toLocaleTimeString(),
    });
  } else {
    // ❤️ ADD
    updatedLib = [...lib, song];
    setToast("❤️ Đã thêm vào thư viện");

    notifications.unshift({
      id: Date.now(),
      type: "library-add",
      songId: song.id,
      text: `${song.title} đã được thêm vào thư viện`,
      time: new Date().toLocaleTimeString(),
    });
  }

  // SAVE
  localStorage.setItem(libraryKey, JSON.stringify(updatedLib));
  localStorage.setItem(notifyKey, JSON.stringify(notifications));

  setIsLoved(!exists);

  // 🔄 SYNC ALL
  window.dispatchEvent(new Event("library-updated"));
  window.dispatchEvent(new Event("notificationUpdated"));

  setTimeout(() => setToast(""), 2000);
};

  if (!song) return null;

  return (
    <>
      <div className="mini-player">
        <img src={song.img} className="mini-img" alt={song.title} />

        <div className="mini-info">
          <h4>{song.title}</h4>
          <p>{song.artist}</p>
        </div>

        <div className="mini-bottom">
          <div className="mini-controls">
            <button className="icon-btn" onClick={onPrev}>
              <MdSkipPrevious />
            </button>

            <button className="play-btn" onClick={togglePlay}>
              {playing ? <MdPause /> : <MdPlayArrow />}
            </button>

            <button className="icon-btn" onClick={onNext}>
              <MdSkipNext />
            </button>

            <button className="icon-btn" onClick={reset}>
              <LuTimerReset />
            </button>

            <button
              className={`icon-btn ${isLoved ? "active" : ""}`}
              onClick={toggleLibrary}
            >
              {isLoved ? <GoHeartFill color="#ff4f6d"/> : <GoHeart />}
            </button>

            <a className="icon-btn" href={song.audio} download>
              <MdDownload />
            </a>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={seek}
            className="seek-bar"
          />
        </div>

        <audio ref={audioRef} onTimeUpdate={onTimeUpdate} />
      </div>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
