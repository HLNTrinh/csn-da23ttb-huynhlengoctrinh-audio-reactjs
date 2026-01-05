import { useState } from "react";
import "./adminTopics.css";
import AdminSidebar from "./AdminSidebar";
import Navbar from "./AdminNavbar";
import { INIT_TOPICS } from "../../data/mockTopics";

export default function AdminTopics() {
  // ================= STATE =================
  const [topics, setTopics] = useState(INIT_TOPICS);

  const [form, setForm] = useState({
    id: null,
    name: "",
    img: "",
    songCount: 0,
  });

  const [isEdit, setIsEdit] = useState(false);

  // ================= RESET FORM =================
  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      img: "",
      songCount: 0,
    });
    setIsEdit(false);
  };

  // ================= ADD =================
  const handleAdd = () => {
    if (!form.name.trim()) {
      alert("Vui lòng nhập tên chủ đề");
      return;
    }

    const newTopic = {
      id: form.name.toLowerCase().replace(/\s+/g, "-"),
      name: form.name,
      img: form.img || "/image/default-topic.png",
      songCount: Math.floor(Math.random() * 20) + 1, // giả lập
    };

    setTopics([...topics, newTopic]);
    resetForm();
  };

  // ================= EDIT =================
  const handleEdit = (topic) => {
    setForm(topic);
    setIsEdit(true);
  };

  // ================= UPDATE =================
  const handleUpdate = () => {
    setTopics(
      topics.map((t) =>
        t.id === form.id
          ? {
              ...t,
              name: form.name,
              img: form.img,
            }
          : t
      )
    );
    resetForm();
  };

  // ================= DELETE =================
  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá chủ đề này?")) return;
    setTopics(topics.filter((t) => t.id !== id));
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
      

        <div className="admin-topics">
          <h2>🏷️ Quản lý Chủ đề</h2>

          {/* ===== FORM ===== */}
          <div className="topic-form">
         
         <input
  type="text"
  placeholder="Tên chủ đề"
  value={form.name}
  onChange={(e) =>
    setForm({ ...form, name: e.target.value })
  }
/>

<input
  type="number"
  placeholder="Số lượng bài hát"
  value={form.songCount}
  onChange={(e) =>
    setForm({ ...form, songCount: Number(e.target.value) })
  }
/>


            {isEdit ? (
              <>
                <button className="btn update" onClick={handleUpdate}>
                  Cập nhật
                </button>
                <button className="btn cancel" onClick={resetForm}>
                  Huỷ
                </button>
              </>
            ) : (
              <button className="btn add" onClick={handleAdd}>
                Thêm chủ đề
              </button>
            )}
          </div>

          {/* ===== TABLE ===== */}
          <table className="topics-table">
            <thead>
              <tr>
                <th>#</th>
               
                <th>Tên chủ đề</th>
                <th>Số bài hát</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {topics.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    Chưa có chủ đề
                  </td>
                </tr>
              ) : (
                topics.map((topic, index) => (
                  <tr key={topic.id}>
                    <td>{index + 1}</td>
                   
                    <td>{topic.name}</td>
                    <td>{topic.songCount}</td>
                    <td>
                      <button
                        className="btn edit"
                        onClick={() => handleEdit(topic)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn delete"
                        onClick={() => handleDelete(topic.id)}
                      >
                        Xoá
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
  width: "calc(100% - 2px)",
  height: "100px",
  position: "sticky",
  top: 0,
  padding: "0px",
  zIndex: 10,
  
}
};
