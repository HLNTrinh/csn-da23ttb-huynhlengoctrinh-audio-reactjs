import { createContext, useContext, useEffect, useState } from "react";

const RecommendContext = createContext();

export const RecommendProvider = ({ children }) => {
  const [recommendedSongs, setRecommendedSongs] = useState([]);

  // load từ localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("recommendedSongs")) || [];
    setRecommendedSongs(data);
  }, []);

  // lưu mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem(
      "recommendedSongs",
      JSON.stringify(recommendedSongs)
    );
  }, [recommendedSongs]);

  const addRecommend = (song) => {
    if (!recommendedSongs.some((s) => s.title === song.title)) {
      setRecommendedSongs([...recommendedSongs, song]);
    }
  };

  const removeRecommend = (title) => {
    setRecommendedSongs(
      recommendedSongs.filter((s) => s.title !== title)
    );
  };

  return (
    <RecommendContext.Provider
      value={{ recommendedSongs, addRecommend, removeRecommend }}
    >
      {children}
    </RecommendContext.Provider>
  );
};

export const useRecommend = () => useContext(RecommendContext);
