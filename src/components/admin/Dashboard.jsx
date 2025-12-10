import StatCard from "./StatCard";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="card-grid">
        <StatCard color="#ffc107" title="Bài Hát Xem Nhiều Nhất" value="500" />
        <StatCard color="#00b4ff" title="Top 10 bài có lược xem cao nhất" value="600" />
        <StatCard color="#1ac44d" title="Các tài khoản đăng nhập nhiều nhất" value="12" />
        <StatCard color="#ff5733" title="Lượt " value="58" />
      </div>

      <div className="stats-box">
        <h2 className="box-title">THỐNG KÊ CHI PHÍ</h2>

        <div className="stats-content">
          <div className="chart-placeholder">Biểu đồ</div>

          <table className="cost-table">
            <thead>
              <tr>
                <th>Loại</th>
                <th>Tổng cộng</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Tổng tiền nạp</td>
                <td>11.068.000 ₫</td>
              </tr>
              <tr>
                <td>Admin cộng</td>
                <td>1.712.000 ₫</td>
              </tr>
              <tr>
                <td>Tạo dịch vụ</td>
                <td>5.280.000 ₫</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
