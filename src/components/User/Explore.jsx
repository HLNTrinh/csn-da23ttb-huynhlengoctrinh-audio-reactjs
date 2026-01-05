import "./explore.css";
import SidebarUser from "./SidebarUser";
import UserNavbar from "./UserNavbar"; 
import PlaylistDetail from "./PlaylistDetail";
import { useState } from "react";
import { SONG_CATEGORIES } from "/Users/huynh/music-app/src/data/song"; // chỉnh path cho đúng


export default function Explore() {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const sections = SONG_CATEGORIES;

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <SidebarUser />
      </div>

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
                      <img src={item.img} alt={item.name} />
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
