import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import "./auth.css";
import { initAdmin } from "./initAdmin";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // 🔥 tạo admin mặc định + load email đã nhớ
  useEffect(() => {
    initAdmin();

    const rememberedEmail = localStorage.getItem("rememberEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRemember(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === email);

    if (!user || user.password !== password) {
      alert("Sai email hoặc mật khẩu");
      return;
    }

    if (user.blocked) {
      alert("Tài khoản đã bị khóa");
      return;
    }

    // ✅ ghi nhớ email
    if (remember) {
      localStorage.setItem("rememberEmail", email);
    } else {
      localStorage.removeItem("rememberEmail");
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    // 🔥 phân quyền
    navigate(user.role === "admin" ? "/admin" : "/user");
  };

 return (
  <div className="login-page">
    <div className="login-card">
      <h2 className="login-title">ĐĂNG NHẬP</h2>

      <form onSubmit={handleLogin}>
        {/* EMAIL */}
        <div className="input-group">
          <FiMail className="input-icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="input-group">
          <FiLock className="input-icon" />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* REMEMBER */}
        <label className="remember">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Ghi nhớ tài khoản
        </label>

        <button className="login-btn">LOGIN</button>
      </form>

      <p className="signup">
        Bạn chưa có tài khoản?{" "}
        <span onClick={() => navigate("/register")}>
          Đăng ký
        </span>
      </p>
    </div>
  </div>
);
}