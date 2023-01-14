import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Movie from "../Movie";

const Slider = ({ moviess, id ,name }) => {
  const [movies, setMovies] = useState(moviess);

  useEffect(() => {
    setMovies(moviess);
  }, [moviess]);

  console.log(moviess.length);

  const slideLeft = () => {
    var slider = document.getElementById("slider1");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider1");
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  return (
    <section className="md:px-20 px-5 mt-7">
      <h1 className="font-bold text-[#032541] text-left font-mono text-sm  md:text-lg ">
        {id===2 ? `For you: because you watched ${name.split(':')[0]}` : id===1?"Popular Movies":"Your Recommendation"}
      </h1>
      <div className="relative flex items-center group ">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={"slider1"}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies?.map((item, id) => (
            <Movie key={id} item={item} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </section>
  );
};

export default Slider;
