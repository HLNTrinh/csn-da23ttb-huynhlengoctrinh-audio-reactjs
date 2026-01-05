import { useNavigate } from "react-router-dom";
import "./topbar1.css";
import SearchDropDowm from "./User/SearchFull";

export default function Topbar() {
  const navigate = useNavigate();

  return (
    <div className="topbar-container">
      <div className="topbar">
        <SearchDropDowm />

        <div className="buttons">
          <button
            className="login1-btn"
            onClick={() => navigate("/login")}
          >
            Đăng nhập
          </button>

          <button
            className="register-btn"
            onClick={() => navigate("/register")}
          >
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
}
