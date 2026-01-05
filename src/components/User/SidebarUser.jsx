import "./UserSidebar.css";
import { AiOutlineHome } from "react-icons/ai";
import { FiTrendingUp } from "react-icons/fi";
import { MdAlbum, MdLibraryMusic } from "react-icons/md";
import { PiMusicNotesPlusBold } from "react-icons/pi";
import { MdOutlineStarOutline } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

export default function UserSidebar() {
  const location = useLocation();

  const menus = [
    { name: "Home", icon: <AiOutlineHome />, path: "/user" },
    { name: "Khám phá", icon: <FiTrendingUp />, path: "/user/explore" },
    { name: "Thư viện", icon: <MdLibraryMusic />, path: "/user/library" },
    { name: "BXH nhạc mới", icon: <PiMusicNotesPlusBold />, path: "/user/new" },
    { name: "Top 100", icon: <MdOutlineStarOutline />, path: "/user/top" },
  ];

  return (
    <div className="usersidebar">
      <div className="sidebar-logo">MUSIC</div>

      <ul className="sidebar-menu">
        {menus.map((m, i) => (
          <li
            key={i}
            className={
              location.pathname === m.path
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >
            <Link to={m.path}>
              <span className="menu-icon">{m.icon}</span>
              <span>{m.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
