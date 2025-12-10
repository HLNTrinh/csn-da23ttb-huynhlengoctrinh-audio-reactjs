import UserNavbar from "./UserNavbar";
import UserSidebar from "./SidebarUser.jsx";
export default function UserLayout() {
  return (
    <div style={styles.container}>
        <div style={styles.sidebar}>
               <UserSidebar />
              </div>
              <div style={styles.mainContent}>
                    <UserNavbar />
                      
                      </div>
                      </div>
  );
}
 const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "#f5f5f5",
  },
  sidebar: {
    width: "240px",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  mainContent: {
    marginLeft: "240px", // để tránh bị sidebar che
    position: "fixed",   // cố định mainContent
    top: 0,
    right: 0,
    bottom: 0,
    overflowY: "auto",   // cuộn nếu nội dung dài
    display: "flex",
    flexDirection: "column",
    width: "calc(100% - 240px)", // full màn hình trừ sidebar
    background: "#261861ff",
  },
 
};
