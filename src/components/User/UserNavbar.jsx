import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserNavbar.css";
import SearchDropDowm1 from "./SearchFull";
export default function UserNavbar() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const [showDropdown, setShowDropdown] = useState(false);

  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  // Ẩn dropdown khi click ra ngoài
  useEffect(() => {
    const clickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  return (
    <div className="user-navbar">
      {/* Nút mở sidebar nếu cần */}
      <button className="menu-btn">☰</button>

      {/* THANH TÌM KIẾM */}
      <div className="search-box">
      <SearchDropDowm1/>
      </div>

      {/* ICON + AVATAR */}
      <div className="navbar-right">
        <span className="bell">🔔</span>

        <div className="avatar" ref={dropdownRef}>
          <img
            src={currentUser?.avatar || "/image/user.jpg"}
            alt="avatar"
            className="avatar-img"
            onClick={() => setShowDropdown(!showDropdown)}
          />

          {showDropdown && (
            <div className="dropdown">
              <button className="dropdown-item">Thông tin cá nhân</button>
              <button className="dropdown-item">Yêu thích</button>
              <button className="logout-btn" onClick={handleLogout}>
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
