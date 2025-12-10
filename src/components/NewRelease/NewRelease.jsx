import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./newrelease.css";

export default function NewRelease() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("all");
  const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef();

  // === Danh sách bài hát, mỗi bài cần có id ===
  const songsAll = [
    { 
      id: "song-1",
      label:"UNIVERSAL MUSIC GROUP",
      img: "https://image-cdn.nct.vn/song/2025/11/28/m/Z/m/l/1764309023569_300.jpg", 
      title: "The Fate of Ophelia",
      artist: "Taylor Swift, The Chainsmokers",
      labelImg: "https://image-cdn.nct.vn/provider/2020/02/06/7/c/c/b/1580970856708.jpg",
      audio:"/music/The Fate of Ophelia.mp3"
    },
    { 
      id: "song-2",
      img: "https://image-cdn.nct.vn/song/2025/10/11/q/M/D/Q/1760122306996_300.jpg", 
      title: "Panorama",
      artist: "Richie D. ICY, Obito",
      label:"WARNER RECORDED MUSIC",
      labelImg: "https://image-cdn.nct.vn/provider/2020/11/12/e/2/a/c/1605147272711.jpg",
      audio:"/music/Panorama.mp3"
    },
     {id: "song-3",
       img: "https://image-cdn.nct.vn/song/2025/11/26/t/T/S/X/1764125550570_300.jpg", title: "画圈", artist: "EN",
      audio:"/music/画圈.mp3",
      label:"UNIVERSAL MUSIC GROUP",
      labelImg: "https://image-cdn.nct.vn/provider/2020/02/06/7/c/c/b/1580970856708.jpg",
    },
    { id: "song-4",
      img: "https://image-cdn.nct.vn/song/2025/11/24/x/s/k/Q/1763957213536_300.jpg", title: "BOUNCE",artist: 'ANH TRAI "SAY HI"',
      audio:"/music/BOUNCE.mp3",
      label:"UNIVERSAL MUSIC GROUP",
      labelImg: "https://image-cdn.nct.vn/provider/2020/02/06/7/c/c/b/1580970856708.jpg",
    },
  {  id: "song-5",
    img: "https://image-cdn.nct.vn/song/2025/11/24/g/I/I/y/1763980894698_300.jpg", title: "NOT CUTE ANYMORE",artist: "ILLIT",
      audio:"/music/NOT CUTE ANYMORE.mp3",
      label:"INGROOVES MUSIC GROUP",
      labelImg:"https://image-cdn.nct.vn/provider/2023/07/06/4/f/c/4/1688614662954.jpg",
    },
    {  id: "song-6",
      img: "https://image-cdn.nct.vn/song/2017/08/07/c/b/1/e/1502075660969_300.jpg", title: "Havana", artist: "Camila Cabello,Young Thug",audio:"/music/Havana.mp3",
       label:"SONY MUSIC",
      labelImg:"https://image-cdn.nct.vn/provider/2020/02/13/8/d/9/4/1581563932392.jpg",
    },

    { id: "song-7",
       img: "https://image-cdn.nct.vn/song/2024/10/18/1/8/a/e/1729211353297_300.jpg", title: "APT.", artist: "BLACKPINK",audio:"/music/APT..mp3",
      label:"WARNER RECORDED MUSIC",
      labelImg: "https://image-cdn.nct.vn/provider/2020/11/12/e/2/a/c/1605147272711.jpg",
     },
      {  id: "song-8",
         title: "ĐOẠN KỊCH CÂM", img: "public/topic/1.jpg",artist: 'ANH TRAI "SAY HI"' ,
       audio:"/music/ĐOẠN KỊCH CÂM.mp3",
        label:"UNIVERSAL MUSIC GROUP",
      labelImg: "https://image-cdn.nct.vn/provider/2020/02/06/7/c/c/b/1580970856708.jpg",
    },
    {  id: "song-9",
      img: "https://image-cdn.nct.vn/song/2025/11/25/1/b/e/5/1764049685571_300.jpg", title: "Anh Sẽ Quên Được Em", artist: "QuocKiet,Hayho",
      audio:"/music/Anh Sẽ Quên Được Em.mp3",
        label:"LOOPS MUSIC",
      labelImg: "https://image-cdn.nct.vn/provider/2022/06/01/3/d/d/9/1654052613310.jpg",
    },
    // Thêm các bài khác theo cấu trúc tương tự, nhớ mỗi bài có id
  ];

  const songsVN = [
    { 
      id: "song-8",
      title: "ĐOẠN KỊCH CÂM",
      img: "public/topic/1.jpg",
      artist: 'ANH TRAI "SAY HI"',
      label:"UNIVERSAL MUSIC GROUP",
      labelImg: "https://image-cdn.nct.vn/provider/2020/02/06/7/c/c/b/1580970856708.jpg",
      audio:"/music/ĐOẠN KỊCH CÂM.mp3"
    },
    {id: "vn-2",
       img: "https://image-cdn.nct.vn/song/2025/11/27/k/9/c/z/1764216695483_300.jpg", title: "Bỏ Mặc Anh", artist: "Tez,Mason Nguyen",
       audio:"/music/Bỏ Mặc Anh.mp3",
        label:"UNIVERSAL MUSIC GROUP",
      labelImg: "https://image-cdn.nct.vn/provider/2020/02/06/7/c/c/b/1580970856708.jpg",
    },
    { id: "vn-3",
      img: "https://image-cdn.nct.vn/song/2025/10/13/y/F/l/W/1760365417721_300.jpg", title: "Qua Vài Câu Chuyện Tình", artist: "GiGi Hương Giang",
      audio:"/music/Qua Vài Câu Chuyện Tình.mp3",
      label:"UNIVERSAL MUSIC GROUP",
      labelImg: "https://image-cdn.nct.vn/provider/2020/02/06/7/c/c/b/1580970856708.jpg",
    },
    {id: "vn-4",
       img: "https://image-cdn.nct.vn/song/2025/11/20/4/I/s/S/1763637807057_300.jpg", title: "EMGAI", artist: "DI RUMINH",
      label:"The Orchard",
      labelImg: "https://image-cdn.nct.vn/provider/2025/05/30/4/e/4/6/1748601994193.jpg",
    },
    {id: "song-9",
       img: "https://image-cdn.nct.vn/song/2025/11/25/1/b/e/5/1764049685571_300.jpg", title: "Anh Sẽ Quên Được Em", artist: "QuocKiet,Hayho",
      audio:"/music/Anh Sẽ Quên Được Em.mp3",
      label:"LOOPS MUSIC",
      labelImg: "https://image-cdn.nct.vn/provider/2022/06/01/3/d/d/9/1654052613310.jpg",
    },
    { id: "vn-6",
      img: "https://image-cdn.nct.vn/song/2025/12/01/4/9/s/9/1764562044103_300.jpg", title: "BÍ MẬT NHỎ", artist: 'ANH TRAI "SAY HI",Mason Nguyen',
      audio:"/music/BÍ MẬT NHỎ.mp3",
      label:"UNIVERSAL MUSIC GROUP",
      labelImg: "https://image-cdn.nct.vn/provider/2020/02/06/7/c/c/b/1580970856708.jpg",
    },
    { id: "vn-7",
      img: "https://image-cdn.nct.vn/song/2025/12/01/4/9/s/9/1764562044103_300.jpg", title: "ĐƯỜNG CHÂN TRỜI", artist: 'ANH TRAI "SAY HI",buitruonglinh',
      audio:"/music/ĐƯỜNG CHÂN TRỜI.mp3",
      label:"UNIVERSAL MUSIC GROUP",
      labelImg: "https://image-cdn.nct.vn/provider/2020/02/06/7/c/c/b/1580970856708.jpg",
    },
    { id: "vn-8",
      img: "https://image-cdn.nct.vn/song/2025/12/01/4/9/s/9/1764562044103_300.jpg", title: "VẠN LÝ ĐỘC HÀNH", artist: 'ANH TRAI "SAY HI",Karik',
      audio:"/music/VẠN LÝ ĐỘC HÀNH.mp3",
      label:"UNIVERSAL MUSIC GROUP",
      labelImg: "https://image-cdn.nct.vn/provider/2020/02/06/7/c/c/b/1580970856708.jpg",
    },
    { id: "vn-9",
      img: "https://image-cdn.nct.vn/song/2025/10/13/G/i/t/4/1760329180626_300.jpg", title: "ĐA NGHI", artist: 'ANH TRAI "SAY HI"',
      audio:"/music/DA-NGHI.mp3",
      label:"UNIVERSAL MUSIC GROUP",
      labelImg: "https://image-cdn.nct.vn/provider/2020/02/06/7/c/c/b/1580970856708.jpg",
    },
  ];

  const songsINT = [
    {
      id: "intl-1",
      img: "https://image-cdn.nct.vn/song/2018/06/20/7/1/5/3/1529487573799_300.jpg",
      title: "That Girl",
      artist: "Olly Murs",
      label:"SONY MUSIC",
      labelImg:"https://image-cdn.nct.vn/provider/2020/02/13/8/d/9/4/1581563932392.jpg",
      audio:"/music/That Girl.mp3"
    },
    { id: "song-6",
      img: "https://image-cdn.nct.vn/song/2017/08/07/c/b/1/e/1502075660969_300.jpg", title: "Havana", artist: "Camila Cabello,Young Thug",audio:"/music/Havana.mp3",
      label:"SONY MUSIC",
      labelImg:"https://image-cdn.nct.vn/provider/2020/02/13/8/d/9/4/1581563932392.jpg",
    },
    { id: "intl-3",
      img: "https://image-cdn.nct.vn/song/2018/01/25/5/2/d/e/1516891769034_300.jpg", title: "Shape Of You", artist: "Ed Sheeran",audio:"/music/Shape Of You.mp3",
      label:"SONY MUSIC",
      labelImg:"https://image-cdn.nct.vn/provider/2020/02/13/8/d/9/4/1581563932392.jpg",
    },
    { id: "song-7",
      img: "https://image-cdn.nct.vn/song/2024/10/18/1/8/a/e/1729211353297_300.jpg", title: "APT.", artist: "ROSÉ,Bruno Mars",audio:"/music/APT..mp3",
      label:"WARNER RECORDED MUSIC",
      labelImg: "https://image-cdn.nct.vn/provider/2020/11/12/e/2/a/c/1605147272711.jpg",
     },
    { id: "intl-5",
      img: "https://image-cdn.nct.vn/song/2020/06/05/4/f/d/2/1591338842259_300.jpg", title: "Still With You", artist: "Jung Kook (BTS)",audio:"/music/Still With You.mp3",
       label:"INGROOVES MUSIC GROUP",
      labelImg:"https://image-cdn.nct.vn/provider/2023/07/06/4/f/c/4/1688614662954.jpg",
    },
    { id: "intl-6",
      img: "https://image-cdn.nct.vn/song/2024/10/26/3/0/d/3/1729941033115_300.jpg", title: "Trang Giấy Cuối Cùng / 最后一页", artist: "EN",audio:"/music/Trang Giấy Cuối Cùng _ 最后一页.mp3",
       label:"SONY MUSIC",
      labelImg:"https://image-cdn.nct.vn/provider/2020/02/13/8/d/9/4/1581563932392.jpg",
    },
    { id: "intl-7",
      img: "https://image-cdn.nct.vn/song/2024/03/15/4/c/b/d/1710485895535_300.jpg", title: "You Are Everywhere・2024", artist: "Young Captain",audio:"/music/You Are Everywhere・2024.mp3",
       label:"SONY MUSIC",
      labelImg:"https://image-cdn.nct.vn/provider/2020/02/13/8/d/9/4/1581563932392.jpg",
     },
    { id: "intl-8",
      img: "https://image-cdn.nct.vn/song/2017/09/12/b/f/0/6/1505189629603_300.jpg", title: "Fly Away", artist: "TheFatRat,Anjulie",audio:"/music/Fly Away.mp3",
       label:"SONY MUSIC",
      labelImg:"https://image-cdn.nct.vn/provider/2020/02/13/8/d/9/4/1581563932392.jpg",
    },
    { id: "intl-9",
      img: "https://image-cdn.nct.vn/song/2022/12/06/8/b/9/3/1670322228331_300.jpg", title: "50 Feet", artist: "SOMO",audio:"/music/50 Feet.mp3",
      label:"SONY MUSIC",
      labelImg:"https://image-cdn.nct.vn/provider/2020/02/13/8/d/9/4/1581563932392.jpg",
    },
  ];

  const getSongs = () => {
    if (tab === "vn") return songsVN;
    if (tab === "intl") return songsINT;
    return songsAll;
  };

  return (
    <div className="nr-container">
      <h2 className="nr-title">Mới phát hành</h2>

      {/* Tabs */}
      <div className="nr-tabs">
        <button className={tab === "all" ? "active" : ""} onClick={() => setTab("all")}>TẤT CẢ</button>
        <button className={tab === "vn" ? "active" : ""} onClick={() => setTab("vn")}>VIỆT NAM</button>
        <button className={tab === "intl" ? "active" : ""} onClick={() => setTab("intl")}>QUỐC TẾ</button>
      </div>

      {/* Songs grid */}
      <div className="nr-grid">
        {getSongs().map((song) => (
          <div className="nr-item" key={song.id}>
            
            {/* Click ảnh → chuyển SongPage */}
            <img 
              src={song.img} 
              className="nr-img" 
              onClick={() => navigate(`/song/${song.id}`)}
            />

            <div className="nr-info">
              {/* Click chữ → chỉ phát nhạc */}
              <p 
                className="nr-name" 
                onClick={() => {
                  setCurrentSong(song);
                  setTimeout(() => audioRef.current?.play(), 200);
                }}
              >
                {song.title}
              </p>
              <p 
                className="nr-artist" 
                onClick={() => {
                  setCurrentSong(song);
                  setTimeout(() => audioRef.current?.play(), 200);
                }}
              >
                {song.artist}
              </p>
              <div className="label-row">
                <img src={song.labelImg} className="label-logo" />
                <span className="label-text">{song.label}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Player-bar cho NewRelease */}
      {currentSong && (
        <div className="player-bar">
          <div className="player-left">
            <img src={currentSong.img} className="player-img" />
            <div>
              <p className="player-title">{currentSong.title}</p>
              <p className="player-artist">{currentSong.artist}</p>
            </div>
          </div>

          <audio 
            ref={audioRef} 
            controls 
            className="audio-full" 
            src={currentSong.audio} 
          />
        </div>
      )}
    </div>
  );
}
