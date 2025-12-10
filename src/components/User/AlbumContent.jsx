import { useState } from "react";
import "./albums.css";

export default function Albums() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="albums-page">
      <div className="album-header">
        <h2>Album</h2>

        <select
          className="filter-btn"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Tất cả</option>
          <option value="pop">Pop</option>
          <option value="rap">Rap</option>
          <option value="usuk">US-UK</option>
          <option value="vpop">V-POP</option>
        </select>
      </div>

      <div className="album-list">
        <p>Hiển thị danh sách album theo: {filter}</p>
      </div>
    </div>
  );
}
