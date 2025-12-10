import "./StatCard.css";

export default function StatCard({ color, title, value }) {
  return (
    <div className="stat-card" style={{ backgroundColor: color }}>
      <div className="stat-value">{value}</div>
      <div className="stat-title">{title}</div>
      <button className="stat-btn">Chi tiết</button>
    </div>
  );
}
