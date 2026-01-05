import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserNavbar.css";
import SearchDropDowm1 from "./SearchFull";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const getNotifyKey = (user) =>
  user ? `notifications_${user.id || user.username}` : null;

export default function UserNavbar() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const notifyKey = getNotifyKey(currentUser);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const dropdownRef = useRef(null);
  const notifyRef = useRef(null);

  /* ================== SYNC NOTIFICATION REALTIME ================== */
  useEffect(() => {
    if (!notifyKey) return;

    const syncNotifications = () => {
      const data = JSON.parse(
        localStorage.getItem(notifyKey) || "[]"
      );
      setNotifications(data);
    };

    syncNotifications(); // load lần đầu

    window.addEventListener("notificationUpdated", syncNotifications);
    return () =>
      window.removeEventListener("notificationUpdated", syncNotifications);
  }, [notifyKey]);

  /* ================== CLICK OUTSIDE ================== */
  useEffect(() => {
    const clickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        notifyRef.current &&
        !notifyRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
        setShowNotify(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const clearNotifications = () => {
    if (!notifyKey) return;
    localStorage.removeItem(notifyKey);
    setNotifications([]);
    window.dispatchEvent(new Event("notificationUpdated"));
  };

  return (
    <div className="user-navbar">
      {/* NAV */}
      <div className="nav-history">
        <button className="nav-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <button className="nav-btn" onClick={() => navigate(1)}>
          <FaArrowRight />
        </button>
      </div>

      {/* SEARCH */}
      <div className="search-box">
        <SearchDropDowm1 />
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        {/* 🔔 NOTIFICATION */}
        <div className="notify-wrapper" ref={notifyRef}>
          <span
            className="bell"
            onClick={() => setShowNotify(!showNotify)}
          >
            🔔
            {notifications.length > 0 && (
              <span className="badge">{notifications.length}</span>
            )}
          </span>

          {showNotify && (
            <div className="notify-dropdown">
              <h4>Thông báo</h4>

              {notifications.length === 0 ? (
                <p className="empty">Không có thông báo</p>
              ) : (
                notifications.map((n) => (
                  <div key={n.id} className="notify-item">
                    <p>{n.text}</p>
                    <span>{n.time}</span>
                  </div>
                ))
              )}

              {notifications.length > 0 && (
                <button className="clear-btn" onClick={clearNotifications}>
                  Xóa tất cả
                </button>
              )}
            </div>
          )}
        </div>

        {/* AVATAR */}
        <div className="avatar" ref={dropdownRef}>
          <img
            src={currentUser?.avatar || "/image/user.jpg"}
            alt="avatar"
            className="avatar-img"
            onClick={() => setShowDropdown(!showDropdown)}
          />

          {showDropdown && (
            <div className="dropdown-menu">
              <button className="dropdown-item">Tài khoản</button>
              <button className="dropdown-item">Cài đặt</button>
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
