import { useState } from "react";
import "./adminSongs.css";
import AdminSidebar from "./AdminSidebar";
import Navbar from "./AdminNavbar";
import { SONG_CATEGORIES } from "/Users/huynh/music-app/src/data/song";

export default function AdminSongs() {
  /* ===== FLATTEN + KEEP FIRST PLAYLIST ===== */
  const seenSongs = new Set();
  const initialSongs = [];

  SONG_CATEGORIES.forEach((category) => {
    category.items.forEach((playlist) => {
      playlist.songs.forEach((song) => {
        const key = `${song.title.toLowerCase()}-${song.artist.toLowerCase()}`;

        // Nếu bài hát đã xuất hiện → bỏ qua
        if (seenSongs.has(key)) return;

        // Đánh dấu đã gặp
        seenSongs.add(key);

        // Lấy bài hát ở playlist đầu tiên
        initialSongs.push({
          id: key,
          title: song.title,
          artist: song.artist,
          playlistName: playlist.name,
          categoryName: category.title,
        });
      });
    });
  });

  const [songs, setSongs] = useState(initialSongs);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    id: null,
    title: "",
    artist: "",
    playlistName: "",
    categoryName: "",
  });

  /* ===== HANDLE FORM CHANGE ===== */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ===== ADD SONG ===== */
  const handleAdd = () => {
    if (!form.title || !form.artist) {
      alert("Nhập đầy đủ thông tin!");
      return;
    }

    setSongs([
      ...songs,
      {
        ...form,
        id: Date.now(),
      },
    ]);

    resetForm();
  };

  /* ===== EDIT SONG ===== */
  const handleEdit = (song) => {
    setForm(song);
    setIsEdit(true);
  };

  /* ===== UPDATE SONG ===== */
  const handleUpdate = () => {
    setSongs(songs.map((s) => (s.id === form.id ? form : s)));
    resetForm();
  };

  /* ===== DELETE SONG ===== */
  const handleDelete = (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa bài hát này?")) {
      setSongs(songs.filter((s) => s.id !== id));
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      title: "",
      artist: "",
      playlistName: "",
      categoryName: "",
    });
    setIsEdit(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <AdminSidebar />
      </div>

      <div style={styles.mainContent}>
        <div style={styles.navbar}>
          <Navbar />
        </div>

        <div className="admin-songs">
          <h2>🎵 Quản lý bài hát</h2>

          {/* ===== FORM ===== */}
          <div className="song-form">
            <input
              type="text"
              name="title"
              placeholder="Tên bài hát"
              value={form.title}
              onChange={handleChange}
            />

            <input
              type="text"
              name="artist"
              placeholder="Nghệ sĩ"
              value={form.artist}
              onChange={handleChange}
            />

            <input
              type="text"
              name="playlistName"
              placeholder="Playlist"
              value={form.playlistName}
              onChange={handleChange}
            />

            {isEdit ? (
              <>
                <button className="btn update" onClick={handleUpdate}>
                  Cập nhật
                </button>
                <button className="btn cancel" onClick={resetForm}>
                  Hủy
                </button>
              </>
            ) : (
              <button className="btn add" onClick={handleAdd}>
                Thêm bài hát
              </button>
            )}
          </div>

          {/* ===== TABLE ===== */}
          <table className="songs-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Bài hát</th>
                <th>Nghệ sĩ</th>
                <th>Playlist</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {songs.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    Không có bài hát
                  </td>
                </tr>
              ) : (
                songs.map((song, index) => (
                  <tr key={song.id}>
                    <td>{index + 1}</td>
                    <td>{song.title}</td>
                    <td>{song.artist}</td>
                    <td>{song.playlistName}</td>
                    <td>
                      <button
                        className="btn edit"
                        onClick={() => handleEdit(song)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn delete"
                        onClick={() => handleDelete(song.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ===== STYLES ===== */
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
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  mainContent: {
    marginLeft: "240px",
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    width: "calc(100% - 240px)",
    background: "#f5f5f5",
  },
  navbar: {
    width: "100%",
    height: "100px",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
};
