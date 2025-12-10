import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AminNavbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  // Ẩn dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <button className="menu-btn">☰</button>

      <div className="navbar-right">
        <span className="icon">🔔</span>
        <div className="avatar" ref={dropdownRef}>
          <img
            src={currentUser?.avatar || "/image/avatar.jpg"}
            alt="avatar"
            className="avatar-img"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          {showDropdown && (
            <div className="dropdown">
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
