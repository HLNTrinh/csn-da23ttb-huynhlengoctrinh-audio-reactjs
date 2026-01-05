import {
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend
} from "recharts";
import "./Dashboard.css";
import { MdPeople, MdShowChart } from "react-icons/md";
import { CiUser } from "react-icons/ci";

/* ================= DATA ================= */

// 1. Top 10 bài hát nhiều lượt xem nhất
const topSongs = [
  { name: "Có Em", view: 13451 },
  { name: "See Tình", view: 11839 },
  { name: "Waiting For You", view: 10463 },
  { name: "Em Của Ngày Hôm Qua", view: 10338 },
  { name: "Hơn Cả Yêu", view: 8692 },
  { name: "Chúng Ta Của Hiện Tại", view: 6396 },
  { name: "Sóng Gió", view: 6045 },
  { name: "Lạc Trôi", view: 5567 },
  { name: "Nàng Thơ", view: 5094 },
  { name: "Muộn Rồi Mà Sao Còn", view: 5058 },
];

// 👉 RÚT GỌN TÊN (PHẢI ĐẶT SAU topSongs)
const shortTopSongs = topSongs.map((song) => ({
  ...song,
  shortName:
    song.name.length > 12
      ? song.name.slice(0, 12) + "…"
      : song.name,
}));

// 2. Top user truy cập nhiều nhất
const topUsers = [
  { name: "flora", view: 5600 },
  { name: "admin01", view: 5200 },
  { name: "user123", view: 4800 },
  { name: "musicfan", view: 4500 },
  { name: "vip_user", view: 4100 },
];

// 3. Top chủ đề có lượt xem cao nhất
const topTopicsView = [
  { name: "V-Pop", value: 42000 },
  { name: "K-Pop", value: 28000 },
  { name: "US-UK", value: 21000 },
  { name: "EDM", value: 16000 },
];

// 4. Số lượng bài hát theo chủ đề
const songCountByTopic = [
  { name: "V-Pop", count: 320 },
  { name: "K-Pop", count: 210 },
  { name: "US-UK", count: 180 },
  { name: "EDM", count: 120 },
];

const COLORS = ["#6fe7e7", "#42b9d6", "#2f86b7", "#ff7a18"];


export default function Dashboard() {
  return (
    <div className="dashboard">

      {/* ================= CARDS ================= */}
      <div className="card-grid small">
        <div className="card cyan">
          <MdPeople />
          <p>8740</p>
          <span>Lượt xem</span>
        </div>

        <div className="card indigo">
          <MdShowChart />
          <p>150</p>
          <span>Bài hát</span>
        </div>

        <div className="card green">
          <CiUser />
          <p>13</p>
          <span>Chủ đề</span>
        </div>

        <div className="card pink">
          <MdPeople />
          <p>10</p>
          <span>Tài khoản</span>
        </div>
      </div>

      {/* ================= BIỂU ĐỒ ================= */}
      <div className="chart-grid two">

        {/* 1. Top 10 bài hát */}
        <div className="chart-box small">
          <h4>Top 10 bài hát có lượt xem cao nhất</h4>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              layout="vertical"
              data={shortTopSongs}
              margin={{ left: 100 }}
            >
              <XAxis type="number" />

              <YAxis
                type="category"
                dataKey="shortName"
                tick={{ fontSize: 12 }}
              />

              <Tooltip
                formatter={(value) => value.toLocaleString()}
                labelFormatter={(label, payload) =>
                  payload?.[0]?.payload?.name
                }
              />

              <Bar dataKey="view" fill="#6fe7e7" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 2. Top người dùng */}
        <div className="chart-box small">
          <h4>Top 5 người dùng truy cập nhiều nhất</h4>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topUsers}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="view" fill="#42b9d6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 3. Top chủ đề theo lượt xem */}
        <div className="chart-box small">
          <h4>Top chủ đề có lượt xem cao nhất</h4>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={topTopicsView}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                label
              >
                {topTopicsView.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 4. Số lượng bài hát theo chủ đề */}
        <div className="chart-box small">
          <h4>Số lượng bài hát theo từng chủ đề</h4>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={songCountByTopic}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#ff7a18" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
