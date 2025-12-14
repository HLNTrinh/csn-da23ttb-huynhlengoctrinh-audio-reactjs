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

      {/* MAIN + NAVBAR FULL MÀN HÌNH */}
      <div style={styles.mainWrapper}>

        {/* NAVBAR FULL WIDTH VÀ CỐ ĐỊNH */}
        <div style={styles.navbar}>
          <UserNavbar />
        </div>

        {/* PHẦN NỘI DUNG CUỘN */}
        <div style={styles.content}>
          <HomeSection />
            <Trending/>
          <NewRelease />
        
          <Footer />
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    width: "500vw",
    height: "100vh",
    
  },

  sidebar: {
    width: "240px",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    background: "#08041f",
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
    height: "63px",          // TUỲ: chỉnh chiều cao navbar nếu muốn
    position: "fixed",
    top: 0,
    zIndex: 20,
  
    background: "#0d0734ff",
  },

  content: {
   width: "1356px",
   padding: "0px 20px",
  marginleft: "20px", /* vì có sidebar */
  height: "100vh",
  bottom:"20px",
  top:20,
  
   
  },
};
