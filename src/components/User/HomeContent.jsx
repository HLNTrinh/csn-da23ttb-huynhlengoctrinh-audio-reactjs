import "./HomeContent.css";

export default function HomeContent() {
  return (
    <div className="home-container">

      {/* SLIDER */}
      <div className="slider">
        <img src="https://i.imgur.com/UQ0Zq7U.jpeg" />
        <img src="https://i.imgur.com/6T3GKPz.jpeg" />
        <img src="https://i.imgur.com/UQ0Zq7U.jpeg" />
      </div>

      {/* DANH MỤC */}
      <div className="categories">
        {["Gen Z hits","TikTok","K-Pop","Today's V-Hits","Viet-Indie","Pop",
          "HIP-HOP/R&B","Chill Out","Pop Ballad","V-Pop","Sad","C-Pop"].map((cat,i)=>(
          <div key={i} className="cat-item">{cat}</div>
        ))}
      </div>

      {/* GỢI Ý BÀI HÁT */}
      <h3 className="title">Gợi ý bài hát</h3>
      <div className="song-grid">
        {songList.map((s,i)=>(
          <div key={i} className="song-card">
            <img src={s.img} />
            <p className="song-name">{s.name}</p>
            <p className="song-artist">{s.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const songList = [
  {
    img: "https://i.imgur.com/NGqv5Q3.jpeg",
    name: "Níu Duyên",
    artist: "Lê Bảo Bình",
  },
  {
    img: "https://i.imgur.com/4AZwZ7h.jpeg",
    name: "Phải Là Yêu",
    artist: "HIEUTHUHAI, HURRYKNG",
  },
  {
    img: "https://i.imgur.com/Y3Uhq0T.jpeg",
    name: "Pink Venom",
    artist: "BLACKPINK",
  }
];
