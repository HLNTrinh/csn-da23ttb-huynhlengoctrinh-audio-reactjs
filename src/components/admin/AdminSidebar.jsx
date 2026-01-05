import "./AdminSidebar.css";
import {
  MdDashboard,
  MdMusicNote,
  MdPlaylistPlay,
  MdMusicVideo,
  MdTopic,
  MdManageAccounts, // ✅ THÊM ICON NÀY
} from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  const menus = [
    { name: "Dashboard", icon: <MdDashboard />, path: "/admin", end: true },
    { name: "Quản lý Bài hát", icon: <MdMusicNote />, path: "/admin/songs" },
    {
      name: "Quản lý Danh sách",
      icon: <MdPlaylistPlay />,
      path: "/admin/playlists",
    },
    { name: "Quản lý Gợi ý", icon: <MdMusicVideo />, path: "/admin/suggest" },
    { name: "Quản lý Chủ đề", icon: <MdTopic />, path: "/admin/topics" },

    // 🔹 QUẢN LÝ TÀI KHOẢN
    {
      name: "Quản lý Tài khoản",
      icon: <MdManageAccounts />,
      path: "/admin/account",
    },
  ];

  return (
    <div className="adminsidebar">
      <div className="sidebar-logo">MUSIC </div>

      <ul className="sidebar-menu">
        {menus.map((m) => (
          <li key={m.path}>
            <NavLink
              to={m.path}
              end={m.end}
              className={({ isActive }) =>
                isActive ? "sidebar-item active" : "sidebar-item"
              }
            >
              <span className="menu-icon">{m.icon}</span>
              <span className="menu-text">{m.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
