import "./AdminSidebar.css";
import { MdDashboard, MdMusicNote, MdPlaylistPlay, MdMusicVideo } from "react-icons/md";
export default function Sidebar() {
  const menus = [
      { name: "DashBoard", icon: <MdDashboard /> },
  { name: "Quản lý bài hát", icon: <MdMusicNote /> },
  { name: "Quản lý danh sách", icon: <MdPlaylistPlay /> },
  { name: "Quản lý gợi ý", icon: < MdMusicVideo /> },
  ];

  return (
    <div className="adminsidebar">
      <div className="sidebar-logo">MUSIC</div>

      <ul className="sidebar-menu">
  {menus.map((m, index) => (
    <li key={index} className="sidebar-item">
      <span className="menu-icon">{m.icon}</span>
      <span>{m.name}</span>
    </li>
  ))}
</ul>
    </div>
  );
}
