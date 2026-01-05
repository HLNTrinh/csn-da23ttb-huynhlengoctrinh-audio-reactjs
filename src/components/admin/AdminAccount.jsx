import { useEffect, useState } from "react";
import "./adminAccount.css";
import Navbar from "./AdminNavbar.jsx";
import AdminSidebar from "./AdminSidebar.jsx";

export default function AdminAccount() {
  const [users, setUsers] = useState([]);

  // ===== FORM STATE =====
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  /* ================= LOAD USERS ================= */
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(data);
  }, []);

  /* ================= SAVE + SYNC ================= */
  const saveUsers = (newUsers) => {
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));

    const current = JSON.parse(localStorage.getItem("currentUser"));
    if (current) {
      const updated = newUsers.find((u) => u.id === current.id);
      if (updated) {
        localStorage.setItem("currentUser", JSON.stringify(updated));
      }
    }
  };

  /* ================= ADD USER ================= */
  const addUser = () => {
    if (!form.username || !form.email || !form.password) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (users.some((u) => u.email === form.email)) {
      alert("Email đã tồn tại");
      return;
    }

    const newUser = {
      id: Date.now(),
      username: form.username,
      email: form.email,
      password: form.password,
      role: form.role,
      blocked: false,
      avatar: "/image/user.jpg",
    };

    saveUsers([...users, newUser]);

    setForm({
      username: "",
      email: "",
      password: "",
      role: "user",
    });
  };

  /* ================= ACTIONS ================= */
  const toggleBlock = (id) => {
    saveUsers(
      users.map((u) =>
        u.id === id ? { ...u, blocked: !u.blocked } : u
      )
    );
  };

  const toggleRole = (id) => {
    saveUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, role: u.role === "admin" ? "user" : "admin" }
          : u
      )
    );
  };

  const deleteUser = (id) => {
    if (!window.confirm("Xóa tài khoản này?")) return;
    saveUsers(users.filter((u) => u.id !== id));
  };

  /* ================= UI ================= */
  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <AdminSidebar />
      </div>

      <div style={styles.mainContent}>
        <Navbar />

        <div className="admin-account">
          <h1>Quản lý tài khoản</h1>

          {/* ===== ADD USER FORM ===== */}
          <div className="add-user-form">
            <input
              placeholder="Tên người dùng"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <select
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <button className="add-btn" onClick={addUser}>
              + Thêm tài khoản
            </button>
          </div>

          {/* ===== TABLE ===== */}
          <table className="admin-table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Role</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan="6">Chưa có tài khoản</td>
                </tr>
              )}

              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <img
                      src={u.avatar}
                      className="avatar"
                      alt=""
                    />
                  </td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>
                    <button
                      className="role-btn"
                      onClick={() => toggleRole(u.id)}
                    >
                      {u.role}
                    </button>
                  </td>
                  <td>
                    {u.blocked ? "🚫 Bị khóa" : "✅ Hoạt động"}
                  </td>
                  <td>
                    <button onClick={() => toggleBlock(u.id)}>
                      {u.blocked ? "Mở" : "Khóa"}
                    </button>
                    <button
                      className="danger"
                      onClick={() => deleteUser(u.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLE ================= */
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
};
