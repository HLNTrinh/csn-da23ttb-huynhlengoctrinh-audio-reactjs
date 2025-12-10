import Topbar from './Topbar.jsx';
import Sidebar from './Sidebar.jsx'; // bạn cần tạo Sidebar component
import Artists from './Artists';
import HomeSection from "./HomeSection/HomeSection.jsx";
import TrendingSongs from './Trending.jsx';
import Topics from "./Topics";
import Hometopic from "./hometopic/hometopic";
import Footer from "./footer/Footer";
import NewRelease from "./NewRelease/NewRelease.jsx";
import Today from "./today/Today";
import AudioPlayerProvider from "./today/AudioPlayerProvider";
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
      <Today/>
      <AudioPlayerProvider/>
        <NewRelease />
        <Footer />
      </div>
    </div>
  );
}
