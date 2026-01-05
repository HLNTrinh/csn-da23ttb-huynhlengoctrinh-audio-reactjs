import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AminNavbar.css";
import { RxExit } from "react-icons/rx";
import { FiSearch, FiUser } from "react-icons/fi";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  // 🚫 CHẶN KHÔNG PHẢI ADMIN
  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showNoti, setShowNoti] = useState(false);
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);

  const dropdownRef = useRef(null);
  const notiRef = useRef(null);

  // Load notifications
  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("adminNotifications") || "[]"
    );
    setNotifications(data);
  }, []);

  // Click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        notiRef.current &&
        !notiRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
        setShowNoti(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Admin search:", search);
  };

  const markAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem(
      "adminNotifications",
      JSON.stringify(updated)
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="navbar">
      {/* SEARCH */}
      <form className="navbar-search" onSubmit={handleSearch}>
        <FiSearch />
        <input
          type="text"
          placeholder="Tìm kiếm admin..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      {/* RIGHT */}
      <div className="navbar-right">
        {/* 🔔 NOTIFICATION */}
        <div
          className="notification"
          ref={notiRef}
          onClick={() => {
            setShowNoti(!showNoti);
            markAsRead();
          }}
        >
          🔔
          {unreadCount > 0 && (
            <span className="badge">{unreadCount}</span>
          )}

          {showNoti && (
            <div className="noti-dropdown">
              {notifications.length === 0 ? (
                <p className="empty">Không có thông báo</p>
              ) : (
                <>
                  {notifications.slice(0, 5).map((n) => (
                    <div className="noti-item" key={n.id}>
                      <strong>{n.message}</strong>
                      <span>{n.time}</span>
                    </div>
                  ))}

                  {/* 🔗 LINK */}
                  <button
                    className="view-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/admin/notifications");
                    }}
                  >
                    Xem tất cả thông báo →
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* 👤 AVATAR */}
        <div className="avatar" ref={dropdownRef}>
          <img
            src={currentUser?.avatar || "/image/admin.jpg"}
            alt="avatar"
            className="avatar-img"
            onClick={() => setShowDropdown(!showDropdown)}
          />

          {showDropdown && (
            <div className="dropdown">
              <div className="dropdown-header">
                <strong>{currentUser?.username}</strong>
                <span>Administrator</span>
              </div>

              <button
                className="dropdown-item"
                onClick={() => navigate("/admin/profile")}
              >
                <FiUser /> Hồ sơ
              </button>

              <button
                className="dropdown-item logout"
                onClick={handleLogout}
              >
                <RxExit /> Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
