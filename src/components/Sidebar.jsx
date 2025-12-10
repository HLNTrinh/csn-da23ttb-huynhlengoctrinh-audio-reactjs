import { useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FiTrendingUp } from "react-icons/fi";
import { MdAlbum } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { MdLibraryMusic } from "react-icons/md";
import { AiFillBell } from "react-icons/ai";
import { PiMusicNotesPlusBold } from "react-icons/pi";
import { MdOutlineStarOutline } from "react-icons/md";

import { isLoggedIn } from "./auth"; // kiểm tra đăng nhập

export default function Sidebar() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  const handleNavigate = (path, requireLogin = false) => {
    if (requireLogin && !isLoggedIn()) {
      alert("Bạn phải đăng nhập trước khi truy cập!");
      return;
    }
    navigate(path);
  };

  return (
    <aside style={sidebarStyle}>
      {/* Logo */}
      <div className="sidebar-logo">MUSIC</div>

      {/* Menu chính */}
      <div style={menuStyle}>
        <button onClick={() => handleNavigate("/")} style={btnStyle}>
          <AiOutlineHome style={{ marginRight: 8 }} />
          Trang chủ
        </button>

        <button onClick={() => handleNavigate("/library/songs", true)} style={btnStyle}>
          <FiTrendingUp style={{ marginRight: 8 }} />
          Khám phá
        </button>

        <button onClick={() => handleNavigate("/library/albums", true)} style={btnStyle}>
          <MdAlbum style={{ marginRight: 8 }} />
          Album
        </button>

        <button onClick={() => handleNavigate("/library/love", true)} style={btnStyle}>
          <MdLibraryMusic style={{ marginRight: 8 }} />
          Thư Viện
        </button>

        <button onClick={() => handleNavigate("/library/topic", true)} style={btnStyle}>
          <PiMusicNotesPlusBold style={{ marginRight: 8 }} />
          BXH nhạc mới
        </button>

        <button onClick={() => handleNavigate("/library/top100", true)} style={btnStyle}>
          <MdOutlineStarOutline style={{ marginRight: 8 }} />
          Top 100
        </button>

        {/* ⭐ Trang cá nhân */}
       

        {/* ⭐ Admin - chỉ hiện khi role = "admin" */}
        {currentUser?.role === "admin" && (
          <button onClick={() => handleNavigate("/admin", true)} style={{ ...btnStyle, color: "#ff8181" }}>
            <RiAdminLine style={{ marginRight: 8 }} />
            Quản trị viên
          </button>
        )}
      </div>
    </aside>
  );
}

const sidebarStyle = {
  width: "240px",
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  backgroundColor: "#12162eff",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  boxSizing: "border-box",
};

const menuStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "30px",
};

const btnStyle = {
  display: "flex",
  alignItems: "center",
  background: "none",
  border: "none",
  color: "#fff",
  fontSize: 22,
  cursor: "pointer",
};
