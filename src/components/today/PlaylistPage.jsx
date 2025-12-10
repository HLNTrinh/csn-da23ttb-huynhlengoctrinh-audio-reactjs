// PlaylistPage.jsx
import "./playlistPage.css";
import { IoPlay } from "react-icons/io5";
import { IoDownloadOutline } from "react-icons/io5";

export default function PlaylistPage({ playlist, onBack }) {
  if (!playlist) return null;

  return (
    <div className="playlist-page">

      {/* BACK */}
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      <div className="playlist-header">
        <img src={playlist.image} alt="" className="playlist-cover-big" />

        <div className="playlist-info">
          <p className="playlist-small">Playlist · {playlist.songs.length} Songs</p>
          <h1 className="playlist-title-big">{playlist.title}</h1>
          <p className="playlist-artists">{playlist.artists}</p>

          <div className="playlist-actions">
            <button className="playall-btn">
              <IoPlay size={20} /> Play all
            </button>

            <button className="download-btn">
              <IoDownloadOutline size={20} /> Download
            </button>
          </div>
        </div>
      </div>

      {/* SONG TABLE */}
      <table className="song-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Uploader</th>
            <th>Artist</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {playlist.songs.map((s, index) => (
            <tr key={index}>
              <td>{index + 1}</td>

              <td className="song-title">
                <img src={s.image} />
                <span>{s.title}</span>
              </td>

              <td>{s.uploader}</td>
              <td>{s.artist}</td>
              <td>{s.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
