import { useState, useMemo } from "react";
import "./trendingsongs.css";
import MiniPlayer from "./MiniPlayer";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FiRefreshCcw } from "react-icons/fi";
import { useRecommend } from "../../context/RecommendContext";
import { SONG_CATEGORIES } from "../../data/song";

export default function TrendingSongs() {
  /* ===== GỢI Ý TỪ ADMIN ===== */
  const { recommendedSongs } = useRecommend();

  /* ===== PLAYER ===== */
  const [currentIndex, setCurrentIndex] = useState(null);
  const [shuffleKey, setShuffleKey] = useState(0);

  /* ===== ❤️ LIBRARY ===== */
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const libraryKey = user ? `library_${user.username}` : "library_guest";

  const [library, setLibrary] = useState(
    JSON.parse(localStorage.getItem(libraryKey)) || []
  );

  const isLoved = (song) =>
    library.some(
      (s) =>
        s.title === song.title &&
        s.artist === song.artist
    );

  const toggleLibrary = (song) => {
    const updated = isLoved(song)
      ? library.filter(
          (s) =>
            s.title !== song.title ||
            s.artist !== song.artist
        )
      : [...library, song];

    setLibrary(updated);
    localStorage.setItem(libraryKey, JSON.stringify(updated));
  };

  /* ===== GỢI Ý (KHÔNG TRÙNG) ===== */
  const displaySongs = useMemo(() => {
    const source =
      recommendedSongs.length > 0
        ? recommendedSongs
        : SONG_CATEGORIES.flatMap((c) =>
            c.items.flatMap((p) => p.songs)
          );

    // 🔥 LOẠI BỎ BÀI TRÙNG (title + artist)
    const uniqueMap = new Map();

    source.forEach((song) => {
      const key = `${song.title?.toLowerCase()}-${song.artist?.toLowerCase()}`;
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, song); // chỉ lấy bài đầu tiên
      }
    });

    return Array.from(uniqueMap.values())
      .sort(() => Math.random() - 0.5)
      .slice(0, 9);
  }, [recommendedSongs, shuffleKey]);

  /* ===== PLAY CONTROL ===== */
  const handlePlay = (index) => {
    setCurrentIndex(index);
  };

  const nextSong = () => {
    setCurrentIndex((i) =>
      i + 1 < displaySongs.length ? i + 1 : 0
    );
  };

  const prevSong = () => {
    setCurrentIndex((i) =>
      i - 1 >= 0 ? i - 1 : displaySongs.length - 1
    );
  };

  /* ===== REFRESH ===== */
  const refreshSuggest = () => {
    setCurrentIndex(null);
    setShuffleKey((k) => k + 1);
  };

  return (
    <div className="suggest-container">
      {/* ===== HEADER ===== */}
      <div className="suggest-header">
        <h4 className="suggest-title">Gợi ý bài hát</h4>

        <button className="refresh1-btn" onClick={refreshSuggest}>
          <FiRefreshCcw /> Làm mới
        </button>
      </div>

      {/* ===== LIST ===== */}
      <div className="suggest-grid">
        {displaySongs.map((song, index) => {
          const active = currentIndex === index;

          return (
            <div
              key={`${song.title}-${song.artist}`}
              className={`suggest-item ${active ? "active" : ""}`}
              onClick={() => handlePlay(index)}
            >
              <img
                src={song.img}
                alt={song.title}
                className="suggest-img"
              />

              <div className="suggest-info">
                <p className="suggest-name">{song.title}</p>
                <p className="suggest-artist">{song.artist}</p>

                {song.uploader && (
                  <div className="suggest-uploader">
                    {song.artistImg && (
                      <img
                        src={song.artistImg}
                        alt={song.uploader}
                        className="uploader-img"
                      />
                    )}
                    <span className="uploader-name">
                      {song.uploader}
                    </span>
                  </div>
                )}
              </div>

              <button
                className="heart-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLibrary(song);
                }}
              >
                {isLoved(song) ? (
                  <GoHeartFill className="heart active" />
                ) : (
                  <GoHeart className="heart" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* ===== MINI PLAYER ===== */}
      {currentIndex !== null && displaySongs[currentIndex] && (
        <MiniPlayer
          song={displaySongs[currentIndex]}
          onNext={nextSong}
          onPrev={prevSong}
        />
      )}
    </div>
  );
}
