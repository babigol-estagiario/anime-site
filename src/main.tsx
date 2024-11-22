import React, { Profiler } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import Anime from "./pages/animeInfo/anime";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/anime/:id" element={<Anime />} />
    </Routes>
  </BrowserRouter>
);
