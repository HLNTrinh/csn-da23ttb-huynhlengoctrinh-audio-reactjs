import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import "./auth.css";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u) => u.email === email)) {
      alert("Email đã tồn tại!");
      return;
    }

    const newUser = {
      id: Date.now(),
      email,
      password,
      username: email.split("@")[0],
      role: "user",      // 🔥 MẶC ĐỊNH USER
      blocked: false,
      avatar: "/image/user.jpg",
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công!");
    navigate("/login");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">ĐĂNG KÝ</h2>

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <FiMail  className="input-icon"/>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FiLock className="input-icon"/>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="login-btn">REGISTER</button>
          <p className="signup">
  Bạn đã có tài khoản?{" "}
  <span
    className="signup-link"
    onClick={() => navigate("/login")}
  >
    Đăng nhập
  </span>
</p>

        </form>
      </div>
    </div>
  );
}
