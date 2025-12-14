import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, RouterContextProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import AdminPage from "./components/AdminPage.jsx";
import UserLayout from "./components/User/UserLayout.jsx";
import Songpageuser from "./components/User/sp.jsx"
import SongPage from "./components/SongPage";
import Explore from "./components/User/Explore.jsx"
import NewCharts from "./components/User/NewChart.jsx"
export default function App() {
  return (
    <Router>
      <div className="app-container">
      <Routes>
         <Route path="/" element={<Home/>} />
       <Route path="/admin" element={<AdminPage />} />
        <Route path="/user/explore" element={<Explore/>} />
        <Route path="/user/new" element={<NewCharts/>}/>
          <Route path="/song/:id" element={<SongPage />} />
          <Route path="/song/:id" element={<Songpageuser />} />
          <Route path="/user" element={<UserLayout />}/>
           
    </Routes>
      </div>
    </Router>
  );
}
