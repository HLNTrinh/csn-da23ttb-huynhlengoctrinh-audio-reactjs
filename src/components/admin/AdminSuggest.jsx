import "./adminSuggest.css";
import AdminSidebar from "./AdminSidebar";
import Navbar from "./AdminNavbar";
import { SONG_CATEGORIES } from "/Users/huynh/music-app/src/data/song";
import { useRecommend } from "../../context/RecommendContext";

export default function AdminSuggest() {
  const { recommendedSongs, addRecommend, removeRecommend } =
    useRecommend();

  /* ===== FLATTEN ALL SONGS ===== */
  const allSongs = SONG_CATEGORIES.flatMap((category) =>
    category.items.flatMap((playlist) =>
      playlist.songs.map((song) => ({
        ...song,
        playlistName: playlist.name,
        categoryName: category.title,
      }))
    )
  );

  const isSuggested = (song) =>
    recommendedSongs.some((s) => s.title === song.title);

  return (
     <div style={styles.container}>
          <div style={styles.sidebar}>
              <AdminSidebar />
            </div>
             <div style={styles.mainContent}>
             <div style={styles.navbar}>
                                    <Navbar />
                                  </div>

        <div className="admin-suggest">
          <h2>🎧 Quản lý gợi ý bài hát </h2>

          <div className="playlist-block">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Bài hát</th>
                  <th>Nghệ sĩ</th>
                  <th>Playlist</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>

              <tbody>
                {allSongs.map((song, index) => {
                  const suggested = isSuggested(song);

                  return (
                    <tr key={`${song.title}-${index}`}>
                      <td>{index + 1}</td>
                      <td>{song.title}</td>
                      <td>{song.artist}</td>
                      <td>{song.playlistName}</td>

                      {/* ===== STATUS ===== */}
                      <td>
                        {suggested ? (
                          <span className="status active">
                            Đang gợi ý
                          </span>
                        ) : (
                          <span className="status inactive">
                            Chưa gợi ý
                          </span>
                        )}
                      </td>

                      {/* ===== ACTION ===== */}
                      <td>
                        {suggested ? (
                          <button
                            className="btn delete"
                            title="Ẩn khỏi trang User"
                            onClick={() =>
                              removeRecommend(song.title)
                            }
                          >
                            Gỡ
                          </button>
                        ) : (
                          <button
                            className="btn add"
                            title="Hiển thị bên trang User"
                            onClick={() => addRecommend(song)}
                          >
                            Gợi ý
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}

                {allSongs.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      Không có bài hát
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p
            style={{
              marginTop: 12,
              fontSize: 13,
              color: "#666",
            }}
          >
            💡 Bài hát được gợi ý sẽ hiển thị ở trang User ngay
            lập tức.
          </p>
        </div>
      </div>
    </div>
  );
}


/* ================= STYLE ================= */
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
    display: "flex",
    flexDirection: "column",
  },
  mainContent: {
    marginLeft: "240px",
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    width: "calc(100% - 240px)",
    background: "#f5f5f5",
  },
  navbar: {
  width: "calc(100% - 2px)",
  height: "100px",
  position: "sticky",
  top: 0,
  padding: "0px",
  zIndex: 10,
  
}
};
