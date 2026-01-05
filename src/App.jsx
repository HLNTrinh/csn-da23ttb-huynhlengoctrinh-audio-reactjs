import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import AdminPage from "./components/AdminPage.jsx";
import AdminSongs from "./components/admin/AdminSongs.jsx";
import AdminPlayList from "./components/admin/AdminPlaylists.jsx"
import UserLayout from "./components/User/UserLayout.jsx";
import SongPage from "./components/SongPage";
import Explore from "./components/User/Explore.jsx"
import Library from "./components/User/MusicLibrary.jsx"
import PlaylistDetail from "./components/User/PlaylistDetail";
import NewCharts from "./components/User/NewChart.jsx"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Top100 from "./components/User/Top100.jsx"
import AdminAccount from "./components/admin/AdminAccount.jsx";
import AdminSuggest from "./components/admin/AdminSuggest.jsx";
import AdminTopics from "./components/admin/AdminTopics.jsx"
export default function App() {
  return (
    <Router>
      <div className="app-container">
      <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/songs"element={<AdminSongs/>}/>
  <Route path="/admin/account" element={<AdminAccount />} />
      <Route path= "/admin/playlists"element={<AdminPlayList/>}/>
      <Route path="/admin/topics" element={<AdminTopics/>}/>
         <Route path="/admin/suggest" element={<AdminSuggest />} />
        <Route path="/user/explore" element={<Explore/>} />
        <Route path="/user/new" element={<NewCharts/>}/>
        <Route path= "/user/top" element={<Top100/>}/>
        <Route path="/user/library" element={<Library/>}/>
          <Route path="/song/:id" element={<SongPage />} />
          <Route path="/user" element={<UserLayout />}/>
           <Route path="/playlist" element={<PlaylistDetail />} />
           <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
        
    </Routes>
      </div>
    </Router>

  );
}
