import { useEffect, useRef, useState } from "react";
import "./miniPlayer.css";
import { MdDownload } from "react-icons/md";
import { GoHeart } from "react-icons/go";
import { GrPowerReset } from "react-icons/gr";
export default function MiniPlayer({ song, onAddToLibrary, onNext, onPrev }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!audioRef.current || !song) return;

    // STOP OLD SONG
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    // WAIT THEN PLAY NEW SONG
    setTimeout(() => {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }, 50);

  }, [song]);

  if (!song) return null;

  const togglePlay = () => {
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    const cur = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 1;
    setProgress((cur / dur) * 100);
  };

  const handleSeek = (e) => {
    const dur = audioRef.current.duration;
    audioRef.current.currentTime = (e.target.value / 100) * dur;
    setProgress(e.target.value);
  };

  // RESET FUNCTION
  const handleReset = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setProgress(0);
    setPlaying(false);
  };

  return (
    <div className="mini-player">
      <img src={song.img} className="mini-img" />

      <div className="mini-info">
        <h4>{song.title}</h4>
        <p>{song.artist}</p>
      </div>

      <div className="mini-right">
        <button className="icon-btn" onClick={() => onAddToLibrary(song)}><GoHeart /></button>
        <a className="icon-btn" href={song.audio} download><MdDownload /></a>
      </div>

      <div className="mini-bottom">

        <div className="mini-controls">
          <button className="icon-btn" onClick={onPrev}>⏮</button>

          <button className="icon-btn" onClick={togglePlay}>
            {playing ? "⏸" : "▶"}
          </button>

          <button className="icon-btn" onClick={onNext}>⏭</button>

          {/* NEW RESET BUTTON */}
          <button className="icon-btn" onClick={handleReset}><GrPowerReset /></button>
        </div>

        <input
          type="range"
          className="seek-bar"
          value={progress}
          onChange={handleSeek}
        />
      </div>

      <audio
        ref={audioRef}
        src={song.audio}
        onTimeUpdate={handleTimeUpdate}
      />
    </div>
  );
}
