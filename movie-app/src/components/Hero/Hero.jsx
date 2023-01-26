import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Typewriter from 'typewriter-effect';
const Hero = ({ movies }) => {
  const [name, setName] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [filteredMovie, setFilteredMovie] = useState([]);
  let navigate = useNavigate();

  const handleOnchange = (e) => {
    setNotFound(false);
    const wordEntered = e.target.value.trim();
    setName(wordEntered);
   

    const filter = movies.filter((value) => {
      return value.toLowerCase().includes(wordEntered.toLowerCase());
    });

    
    setFilteredMovie([]);
  
    if (filter.length > 0) {
      setFilteredMovie(filter);
    }

    if (wordEntered.length === 0) {
      setFilteredMovie([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(filteredMovie);
    // navigate(`/movie/${name}`);
  };
  return (
    <section className="w-full h-96   flex items-center justify-center  lg:px-20 ">
      <img
        src="https://c4.wallpaperflare.com/wallpaper/142/751/831/landscape-anime-digital-art-fantasy-art-wallpaper-preview.jpg"
        alt=""
        className="object-fill  brightness-50 h-full relative w-full rounded-2xl"
      />
      <div className="absolute w-[90%] md:w-[50%]  md:text-left text-center font-mono">
        <h1 className="text-white font-extrabold text-2xl md:text-5xl animate-bounce tracking-wider">
          Welcome.
        </h1>
        <p className="text-white text-sm md:text-xl tracking-wide font-mono">
          <Typewriter options={{autoStart:true,loop:true,delay:40,strings:["Search here to get AI based movies Recommendation !","Developed & Designed by Subham Mishra 😎😎"]}}></Typewriter>
        </p>

        <div className="flex items-center mt-5 md:mt-7">
          <div className="flex space-x-1  w-full md:p-0 p-4">
            <input
              type="text"
              className="block w-full md:text-base text-sm   px-4 py-2 text-purple-700 bg-white border rounded-lg focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Search movies..."
              onChange={handleOnchange}
            />
            <button
              className="px-4 text-white bg-[#085797] rounded-md "
              onClick={handleSubmit}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        {notFound ? (
          <div className="NotFound text-red-500 text-2xl">
            Sorry! The Movie You Searched for is not present in our data base
          </div>
        ) : null}
        {filteredMovie.length > 0 ? (
          <div className="searchList bg-white absolute rounded-lg z-10">
            {filteredMovie.slice(0, 10).map((movie) => (
              <div
                className="searchItem text-xs md:text-base hover:bg-slate-300 p-1 px-3 border-b-2"
                onClick={() => navigate(`/movie/${movie}`)}
              >
                {movie}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Hero;
