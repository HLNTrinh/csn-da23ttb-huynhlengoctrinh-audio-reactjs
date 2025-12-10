import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AdminSidebar from "./admin/AdminSidebar.jsx";
import Navbar from "./admin/AdminNavbar.jsx";
import Dashboard from "./admin/Dashboard.jsx";

export default function AdminPage() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  if (!currentUser || currentUser.role !== "admin") {
    alert("Chỉ admin mới truy cập được!");
    return <Navigate to="/" />;
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "#f5f5f5",
  },
  sidebar: {
    width: "240px",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    color: "#fff",
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
  dashboard: {
    flex: 1,
    padding: "20px", // nếu muốn có padding
  },
};

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <AdminSidebar />
      </div>
      <div style={styles.mainContent}>
        <Navbar />
        <div style={styles.dashboard}>
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
