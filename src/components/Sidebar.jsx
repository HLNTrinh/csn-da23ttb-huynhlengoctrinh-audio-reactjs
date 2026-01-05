import { useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FiTrendingUp } from "react-icons/fi";
import { MdAlbum, MdLibraryMusic, MdOutlineStarOutline } from "react-icons/md";
import { PiMusicNotesPlusBold } from "react-icons/pi";

// ✅ Hàm kiểm tra đăng nhập
const isLoggedIn = () => {
  return !!localStorage.getItem("user"); // hoặc "user"
};

export default function Sidebar() {
  const navigate = useNavigate();

  const handleNavigate = (path, requireLogin = false) => {
    if (requireLogin && !isLoggedIn()) {
      alert("Bạn phải đăng nhập trước khi truy cập!");
      navigate("/login"); // chuyển sang trang login
      return;
    }
    navigate(path);
  };

  return (
    <aside style={sidebarStyle}>
      <div className="sidebar-logo">MUSIC</div>

      <div style={menuStyle}>
        <button onClick={() => handleNavigate("/")} style={btnStyle}>
          <AiOutlineHome style={{ marginRight: 8 }} />
          Home
        </button>

        <button onClick={() => handleNavigate("/library/songs", true)} style={btnStyle}>
          <FiTrendingUp style={{ marginRight: 8 }} />
          Khám phá
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
  backgroundColor: "#12162e",
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
