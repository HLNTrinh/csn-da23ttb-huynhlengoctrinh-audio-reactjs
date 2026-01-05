import "./explore.css";
import SidebarUser from "./SidebarUser";
import UserNavbar from "./UserNavbar";
import PlaylistDetail from "./PlaylistDetail";
import { useState } from "react";

const top100Sections = [
  {
    title: "Nổi bật",
    items: [
      {
        img: "https://image-cdn.nct.vn/playlist/2015/01/01/9/e/c/b/1420085184588_300.jpg",
        name: "Top 100 Bài Hát Trữ Tình",
        artist: "Quách Tuấn Du,Cát Phượng,Triệu Minh",
        songs: [] // gắn danh sách bài nếu có
      },
      {
        img: "https://image-cdn.nct.vn/playlist/2025/02/21/4/c/a/8/1740128020558_300.jpg",
        name: "Top 100 HIPHOP Âu Mỹ ",
        artist: "Kina,Justin Bieber,Austin Mahone",
        songs: [
              {
      title: "APT.",
      artist: "ROSÉ, Bruno Mars",
      album:"APT. (Single)",
       uploader: "WARNER RECORDED MUSIC",
       artistImg: "https://image-cdn.nct.vn/provider/2020/11/12/e/2/a/c/1605147272711.jpg",
      duration: "02:49",
      audio: "public/music/APT..mp3",
      img: "https://image-cdn.nct.vn/song/2024/10/18/1/8/a/e/1729211353297_300.jpg"
    },
    {
      title: "HUMBLE.",
      artist: "Kendrick Lamar",
      album: "DAMN.",
      uploader: "TDE",
      duration: "02:57",
       uploader: "UNIVERSAL MUSIC GROUP",
       artistImg: "https://image-cdn.nct.vn/provider/2020/02/06/7/c/c/b/1580970856708.jpg",
      audio: "/music/Humble..mp3",
      img: "https://image-cdn.nct.vn/song/2018/03/13/1/4/0/6/1520932254384_300.jpg"
    },
    {
      title: "As It Was",
      artist: "Harry Styles",
    album: "Harry's House",
      uploader: "SONY MUSIC",
      duration: "02:47",
      audio: "/music/As It Was.mp3",
      artistImg: "https://image-cdn.nct.vn/provider/2020/02/13/8/d/9/4/1581563932392.jpg",
      img: "https://image-cdn.nct.vn/song/2022/04/01/b/b/2/e/1648782532078_300.jpg"
    },
    {
      title: "Anti-Hero",
      artist: "Taylor Swift",
      album: "Midnights",
      duration: "03:21",
      audio: "/music/Anti-hero.mp3",
        uploader: "UNIVERSAL MUSIC GROUP",
       artistImg: "https://image-cdn.nct.vn/provider/2020/02/06/7/c/c/b/1580970856708.jpg",
      img: "https://image-cdn.nct.vn/song/2023/05/24/b/d/9/f/1684902056122_300.jpg"
    },
    {
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      uploader: "XO / Republic",
      duration: "03:20",
      audio: "/music/Blinding Lights.mp3",
       uploader: "UNIVERSAL MUSIC GROUP",
       artistImg: "https://image-cdn.nct.vn/provider/2020/02/06/7/c/c/b/1580970856708.jpg",
      img: "https://image-cdn.nct.vn/song/2019/11/29/d/1/c/d/1575009224279_300.jpg"
    }

        ]
      },
      {
        img: "https://image-cdn.nct.vn/playlist/2025/02/25/d/f/5/3/1740470404391_300.jpg",
        name: "Top 100 EDM / Dance",
        artist: "Alan Walker, Calvin Harris",
        songs: []
      },
       {
        img: "https://image-cdn.nct.vn/playlist/2025/02/21/4/c/a/8/1740128104573_300.jpg",
        name: "Top 100 Blues/Jazz ",
        artist: "David Huntsinger,Michael Forster,Jeetu Bhowmik",
        songs: []
      },
       {
        img: "https://image-cdn.nct.vn/playlist/2025/02/21/4/c/a/8/1740128183735_300.jpg",
        name: "Top 100 Nhạc Latin",
        artist: "Beéle,FIFA Sound,Gente De Zona",
        songs: []
      },
       {
        img: "https://image-cdn.nct.vn/playlist/2025/02/21/4/c/a/8/1740128279970_300.jpg",
        name: "Top 100 Nhạc Hoa Hay Nhất",
        artist: "LBI,Trang Kỳ Văn 29",
        songs: []
      },
    ],
  },
  {
    title: "Top 100 Việt Nam",
    items: [
      {
        img: "https://image-cdn.nct.vn/playlist/2025/08/26/9/b/U/d/1756195103776_300.png",
        name: "Top 100 Nhạc Trịnh",
        artist: "Giang Hồng Ngọc,Lệ Thu,Kiên Trịnh",
        songs: []
      },
      {
        img: "https://image-cdn.nct.vn/playlist/2025/02/21/4/c/a/8/1740126170143_300.jpg",
        name: "Top 100 Rap Việt",
        artist: "Low G, JustaTee, Obito",
        songs: [
           {
      title: "Ex's Hate Me",
      artist: "B Ray, Masew, AMEE",
      album: "TOP V-RAP 2025",
    uploader: "SKYMUSIC",
      artistImg: "https://image-cdn.nct.vn/provider/2020/02/06/7/c/c/b/1580961979050.jpg",
      duration: "03:43",
      audio: "/music/Exs Hate Me.mp3",
      img: "https://image-cdn.nct.vn/song/2019/02/13/7/c/9/3/1550063179723_300.jpg"
    },
    {
      title: "Nếu Lúc Đó",
      artist: "tlinh",
      img: "https://image-cdn.nct.vn/song/2023/02/27/2/9/a/2/1677482230509_300.jpg",
      duration: "3:18",
      audio: "/music/neu-luc-do.mp3",
       uploader: "INGROOVES MUSIC GROUP",
      artistImg: "https://image-cdn.nct.vn/provider/2020/02/06/7/c/c/b/1580970856708.jpg",
       album: "/music/nếu lúc đó.mp3",
    },
    {
      title: "Gene",
      artist: "Binz,Touliver",
      album: "TOP V-RAP 2025",
       uploader: "SKYMUSIC",
      artistImg: "https://image-cdn.nct.vn/provider/2020/02/06/7/c/c/b/1580961979050.jpg",
      duration: "03:19",
      audio: "/music/Gene.mp3",
      img: "https://image-cdn.nct.vn/song/2019/05/12/a/9/0/c/1557657445381_300.jpg"
    },
    {
      title: "Lạ Lùng",
      artist: "Vũ",
      album: "TOP V-RAP 2025",
      uploader: "WARNER RECORDED MUSIC",
       artistImg: "https://image-cdn.nct.vn/provider/2020/11/12/e/2/a/c/1605147272711.jpg",
      duration: "04:21",
      audio: "/music/La Lung.mp3",
      img: "https://image-cdn.nct.vn/song/2018/01/26/1/8/9/0/1516930244148_300.jpg"
    },
    {
      title: "Bigcityboi",
      artist: "Binz",
      album: "TOP V-RAP 2025",
      uploader: "SpaceSpeakers",
      duration: "03:17",
      audio: "/music/Bigcityboi.mp3",
      uploader: "WARNER RECORDED MUSIC",
       artistImg: "https://image-cdn.nct.vn/provider/2020/11/12/e/2/a/c/1605147272711.jpg",
      img: "https://image-cdn.nct.vn/song/2023/07/13/a/e/f/0/1689267342814_300.jpg"
    },
    {
      title: "Liệu Giờ",
      artist: "2T,Venn",
      album: "TOP V-RAP 2025",
      uploader: "LOOPS MUSIC",
      artistImg: "https://image-cdn.nct.vn/provider/2022/06/01/3/d/d/9/1654052613310.jpg",
      duration: "03:08",
      audio: "/music/They Said.mp3",
      img: "https://image-cdn.nct.vn/song/2019/04/14/c/f/b/5/1555229869537_300.jpg"
    }
        ]
      },
      {
        img: "https://image-cdn.nct.vn/playlist/2025/08/26/H/l/O/p/1756195166611_300.png",
        name: "Top 100 Nhạc Tiền Chiến Hay Nhất",
        artist: "Khánh Ly,Lệ Thu,Quang Dũng",
        songs: []
      },
        {
        img: "https://image-cdn.nct.vn/playlist/2025/04/11/b/1/8/9/1744366322042_300.jpg",
        name: "Top 100 Nhạc Trữ Tình Hay Nhất",
        artist: "Lệ Quyên,Quang Lê,Mai Thiên Vân",
        songs: []
      },
      {
        img: "https://image-cdn.nct.vn/playlist/2025/02/26/9/e/2/0/1740560998902_300.jpg",
        name: "Top 100 Remix Việt Hay Nhất",
        artist: "Wendy Thảo,Air Media,Nguyễn Hữu Kha",
        songs: []
      },
      {
        img: "https://image-cdn.nct.vn/playlist/2025/02/21/4/c/a/8/1740126106914_300.jpg",
        name: "Top 100 Nhạc Trẻ Hay Nhất",
        artist: "ANH TRAI 'SAY HI',B Ray,AMEE",
        songs: []
      },
    ],
  },
];

export default function Top100() {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <SidebarUser />
      </div>

      {/* MAIN */}
      <div style={styles.mainContent}>
        <div style={styles.navbar}>
          <UserNavbar />
        </div>

        {selectedPlaylist ? (
          <PlaylistDetail
            playlist={selectedPlaylist}
            onBack={() => setSelectedPlaylist(null)}
          />
        ) : (
          <div className="explore-container">
            {top100Sections.map((section, index) => (
              <div className="explore-section" key={index}>
                <div className="explore-header">
                  <h2>{section.title}</h2>
                </div>

                <div className="explore-row">
                  {section.items.map((item, i) => (
                    <div
                      className="music-card"
                      key={i}
                      onClick={() => setSelectedPlaylist(item)}
                    >
                      <img src={item.img} alt="" />
                      <p className="title">{item.name}</p>
                      <p className="artist">{item.artist}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
const styles = {
container: {
    display: "flex",
    height: "100vh",
  },
  sidebar: {
    width: "240px",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
  },
  mainContent: {
     marginLeft: "0px",
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  width: "calc(100% - 240px)",
  background: "#0d0734ff",

  overflowY: "scroll",  // cho phép cuộn dọc
  overflowX: "hidden",  // ẩn cuộn ngang
  scrollbarWidth: "none", // Firefox
  },
  navbar: {
    width: "calc(100% - 240px)",
    height: "70px",          // TUỲ: chỉnh chiều cao navbar nếu muốn
   position: "sticky",
    top: 0,
    padding: "10px 10px",
    zIndex: 10,
   
  },
};
