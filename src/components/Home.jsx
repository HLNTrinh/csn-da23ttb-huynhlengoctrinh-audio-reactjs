import Topbar from './Topbar.jsx';
import Sidebar from './Sidebar.jsx'; 
import Artists from './Artists';
import HomeSection from "./User/HomeSection/HomeSection.jsx";
import TrendingSongs from './User/Trending.jsx';
import Topics from "./Topics";
import Hometopic from "./User/hometopic/hometopic.jsx";
import Footer from "./User/footer/Footer.jsx";
import NewRelease from "./User/NewRelease/NewRelease.jsx";


export default function TrangChu() {
  const styles = {
    container: {
      display: "flex",
      width: "100vw",
      height: "100vh",
      boxSizing: "border-box",
    },
    
  };
  

  return (
    <div style={styles.container}>
      {/* Sidebar bên trái */}
      <Sidebar />
      <div>
        <Topbar />
        <HomeSection />
        <Hometopic />
        <TrendingSongs />
        <Topics />
      
     
        <NewRelease />
        <Footer />
      </div>
    </div>
  );
}
