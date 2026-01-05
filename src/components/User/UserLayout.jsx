import UserNavbar from "./UserNavbar";
import UserSidebar from "./SidebarUser.jsx";
import HomeSection from "./HomeSection/HomeSection.jsx";
import Footer from "./footer/Footer.jsx";
import NewRelease from "./NewRelease/NewRelease.jsx";
import Trending from "./Trending.jsx"

export default function UserLayout() {
  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <UserSidebar />
      </div>
      <div style={styles.mainContent}>
       <div style={styles.navbar}>
                 <UserNavbar />
               </div>
          <HomeSection />
            <Trending/>
          <NewRelease />
          <Footer />
        </div>

      </div>
    
  );
}

const styles = {
  container: {
   display: "flex",
      width: "100vw",
      height: "100vh",
      boxSizing: "border-box",
  
  },

  sidebar: {
    width: "240px",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
   
  },

  mainWrapper: {
    width: "calc(100% - 240px)",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#0d0734ff",
  },
  navbar: {
    width: "calc(100% - 240px)",
    height: "70px",          // TUỲ: chỉnh chiều cao navbar nếu muốn
    position: "sticky",
    top: 0,
    padding: "10px 10px",
    zIndex: 10,
    
  },

 mainContent: {
    marginLeft: "0px",
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  width: "calc(100% - 240px)",
  background: "#0d0734ff",

  overflowX: "hidden",  // ẩn cuộn ngang
  scrollbarWidth: "none", // Firefox
  }
};