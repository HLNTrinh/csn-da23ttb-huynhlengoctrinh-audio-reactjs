import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AdminSidebar from "./admin/AdminSidebar.jsx";
import Navbar from "./admin/AdminNavbar.jsx";
import Dashboard from "./admin/Dashboard.jsx";

export default function AdminPage() {
   const navigate = useNavigate();
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );
  if (!currentUser || currentUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  

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
  dashboard: {
    flex: 1,
    padding: "20px", // nếu muốn có padding
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

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <AdminSidebar />
      </div>
      <div style={styles.mainContent}>
         <div style={styles.navbar}>
                               <Navbar />
                             </div>
        <div style={styles.dashboard}>
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
