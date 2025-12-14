import "./hometopic.css";
import { useState } from "react";
import MiniPlayer from "/Users/huynh/music-app/src/components/User/MiniPlayer"; // import MiniPlayer

export default function Topics() {
  const topics = [
    {
      name: "Gen Z hits",
      img: "public/image/1.png",
      songs: [
        { title: "ĐOẠN KỊCH CÂM", img: "public/topic/1.jpg", artist: 'ANH TRAI "SAY HI"', audio: "/music/ĐOẠN KỊCH CÂM.mp3" },
        { title: "GÃ SĂN CÁ", img: "public/topic/4.jpg", artist: 'EM XINH "SAY HI"', audio: "/music/GÃ SĂN CÁ.mp3"  },
        { img: "https://image-cdn.nct.vn/song/2017/09/12/b/f/0/6/1505189629603_300.jpg", title: "Fly Away", artist: "TheFatRat, Anjulie", audio:"/music/Fly Away.mp3" },
        { img: "/image/5.jpg", title: "Sài Gòn Đau Lòng Quá", artist: "Hứa Kim Tuyền, Hoàng Duyên", audio: "/music/Sài Gòn Đau Lòng Quá.mp3" }
      ]
    },
    {
      name: "TikTok",
      img: "public/image/2.png",
      songs: [
        { title: "GÃ SĂN CÁ", img: "public/topic/4.jpg",artist: 'EM XINH "SAY HI"', audio: "/music/GÃ SĂN CÁ.mp3" },
        { img: "https://image-cdn.nct.vn/song/2017/08/07/c/b/1/e/1502075660969_300.jpg", title: "Havana", artist: "Camila Cabello,Young Thug",audio:"/music/Havana.mp3" },

        { img: "https://image-cdn.nct.vn/song/2024/03/15/4/c/b/d/1710485895535_300.jpg", title: "You Are Everywhere・2024", artist: "Young Captain" }
      ]
    },
    { name: "K-Pop",
      img: "public/image/KP.png",
      songs: [
      { title: "Pink Venom", img: "https://image-cdn.nct.vn/song/2022/09/16/0/2/1/c/1663315456776_300.jpg", artist: "BLACKPINK" ,audio:"/music/Pink Venom.mp3"},
      { img: "https://image-cdn.nct.vn/song/2024/10/18/1/8/a/e/1729211353297_300.jpg", title: "APT.", artist: "BLACKPINK",audio:"/music/APT..mp3"},
      { title: "Like Jennie", img: "https://image-cdn.nct.vn/song/2025/03/06/3/e/9/4/1741227899502_300.jpg", artist: " Jennie",audio:"/music/Like Jennie.mp3" },
    ] },
    { name: "Today's V-Hits",
     img: "public/image/TD.png", songs: [
    { title: "See Tình",
    artist: "Hoàng Thuỳ Linh",
    img: "https://image-cdn.nct.vn/song/2022/02/20/f/c/1/9/1645341331047_300.jpg",
    audio: "/music/See Tình.mp3"},
    {  img: "https://image-cdn.nct.vn/song/2025/10/13/y/F/l/W/1760365417721_300.jpg", title: "Qua Vài Câu Chuyện Tình", artist: "GiGi Hương Giang",
      audio:"/music/Qua Vài Câu Chuyện Tình.mp3"},
    ] }, 
{ name: "Viet-Indie",
   img: "https://image-cdn.nct.vn/radio/2025/10/17/o/B/g/n/1760692263311_300.png",
   songs: [
    { title: "BÍ MẬT NHỎ", img: "https://image-cdn.nct.vn/song/2025/12/01/4/9/s/9/1764562044103_300.jpg",audio:"/music/BÍ MẬT NHỎ.mp3" },
    { img: "https://image-cdn.nct.vn/song/2025/11/24/g/I/I/y/1763980894698_300.jpg", title: "NOT CUTE ANYMORE",artist: "ILLIT",
      audio:"/music/NOT CUTE ANYMORE.mp3"},
  ] },

    { name: "Pop", img: "public/image/CPop.png",
   songs: [
    { title: "画圈", img: "https://image-cdn.nct.vn/song/2025/11/26/t/T/S/X/1764125550570_300.jpg",artist: "EN",
  audio:"/music/画圈.mp3" },
  { img: "https://image-cdn.nct.vn/song/2025/11/24/x/s/k/Q/1763957213536_300.jpg", title: "BOUNCE",artist: 'ANH TRAI "SAY HI"',
      audio:"/music/BOUNCE.mp3",}
    ] },
 { name: "HIP-HOP/R&B", img: "https://image-cdn.nct.vn/radio/2025/10/17/8/o/x/b/1760692464434_300.png",
   songs: [
  { title: "Like Jennie", img: "https://image-cdn.nct.vn/song/2025/03/06/3/e/9/4/1741227899502_300.jpg", artist: " Jennie",audio:"/music/Like Jennie.mp3" },
{ img: "https://image-cdn.nct.vn/song/2024/10/18/1/8/a/e/1729211353297_300.jpg", title: "APT.", artist: "ROSÉ,Bruno Mars",audio:"/music/APT..mp3",},] }, 
{ name: "Chill Out", img: "public/image/chillout.png",
   songs:
    [{ img: "https://image-cdn.nct.vn/song/2025/11/25/1/b/e/5/1764049685571_300.jpg", title: "Anh Sẽ Quên Được Em", audio:"/music/Anh Sẽ Quên Được Em.mp3", 
    },
    {img: "https://image-cdn.nct.vn/song/2025/12/01/4/9/s/9/1764562044103_300.jpg", title: "ĐƯỜNG CHÂN TRỜI", artist: 'ANH TRAI "SAY HI",buitruonglinh',
      audio:"/music/ĐƯỜNG CHÂN TRỜI.mp3",}
  ] }, 
{ name: "Pop Ballad", img: "public/image/baladpng.png", 
  songs: [
    { img: "https://image-cdn.nct.vn/song/2025/11/24/g/I/I/y/1763980894698_300.jpg", title: "NOT CUTE ANYMORE",artist: "ILLIT",
      audio:"/music/NOT CUTE ANYMORE.mp3",},
    {img: "https://image-cdn.nct.vn/song/2025/11/28/m/Z/m/l/1764309023569_300.jpg", 
      title: "The Fate of Ophelia",
      artist: "Taylor Swift, The Chainsmokers", audio:"/music/The Fate of Ophelia.mp3"},
  ] },
 { name: "V-Pop", img: "public/image/vpop.png",
   songs: [ { img: "https://image-cdn.nct.vn/song/2025/12/01/4/9/s/9/1764562044103_300.jpg", title: "VẠN LÝ ĐỘC HÀNH",artist: 'ANH TRAI "SAY HI",Karik',
      audio:"/music/VẠN LÝ ĐỘC HÀNH.mp3", },
    { img: "https://image-cdn.nct.vn/song/2025/11/21/C/Y/j/k/1763719323352_300.jpg", title: "QUAN TRỌNG KHÔNG?", artist: "choi", audio: "/music/QUAN TRỌNG KHÔNG_.mp3" },
  {img: "https://image-cdn.nct.vn/song/2025/12/01/4/9/s/9/1764562044103_300.jpg", title: "ĐƯỜNG CHÂN TRỜI", artist: 'ANH TRAI "SAY HI",buitruonglinh',
      audio:"/music/ĐƯỜNG CHÂN TRỜI.mp3",}, ] },
 { name: "Sad", img: "public/image/sad.png", songs: [
 { img: "https://image-cdn.nct.vn/song/2025/11/25/1/b/e/5/1764049685571_300.jpg", title: "Anh Sẽ Quên Được Em", artist: "QuocKiet,Hayho",
      audio:"/music/Anh Sẽ Quên Được Em.mp3"},
      { img: "https://image-cdn.nct.vn/song/2020/06/05/4/f/d/2/1591338842259_300.jpg", title: "Still With You", artist: "Jung Kook (BTS)",audio:"/music/Still With You.mp3"},
    ] }, 
 { name: "C-Pop", img: "public/image/cpop1.png", 
  songs: [
  { title: "画圈", img: "https://image-cdn.nct.vn/song/2025/11/26/t/T/S/X/1764125550570_300.jpg",artist: "EN",
  audio:"/music/画圈.mp3" },
  { img: "https://image-cdn.nct.vn/song/2024/10/26/3/0/d/3/1729941033115_300.jpg", title: "Trang Giấy Cuối Cùng / 最后一页", artist: "EN",audio:"/music/Trang Giấy Cuối Cùng _ 最后一页.mp3"},
] }

  ];

  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Chọn bài ngẫu nhiên
  const playRandomSong = (topic) => {
    if (!topic.songs || topic.songs.length === 0) return;
    const randomIndex = Math.floor(Math.random() * topic.songs.length);
    setCurrentTopic(topic);
    setCurrentIndex(randomIndex);
  };

  // Chọn bài ngẫu nhiên trong topic hiện tại
  const randomAgain = () => {
    if (!currentTopic || !currentTopic.songs) return;
    let newIndex = Math.floor(Math.random() * currentTopic.songs.length);
    // tránh trùng bài hiện tại
    if (currentTopic.songs.length > 1) {
      while (newIndex === currentIndex) {
        newIndex = Math.floor(Math.random() * currentTopic.songs.length);
      }
    }
    setCurrentIndex(newIndex);
  };

  const currentSong = currentTopic?.songs[currentIndex];

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
          <div key={i} className="topic-card" onClick={() => playRandomSong(t)}>
            <img src={t.img} className="topic-image" alt={t.name} />
            <p className="topic-name">{t.name}</p>
          </div>
        ))}
      </div>

      {/* MiniPlayer */}
      {currentSong && (
        <MiniPlayer
          song={currentSong}
          onNext={nextSong}
          onPrev={prevSong}
          onAddToLibrary={(s) => console.log("Added to library:", s)}
          onRandom={randomAgain} // truyền prop Random Again
        />
      )}
    </div>
  );
}
