import "./explore.css";
import SidebarUser from "./SidebarUser";
import UserNavbar from "./UserNavbar"; 
import PlaylistDetail from "./PlaylistDetail";
import { useState } from "react";

const sections = [
  {
    title: "Replay 2025",
    items: [
      {
        img: "https://image-cdn.nct.vn/playlist/2025/12/04/4/9/5/1/1764840290085_300.jpg",
        name: "TOP THỊNH HÀNH 2025",
        artist: "JENNIE, ERIK, MAYDAYs,...",
        songs: [
          {
            title: "You & Me",
            artist: "JENNIE",
            uploader: "YG Entertainment",
            duration: "03:14",
            audio: "/music/you-and-me.mp3",
            img: "https://image-cdn.nct.vn/song/2023/10/06/2/5/3/5/1696563949492_300.jpg"
          },
          {
            title: "Chạy Về Khóc Với Anh",
            artist: "ERIK",
            uploader: "Universal",
            duration: "04:01",
            audio: "/audio/chay-ve.mp3",
            img: "https://image-cdn.nct.vn/song/2022/01/26/4/e/f/e/1643184497199_300.jpg"
          },
          {
            title: "Solo",
            artist: "JENNIE",
            uploader: "YG Entertainment",
            duration: "03:47",
            audio: "/music/Solo.mp3",
            img: "https://image-cdn.nct.vn/song/2018/11/12/7/f/3/1/1542015331222_300.jpg"
          },
          {
            title: "Mất Kết Nối",
            artist: "Dương Domic",
            uploader: "DAO ENTERTAINMENT",
            duration: "03:27",
            audio: "/music/Solo.mp3",
            img: "https://image-cdn.nct.vn/song/2024/11/21/5/9/b/6/1732160020288_300.jpg"
          },
        ]
      },

      // Các playlist còn lại chưa có songs → thêm mảng rỗng
      {
        img: "https://image-cdn.nct.vn/playlist/2025/12/05/f/0/b/5/1764931075380_300.jpg",
        name: "NGHỆ SĨ XUẤT SẮC 2025",
        artist: "STRONG, ERIK, MAYDAYs",
        songs: []
      },
      {
        img: "https://image-cdn.nct.vn/playlist/2025/12/04/4/9/5/1/1764842542605_300.jpg",
        name: "NCT TOP HITS 2025",
        artist: "Dương Domic, ERIK, LBI",
        songs: []
      },
      {
        img: "https://image-cdn.nct.vn/playlist/2025/12/04/4/9/5/1/1764841923813_300.jpg",
        name: "NCT TOP V-POP 2025",
        artist: "MAYDAYs, Minh Tốc & Lam, ERIK",
        songs: []
      },
      {
        img: "https://image-cdn.nct.vn/playlist/2025/12/05/f/0/b/5/1764931908349_300.jpg",
        name: "NCT TOP V-RAP 2025",
        artist: "B Ray, Hustlang Robber, Gill",
        songs: []
      },
      {
        img: "https://image-cdn.nct.vn/playlist/2025/12/05/f/0/b/5/1764929856842_300.jpg",
        name: "NCT TOP US-UK 2025",
        artist: "ROSÉ, Kendrick Lamar",
        songs: []
      },
    ],
  },

  //==== SECTION 2 ====
  {
    title: "All About Viet Music",
    items: [
      {
        img: "https://image-cdn.nct.vn/playlist/2025/09/22/8/f/d/9/1758535642289_300.jpg",
        name: "Hit Việt Quốc Dân",
        artist: "MIN, DANGRANGTO, antransax",
        songs: []
      },
      {
        img: "https://image-cdn.nct.vn/playlist/2025/10/27/8/8/5/b/1761540203774_300.jpg",
        name: "V-Pop Thịnh Hành",
        artist: "MIN, DANGRANGTO, antransax",
        songs: []
      },
      {
        img: "https://image-cdn.nct.vn/playlist/2024/06/20/a/6/e/4/1718877870154_300.jpg",
        name: "TikTok Remix Việt",
        artist: "Nguyễn Hữu Kha, Nguyễn Vĩ, Huyền Tr...",
        songs: []
      },
      {
        img: "https://image-cdn.nct.vn/playlist/2025/12/10/9/a/2/0/1765337953616_300.jpg",
        name: "Gen Gì Gen Z",
        artist: "Anh Trai “Say Hi”, Vương Bỉnh",
        songs: []
      },
      {
        img: "https://image-cdn.nct.vn/playlist/2025/12/09/a/c/a/8/1765263642439_300.jpg",
        name: "Ballad Việt",
        artist: "Anh Trai “Say Hi”, B Ray, AMEE",
        songs: []
      },
      {
        img: "https://image-cdn.nct.vn/playlist/2025/12/09/a/c/a/8/1765253483100_300.jpg",
        name: "Nhạc Mới Triển Vọng",
        artist: "ERIK, HIEUTHUHAI",
        songs: []
      },
    ],
  },
];

export default function Explore() {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  return (
    <div style={styles.container}>
      
      <div style={styles.sidebar}>
        <SidebarUser />
      </div>

      <div style={styles.mainContent}>
        <div className="navbar-sticky">
          <UserNavbar />
        </div>

        {selectedPlaylist ? (
          <PlaylistDetail 
            playlist={selectedPlaylist} 
            onBack={() => setSelectedPlaylist(null)}
          />
        ) : (
          <div className="explore-container">
            {sections.map((section, index) => (
              <div className="explore-section" key={index}>
                
                <div className="explore-header">
                  <h2>{section.title}</h2>
                  <button className="more-btn"></button>
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
    marginLeft: "240px",
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    width: "calc(100% - 240px)",
    background: "#0d0734ff",
    overflowY: "auto"
  }
};
