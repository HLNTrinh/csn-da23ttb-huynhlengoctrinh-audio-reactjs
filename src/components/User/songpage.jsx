import { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { IoTimeOutline, IoTrashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./searchDropdown.css";
import { FiTrendingUp } from "react-icons/fi";
export default function songpage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState([
    
  ]);

  const navigate = useNavigate();
  const boxRef = useRef();

  // Danh sách bài hát
  const songs = [
    { id: "niu-duyen", title: "Níu Duyên", artist: "Lê Bảo Bình" },
    { id: "see-tinh", title: "See Tình", artist: "Hoàng Thuỳ Linh" },
    { id: "waiting-for-you", title: "Waiting For You", artist: "Mono" },
    { id: "thiep-hong-sai-ten", title: "Thiệp Hồng Sai Tên", artist: "TLong" },
    { id: "kho-bau", title: "Kho Báu ", artist: "(S)TRONG,Rhymastic" },
    { id: "pin-du-phong", title: "Pin Dự Phòng", artist: "Dương Domic,Lou Hoàng" },
    { id: "khong-buong", title: "Không Buông", artist: "H2K" },
    { id: "nguoi-dau-tien", title: "Người Đầu Tiên", artist: "Juky San,buitruonglinh" },
    { id: "khong-buong", title: "Không Buông", artist: "H2K" },
    { id: "song-1", title: "The Fate of Ophelia", artist: "Taylor Swift, The Chainsmokers" },
    { id: "song-2", title: "Panorama", artist: "Richie D. ICY, Obito" },
    { id: "song-3", title: "画圈", artist: "EN" },
    { id: "song-4", title: "BOUNCE", artist: 'ANH TRAI "SAY HI"'},
    { id: "song-5", title: "NOT CUTE ANYMORE", artist: "ILLIT" },
    { id: "song-6", title: "Havana", artist: "Camila Cabello,..." },
    { id: "song-7", title: "APT.", artist: "Rose,." },
    { id: "song-8", title: "ĐOẠN KỊCH CÂM", artist: 'ANH TRAI "SAY HI"' },
    { id: "song-9", title: "Anh Sẽ Quên Được Em", artist: "QuocKiet,.." },
    { id: "vn-2", title: "Bỏ Mặc Anh", artist: "Tez,Mason Nguyen"},
    {id:"vn-3", title: "Qua Vài Câu Chuyện Tình", artist: "GiGi Hương Giang"},
    { id: "vn-4",  title: "EMGAI", artist: "DI RUMINH"},
    { id: "vn-6",title: "BÍ MẬT NHỎ", artist: 'ANH TRAI "SAY HI",Mason Nguyen'},
    { id: "vn-7", title: "ĐƯỜNG CHÂN TRỜI", artist: 'ANH TRAI "SAY HI",buitruonglinh', },
    { id: "vn-8", title: "VẠN LÝ ĐỘC HÀNH", artist: 'ANH TRAI "SAY HI",Karik' },
    { id: "vn-9", title: "ĐA NGHI", artist: 'ANH TRAI "SAY HI"' },
    { id: "intl-1", title: "That Girl",artist: "Olly Murs" },
    { id: "intl-3",title: "Shape Of You", artist: "Ed Sheeran"},
    { id: "intl-5", title: "Still With You", artist: "Jung Kook (BTS)"},
    { id: "intl-6",  title: "Trang Giấy Cuối Cùng / 最后一页", artist: "EN" },
    { id: "intl-7", title: "You Are Everywhere・2024", artist: "Young Captain" },
    {id:"intl-8",  title: "Fly Away", artist: "TheFatRat,Anjulie"},
     {id:"intl-9", title: "50 Feet", artist: "SOMO"},
  ];

  const topKey = [
    "Thiệp Hồng Sai Tên",
    "Pin Dự Phòng",
    "Anh Trai Say Hi!",
    "Chẳng phải tình đầu...",
    "Kho Báu",
  ];

  // Kết quả tìm kiếm
  const results = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
  );

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const check = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", check);
    return () => document.removeEventListener("mousedown", check);
  }, []);

  const clearHistory = () => setHistory([]);

  // ➤ BẤM VÀO BÀI HÁT TRONG RESULTS
  const handleSelectSong = (song) => {
    setSearch(song.title);
    setHistory((prev) =>
      prev.includes(song.title) ? prev : [song.title, ...prev]
    );

    navigate(`/song/${song.id}`); // dẫn đến trang SongPage
    setOpen(false);
  };

  // ➤ BẤM TOP KEY / HISTORY (không có ID)
  const handleSelectKeyword = (text) => {
  setSearch(text);

  // Lưu vào history
  setHistory((prev) =>
    prev.includes(text) ? prev : [text, ...prev]
  );

  // Tìm bài hát theo title
  const foundSong = songs.find(
    (song) => song.title.toLowerCase() === text.toLowerCase()
  );

  if (foundSong) {
    // Nếu tìm thấy bài hát → mở SongPage
    navigate(`/song/${foundSong.id}`);
  } else {
    // Không thấy thì mở SearchPage như cũ
    navigate(`/search?keyword=${encodeURIComponent(text)}`);
  }

  setOpen(false);
};

  return (
    <div className="search-wrapper" ref={boxRef}>
      {/* Ô tìm kiếm */}
      <div className="search-topbar">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Bạn muốn nghe gì?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setOpen(true)}
        />
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="dropdown-panel">
        
          {search.trim() !== "" ? (
            <>
              <div className="section-title">Kết quả tìm kiếm</div>

              {results.length > 0 ? (
                results.map((song) => (
                  <div
                    key={song.id}
                    className="dropdown-item"
                    onClick={() => handleSelectSong(song)}
                  >
                    <FiSearch className="item-icon" />
                    <span>{song.title} — {song.artist}</span>
                  </div>
                ))
              ) : (
                <p className="no-result">Không tìm thấy bài hát.</p>
              )}
            </>
          ) : (
            <>
              {/* TOP KEY */}
              <div className="section-title">Top Key</div>
              {topKey.map((item, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleSelectKeyword(item)}
                >
                  <FiTrendingUp className="item-icon" />
                  <span>{item}</span>
                </div>
              ))}

              {/* HISTORY */}
              <div className="section-title">
                Search history
                {history.length > 0 && (
                  <IoTrashOutline
                    className="trash-icon"
                    onClick={clearHistory}
                  />
                )}
              </div>

              {history.length > 0 ? (
                history.map((item, index) => (
                  <div
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleSelectKeyword(item)}
                  >
                    <IoTimeOutline className="item-icon" />
                    <span>{item}</span>
                  </div>
                ))
              ) : (
                <p className="no-result">Không có lịch sử tìm kiếm.</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
