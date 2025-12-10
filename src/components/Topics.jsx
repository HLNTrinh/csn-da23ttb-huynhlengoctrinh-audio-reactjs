import "./Topics.css";
import { useState ,seRef} from "react";
import { CgMusicSpeaker } from "react-icons/cg";
export default function Topics() {
  const topics = [
    {
      name: "Pop",
      img: "public/image/pop.png",
      songs: [{img: "https://image-cdn.nct.vn/song/2024/10/18/1/8/a/e/1729211353297_300.jpg", title: "APT."}]
    },
    {
      name: "Bolero",
      img: "public/image/bolero.png",
      songs: [{
        img:"https://image-cdn.nct.vn/song/2013/11/06/c/c/a/8/1383712945919_300.jpg",
        title:"Sông Quê",
      }]
    },
    {
      name: "TikTok",
      img: "public/image/tiktok.png",
      songs: [{img: "https://image-cdn.nct.vn/song/2025/11/20/4/I/s/S/1763637807057_300.jpg", title: "EMGAI",}]
    },
    {
      name: "V-Rap",
      img: "public/image/vrap.png",
      songs: ["Rap Việt 1", "Rap Việt 2"]
    },
    {
      name: "C-Pop",
      img: "public/image/CPop.png",
      songs: ["Cpop Song A", "Cpop Song B"]
    },
    {
      name: "Christmas",
      img: "public/image/giangsinh.png",
      songs: ["Jingle Bells", "We Wish You"]
    },
    {
      name: "Chill Out",
      img: "public/image/chillout.png",
      songs: ["Chill 1", "Chill 2"]
    },
    {
      name: "Pop Ballad",
      img: "public/image/baladpng.png",
      songs: ["Ballad 1", "Ballad 2"]
    },
    {
      name: "Remix",
      img: "public/image/rm.png",
      color: "linear-gradient(135deg, #7f00ff, #e100ff)",
      songs: ["EDM Remix", "Bass House"]
    },
    {
      name: "V-Pop",
      img: "public/image/vpop.png",
      songs: ["Vpop Hit 1", "Vpop Hit 2"]
    },
    {
      name: "Sad",
      img: "public/image/sad.png",
      songs: ["Sad Song 1", "Sad Song 2"]
    },
    {
      name: "K-Pop",
      img: "public/image/kpop.png",
      songs: ["Blackpink", "BTS"]
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
    <div>
     <div className="topics-container">
          <h2 className="topics-title">Các chủ đề</h2>
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
    </div>
  );
}
