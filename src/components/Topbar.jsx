import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import "./topbar1.css";
import SearchDropDowm from "./User/SearchFull";

export default function Topbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [search, setSearch] = useState("");

  // 👉 Tạo tài khoản admin mặc định chỉ 1 lần
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (!users["admin@gmail.com"]) {
      users["admin@gmail.com"] = { password: "admin123", role: "admin" };
      localStorage.setItem("users", JSON.stringify(users));
      console.log("Admin mặc định đã được tạo!");
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    const user = users[loginEmail];

    if (user && user.password === loginPassword) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ email: loginEmail, role: user.role })
      );

      if (user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/user";
      }
    } else {
      alert("Email hoặc mật khẩu không đúng!");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[regEmail]) {
      alert("Email đã tồn tại!");
      return;
    }

    users[regEmail] = { password: regPassword, role: "user" };
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công!");
    window.location.href = "/";
  };

  return (
    <div className="topbar-container">
      <div className="topbar">
        <SearchDropDowm />
        <div className="buttons">
          <button
            className="login-btn"
            onClick={() => {
              setShowLogin(!showLogin);
              setShowRegister(false);
            }}
          >
            Đăng nhập
          </button>

          <button
            className="register-btn"
            onClick={() => {
              setShowRegister(!showRegister);
              setShowLogin(false);
            }}
          >
            Đăng ký
          </button>
        </div>
      </div>

      {/* Form đăng nhập */}
      {showLogin && (
        <div className="form-popup">
          <h2>Đăng nhập</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Mật khẩu"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />

            <button type="submit">Đăng nhập</button>
            <button
              type="button"
              className="close-btn"
              onClick={() => setShowLogin(false)}
            >
              Hủy
            </button>
          </form>
        </div>
      )}

      {/* Form đăng ký */}
      {showRegister && (
        <div className="form-popup">
          <h2>Đăng ký</h2>
          <form onSubmit={handleRegister}>
            <input
              type="email"
              placeholder="Email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Mật khẩu"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              required
            />

            <button type="submit">Đăng ký</button>

            <button
              type="button"
              className="close-btn"
              onClick={() => setShowRegister(false)}
            >
              Hủy
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
