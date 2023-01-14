import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Home from "./components/Home";
import Loading from "./components/Loading/Loading";
import MovieDetails from "./components/MovieDetails";
import Slider from "./components/Slider/Slider";
import React from "react";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      {/* <Header />
       */}

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
