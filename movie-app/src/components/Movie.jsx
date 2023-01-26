import React from "react";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Movie = ({ item }) => {
  // const [like, setLike] = useState(false);
  // const [saved, setSaved] = useState(false);

  // console.log(item);

  let navigate = useNavigate();

  return (
    <button
      className="sm:w-[90px] h-64   md:w-[240px] lg:w-[180px] inline-block cursor-pointer relative p-2 "
      onClick={() => navigate(`/movie/${item?.original_title}`)}
    >
      <img
        className="w-full h-full block object-cover rounded-lg "
        src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
     alt=""
      />

      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/60 opacity-0 hover:opacity-100 text-white">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          {item?.title}
        </p>
{/* 
        <p>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </p> */}
      </div>
    </button>
  );
};

export default Movie;
