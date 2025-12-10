import "./hometopic.css";
import { useState,seRef } from "react";

export default function Topics() {
  const topics = [
    {
      name: "Gen Z hits ",
      img: "public/image/1.png",
     songs: [
        { title: "ĐOẠN KỊCH CÂM", img: "public/topic/1.jpg",artist: 'ANH TRAI "SAY HI"' },
        {title:"GÃ SĂN CÁ", img: "public/topic/4.jpg",artist: 'EM XINH "SAY HI"'},
        {img: "https://image-cdn.nct.vn/song/2017/09/12/b/f/0/6/1505189629603_300.jpg", title: "Fly Away", artist: "TheFatRat,Anjulie"},
        {img: "/image/5.jpg", title: "Sài Gòn Đau Lòng Quá", artist: "Hứa Kim Tuyền, Hoàng Duyên",audio:"/music/Sài Gòn Đau Lòng Quá.mp3"}

      ]
    },
     {
      name: "TikTok",
      img: "public/image/2.png",
      songs: [
       {title:"GÃ SĂN CÁ", img: "public/topic/4.jpg"},
      {img: "https://image-cdn.nct.vn/song/2024/03/15/4/c/b/d/1710485895535_300.jpg", title: "You Are Everywhere・2024", artist: "Young Captain",}
    ]
    },
    {
      name: "K-Pop",
      img: "public/image/KP.png",
      songs: [ 
         {title:"Pink Venom", img: "https://image-cdn.nct.vn/song/2022/09/16/0/2/1/c/1663315456776_300.jpg",artist: "BLACKPINK"} ]
    },
    {
      name: "Today's V-Hits",
      img: "public/image/TD.png",
      songs: [ {title:"Em", img: "public/convers/4.jpg"}]
    },
   
    {
      name: "Viet-Indie",
      img: "https://image-cdn.nct.vn/radio/2025/10/17/o/B/g/n/1760692263311_300.png",
      songs: [{title:"BÍ MẬT NHỎ", img: "https://image-cdn.nct.vn/song/2025/12/01/4/9/s/9/1764562044103_300.jpg"}]
    },
    {
      name: "Pop",
      img: "public/image/CPop.png",
      songs: [{title:"画圈",img: "https://image-cdn.nct.vn/song/2025/11/26/t/T/S/X/1764125550570_300.jpg"}]
    },
    {
      name: "HIP-HOP/R&B",
      img: "https://image-cdn.nct.vn/radio/2025/10/17/8/o/x/b/1760692464434_300.png",
      songs: [{title:"Like Jennie",img:"https://image-cdn.nct.vn/song/2025/03/06/3/e/9/4/1741227899502_300.jpg"}]
    },
    {
      name: "Chill Out",
      img: "public/image/chillout.png",
      songs: [{img: "https://image-cdn.nct.vn/song/2025/11/25/1/b/e/5/1764049685571_300.jpg", title: "Anh Sẽ Quên Được Em"}]
    },
    {
      name: "Pop Ballad",
      img: "public/image/baladpng.png",
      songs: [{img: "https://image-cdn.nct.vn/song/2024/03/15/4/c/b/d/1710485895535_300.jpg", title: "You Are Everywhere・2024"}]
    },
   
    {
      name: "V-Pop",
      img: "public/image/vpop.png",
      songs: [{ img: "https://image-cdn.nct.vn/song/2025/12/01/4/9/s/9/1764562044103_300.jpg", title: "VẠN LÝ ĐỘC HÀNH"},
        {img: "https://image-cdn.nct.vn/song/2025/11/21/C/Y/j/k/1763719323352_300.jpg", title: "QUAN TRỌNG KHÔNG?", artist: "choi",audio:"/music/QUAN TRỌNG KHÔNG_.mp3",}
      ]
    },
    {
      name: "Sad",
      img: "public/image/sad.png",
      songs: ["昨夜风今宵月", "跳楼机"]
    },
    {
      name: "C-Pop",
      img: "public/image/cpop1.png",
      songs: [{img: "https://image-cdn.nct.vn/song/2020/06/05/4/f/d/2/1591338842259_300.jpg", title: "Still With You",}]
    }
  ];

  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Chọn bài ngẫu nhiên
  const playRandomSong = (topic) => {
    const randomIndex = Math.floor(Math.random() * topic.songs.length);
    setCurrentTopic(topic);
    setCurrentIndex(randomIndex);
  };

  // Lấy bài hiện tại
  const currentSong =
    currentTopic?.songs[currentIndex];

  // PREV
  const prevSong = () => {
    if (!currentTopic) return;
    setCurrentIndex((prev) =>
      prev === 0 ? currentTopic.songs.length - 1 : prev - 1
    );
  };
  const nextSong = () => {
    if (!currentTopic) return;
    setCurrentIndex((prev) =>
      prev === currentTopic.songs.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="topics-container">
      <div className="topics-grid">
        {topics.map((t, i) => (
          <div
            key={i}
            className="topic-card"
            onClick={() => playRandomSong(t)}
          >
            <img src={t.img} className="topic-image" alt={t.name} />
            <p className="topic-name">{t.name}</p>
           
          </div>
        ))}
      </div>
      {/* PLAYER */}
      {currentSong && (
        <div className="now-playing1-bar">
          <div className="now-playing1-left">
            <img
            src={currentSong.img}
            className="song-image"
            alt={currentSong.title}
            />
          <div> 
            <p className="now-playing1-title">{currentSong.title}</p>
            <p className="now-playing1-artist">{currentSong.artist}</p>
            </div>
            </div>
          <audio
            src={`/music/${currentSong.title}.mp3`}
            autoPlay
            controls
            className="fixed-audio"
            onEnded={nextSong} 
          />
           </div>
             
      )}
    </div>
  );
}
