import PlaylistItem from "./PlaylistItem";
import "./playlistItem.css";

export default function PlaylistGrid({ onSelect }) {
  const playlists = [
    {
      image: "/image/today1.webp",
      title: "Nhạc Chill triệu view hot TikTok",
      desc: "ANH TRAI SAY HI, Hustlang Robber...",
    },
    {
      image: "/image/today2.webp",
      title: "Từ TikTok qua đây...",
      desc: "Dương Domic, Lưu Hoàng...",
    },
    {
      image: "/image/today3.webp",
      title: "Hồi Ức 8x 9x",
      desc: "Đan Trường, Mỹ Tâm...",
    },
    {
      image: "/image/today4.webp",
      title: "Lofi Chill Cho Ngày Mưa",
      desc: "Nguyễn Thành Đạt...",
    },
    {
      image: "/image/today5.webp",
      title: "Những bản Ballad buồn",
      desc: "Star Online....",
    }
  ];

  return (
    <div className="playlist-grid">
      {playlists.map((p, index) => (
        <PlaylistItem
          key={index}
          image={p.image}
          title={p.title}
          desc={p.desc}
          onClick={() => onSelect(p)}
        />
      ))}
    </div>
  );
}
