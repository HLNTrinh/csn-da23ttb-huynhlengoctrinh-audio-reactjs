import "./Topics.css";
import { useState ,seRef} from "react";
import { CgMusicSpeaker } from "react-icons/cg";
import MiniPlayer from "/Users/huynh/music-app/src/components/User/MiniPlayer";
export default function Topics() {
  const topics = [
    {
      name: "Pop",
      img: "/image/pop.png",
      songs: [
        {
          title: "APT.",
          artist: "ROSÉ & Bruno Mars",
          img: "https://image-cdn.nct.vn/song/2024/10/18/1/8/a/e/1729211353297_300.jpg",
          audio: "public/music/APT..mp3",
        },
        {
          title: "You & Me",
    artist: "JENNIE",
    audio: "/music/You & Me.mp3",
    img: "https://image-cdn.nct.vn/song/2023/10/06/2/5/3/5/1696563949492_300.jpg",
        },
        {
          title: "The Fate of Ophelia",
    artist: "Taylor Swift, The Chainsmokers",
    img: "https://image-cdn.nct.vn/song/2025/11/28/m/Z/m/l/1764309023569_300.jpg",
    audio: "/music/The Fate of Ophelia.mp3",
        }
      ],
    },

    {
      name: "Bolero",
      img: "/image/bolero.png",
      songs: [
        {
          title: "Sông Quê",
          artist: "Phi Nhung",
          img: "https://image-cdn.nct.vn/song/2013/11/06/c/c/a/8/1383712945919_300.jpg",
          audio: "/music/songque.mp3",
        },
        {
          title: "Duyên Phận",
          artist: "Như Quỳnh",
          img: "https://image-cdn.nct.vn/song/2014/02/20/6/2/7/9/1392886897606_300.jpg",
          audio: "/music/duyenphan.mp3",
        },
      ],
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
      songs: [
        {
           img: "https://image-cdn.nct.vn/song/2025/11/26/t/T/S/X/1764125550570_300.jpg",
            audio: "/music/画圈.mp3",
        },
        
      ]
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
      songs: [
        { audio: "/music/Solo.mp3",
    img: "https://image-cdn.nct.vn/song/2018/11/12/7/f/3/1/1542015331222_300.jpg"},
    { audio: "/music/Solitary.mp3",
      img: "https://image-cdn.nct.vn/song/2025/11/13/j/s/U/L/1763048248352_300.jpg"},
      ]
    }
  ];

    const [currentTopic, setCurrentTopic] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const playRandomSong = (topic) => {
    const randomIndex = Math.floor(Math.random() * topic.songs.length);
    setCurrentTopic(topic);
    setCurrentIndex(randomIndex);
  };

  const currentSong = currentTopic?.songs[currentIndex];

  const prevSong = () => {
    if (!currentTopic) return;
    setCurrentIndex(prev =>
      prev === 0 ? currentTopic.songs.length - 1 : prev - 1
    );
  };

  const nextSong = () => {
    if (!currentTopic) return;
    setCurrentIndex(prev =>
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
      </div>

      {/* ✅ MiniPlayer */}
      {currentSong && (
        <MiniPlayer
          song={currentSong}
          onPrev={prevSong}
          onNext={nextSong}
          onAddToLibrary={(s) => console.log("Add to library:", s)}
        />
      )}
    </div>
  );
}
