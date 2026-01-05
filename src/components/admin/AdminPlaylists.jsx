import { useState } from "react";
import "./adminPlaylists.css";
import AdminSidebar from "./AdminSidebar";
import Navbar from "./AdminNavbar";
import { SONG_CATEGORIES } from "/Users/huynh/music-app/src/data/song";

export default function AdminPlaylists() {
  // ================= STATE =================
  const [categories, setCategories] = useState(SONG_CATEGORIES);

  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    categoryIndex: 0,
  });

  const [isEdit, setIsEdit] = useState(false);

  // ================= FLATTEN PLAYLIST =================
  const allPlaylists = categories.flatMap((cat, cIndex) =>
    cat.items.map((pl) => ({
      ...pl,
      categoryIndex: cIndex,
      categoryTitle: cat.title,
    }))
  );

  // ================= RESET FORM =================
  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      description: "",
      categoryIndex: 0,
    });
    setIsEdit(false);
  };

  // ================= ADD =================
  const handleAdd = () => {
    if (!form.name.trim()) {
      alert("Vui lòng nhập tên playlist");
      return;
    }

    const newPlaylist = {
      id: Date.now(),
      name: form.name,
      description: form.description,
      songs: [],
    };

    const newCategories = [...categories];
    newCategories[form.categoryIndex].items.push(newPlaylist);

    setCategories(newCategories);
    resetForm();
  };

  // ================= EDIT =================
  const handleEdit = (playlist, categoryIndex) => {
    setForm({
      id: playlist.id,
      name: playlist.name,
      description: playlist.description || "",
      categoryIndex,
    });
    setIsEdit(true);
  };

  // ================= UPDATE =================
  const handleUpdate = () => {
    const newCategories = categories.map((cat, cIndex) => {
      if (cIndex !== form.categoryIndex) return cat;

      return {
        ...cat,
        items: cat.items.map((pl) =>
          pl.id === form.id
            ? {
                ...pl,
                name: form.name,
                description: form.description,
              }
            : pl
        ),
      };
    });

    setCategories(newCategories);
    resetForm();
  };

  // ================= DELETE =================
  const handleDelete = (playlistId, categoryIndex) => {
    if (!window.confirm("Bạn có chắc muốn xóa playlist này?")) return;

    const newCategories = [...categories];
    newCategories[categoryIndex].items =
      newCategories[categoryIndex].items.filter(
        (pl) => pl.id !== playlistId
      );

    setCategories(newCategories);
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
       

        <div className="admin-playlists">
          <h2>🎶 Quản lý danh sách phát</h2>

          {/* ===== FORM ===== */}
          <div className="playlist-form">
            <input
              type="text"
              placeholder="Tên playlist"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Mô tả"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
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
                Thêm playlist
              </button>
            )}
          </div>

          {/* ===== ONE TABLE ONLY ===== */}
          <div className="playlist-block">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên playlist</th>
                  <th>Mô tả</th>
                 
                  <th>Số bài</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {allPlaylists.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      Chưa có playlist
                    </td>
                  </tr>
                ) : (
                  allPlaylists.map((playlist, index) => (
                    <tr key={playlist.id}>
                      <td>{index + 1}</td>
                      <td>{playlist.name}</td>
                      <td>{playlist.description}</td>
                      <td>{playlist.songs.length}</td>
                      <td>
                        <button
                          className="btn edit"
                          onClick={() =>
                            handleEdit(
                              playlist,
                              playlist.categoryIndex
                            )
                          }
                        >
                          Sửa
                        </button>
                        <button
                          className="btn delete"
                          onClick={() =>
                            handleDelete(
                              playlist.id,
                              playlist.categoryIndex
                            )
                          }
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
    </div>
  );
}

// ================= STYLE =================
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
    marginLeft: "240px", // để tránh bị sidebar che
    position: "fixed",   // cố định mainContent
    top: 0,
    right: 0,
    bottom: 0,
    overflowY: "auto",   // cuộn nếu nội dung dài
    display: "flex",
    flexDirection: "column",
    width: "calc(100% - 240px)", // full màn hình trừ sidebar
    background: "#f5f5f5",
  },
    navbar: {
  width: "calc(100% - 2px)",
  height: "100px",
  position: "sticky",
  top: 0,
  padding: "0px",
  zIndex: 10,
  
}
};
