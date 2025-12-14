import { useState } from "react";
import "./trendingsongs.css";
import MiniPlayer from "./MiniPlayer";

export default function TrendingSongs() {

  const allSongs = [
    { img: "/image/niuduyen.jpg", title: "Níu Duyên", artist: "Lê Bảo Bình", audio: "/music/Níu Duyên.mp3",
      label:"NCT MUSIC DISTRIBUTION",
      labelImg:"https://image-cdn.nct.vn/provider/2020/02/13/8/d/9/4/1581565412825.jpg",
    },
    { img: "/image/5.jpg", title: "Sài Gòn Đau Lòng Quá", artist: "Hứa Kim Tuyền, Hoàng Duyên", audio:"/music/Sài Gòn Đau Lòng Quá.mp3",
      label:"YIN YANG MEDIA",
      labelImg:"https://image-cdn.nct.vn/provider/2020/02/06/7/c/c/b/1580970715693.jpg",
    },
    { img: "https://image-cdn.nct.vn/song/2022/09/16/0/2/1/c/1663315456776_300.jpg", title:"Pink Venom", artist:"BLACKPINK", audio:"/music/Pink Venom.mp3",
      label:"YG PLUS",
      labelImg:"https://image-cdn.nct.vn/provider/2020/11/05/3/3/7/9/1604547385257.jpg",
    },
    { img: "https://image-cdn.nct.vn/song/2020/08/06/6/0/8/0/1596715581082_300.jpg", title:"Phải Là Yêu", artist:"HIEUTHUHAI, HURRYKNG", audio:"/music/Phải Là Yêu.mp3",
      label:"BELIEVE MUSIC",
      labelImg:"https://image-cdn.nct.vn/provider/2020/12/08/6/1/f/9/1607396500140.jpg",
    },
    { img: "public/convers/6.jpg", title:"Không Buông", artist:"Hngle,Ari", audio:"/music/Không Buông.mp3",
      label:"VIVI ENM",
      labelImg:"https://image-cdn.nct.vn/provider/2023/09/26/2/3/0/b/1695710888302.jpg",
    },
    { img: "https://image-cdn.nct.vn/song/2025/11/26/Z/U/0/5/1764129218488_300.jpg", title:"ĐỂ THƯƠNG ĐỂ CHO NHAU", artist:"Otis,Yeolan", audio:"/music/ĐỂ THƯƠNG ĐỂ CHO NHAU.mp3",
      label:"UNIVERSAL MUSIC GROUP",
      labelImg:"https://image-cdn.nct.vn/provider/2020/02/06/7/c/c/b/1580970856708.jpg",
    },
    { img: "https://image-cdn.nct.vn/song/2025/11/21/C/Y/j/k/1763719323352_300.jpg", title:"QUAN TRỌNG KHÔNG?", artist:"choi", audio:"/music/QUAN TRỌNG KHÔNG_.mp3",
      label:"The Orchard",
      labelImg:"https://image-cdn.nct.vn/provider/2025/05/30/4/e/4/6/1748601994193.jpg",
    },
    { img: "https://image-cdn.nct.vn/song/2025/11/21/T/y/v/o/1763738548111_300.jpg", title:"Dễ Dỗ Dành", artist:"Thế Anh Shinichi,Harmonie", audio:"/music/Dễ Dỗ Dành.mp3",
      label:"INGROOVES MUSIC GROUP",
      labelImg:"https://image-cdn.nct.vn/provider/2023/07/06/4/f/c/4/1688614662954.jpg",
    },
    { img: "https://image-cdn.nct.vn/song/2025/11/13/j/s/U/L/1763048248352_300.jpg", title:"Solitary", artist:"Krystal", audio:"/music/Solitary.mp3",
      label:"The Orchard",
      labelImg:"https://image-cdn.nct.vn/provider/2025/05/30/4/e/4/6/1748601994193.jpg",
    },
  ];

  const [songs, setSongs] = useState(allSongs);
  const [currentIndex, setCurrentIndex] = useState(null);

  const refreshSongs = () => {
    const shuffled = [...allSongs].sort(() => Math.random() - 0.5);
    setSongs(shuffled);
  };

  const handlePlay = (song) => {
    const index = songs.indexOf(song);
    setCurrentIndex(index);
  };

  const nextSong = () => {
    setCurrentIndex((i) =>
      i + 1 < songs.length ? i + 1 : 0
    );
  };

  const prevSong = () => {
    setCurrentIndex((i) =>
      i - 1 >= 0 ? i - 1 : songs.length - 1
    );
  };

  return (
    <div className="suggest-container">

      <div className="suggest-header">
        <h4 className="suggest-title">Gợi ý bài hát</h4>
        <button className="refresh-btn" onClick={refreshSongs}>Làm mới</button>
      </div>

      <div className="suggest-grid">
        {songs.map((s, i) => (
          <div key={i} className="suggest-item" onClick={() => handlePlay(s)}>
            <img src={s.img} className="suggest-img" />
            <div className="suggest-info">
              <p className="suggest-name">{s.title}</p>
              <p className="suggest-artist">{s.artist}</p>
              <div className="label-row">
                <img src={s.labelImg} className="label-logo" />
                <span className="label-text">{s.label}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {currentIndex !== null && (
        <MiniPlayer
          song={songs[currentIndex]}
          onNext={nextSong}
          onPrev={prevSong}
          onAddToLibrary={(s) => console.log("ADD:", s)}
        />
      )}

    </div>
  );
}
