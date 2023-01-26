import React, { useState } from "react";
import {  useParams } from "react-router-dom";
import { BsPlayFill } from "react-icons/bs";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import Slider from "./Slider/Slider";
import Loading from "./Loading/Loading";
import ReactPlayer from "react-player";

import { MdOutlineClose } from "react-icons/md";

const MovieDetails = () => {
 
  let { id } = useParams();
  console.log(id);

  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);

  const [video, setVideo] = useState([]);

  const [playTrailer, setPlayTrailer] = useState(false);

  const apiKey = "8321fba1bd0a71fd23430a1b4d42bfd9";
  const [recommendation, setRecommendation] = useState([]);

  const gotVideo = (data) => {
    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );

      setVideo(trailer ? trailer : data.videos.results[0]);
    }
  };

  console.log(video);

  const getRecommendationMovie = (data) => {
    setRecommendation([]);
    for (let movie of data.movies) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=8321fba1bd0a71fd23430a1b4d42bfd9&query=${movie}`
      ).then((Response) =>
        Response.json().then((data) =>
          setRecommendation((recommendation) => [
            ...recommendation,
            data.results[0],
          ])
        )
      );
    }
  };

  React.useEffect(() => {
    const setMoviedata = (apidata) => {
      const realMovieData = apidata.results[0];
      console.log(realMovieData.id);

      fetch(
        `https://api.themoviedb.org/3/movie/${realMovieData.id}?api_key=${apiKey}&append_to_response=videos`
      ).then((Response) => Response.json().then((data) => gotVideo(data)));

      fetch(
        `https://api.themoviedb.org/3/movie/${realMovieData.id}?api_key=8321fba1bd0a71fd23430a1b4d42bfd9&language=en-US`
      ).then((Response) => {
        Response.json().then((data) => {
          setMovie(data);
        });
      });
    };

    if (playTrailer) {
    }

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${id}`
    )
      .then((Response) => Response.json().then((data) => setMoviedata(data)))
      .catch((err) => console.log(err));

    fetch(
      `https://movie-recommender-system2.onrender.com/api/similarity/${id}`
    ).then((Response) =>
      Response.json()
        .then((data) => {
          getRecommendationMovie(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        })
    );
  }, [id, playTrailer]);

  let genres = "";

  for (let i = 0; i < movie?.genres.length; i++) {
    if (i !== 0) genres = genres + "," + movie?.genres[i].name;
    else genres = genres + movie?.genres[i].name;
  }

  genres = genres + " ⭐️ " + movie?.runtime + "m";
  const percentage = Math.round((movie?.vote_average * 100) / 10);
  console.log(video);

  // console.log(movie?.backdrop_path);''

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className=" mt-16  w-full relative">
          <div className=" h-[350px]  block   md:hidden  mt-20">
            <img
              className="object-cover brightness-50 h-full  w-full  bg-no-repeat "
              alt=""
              src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
            />

            <div className="top-3   absolute h-24  md:flex gap-7 flex-row">
              <div className="text-white text-start  ">
                {video && playTrailer ? (
                  <div className="w-[100%] h-full">
                    {/* <ReactPlayer
                      className="w-full"
                      url={`https://www.youtube.com/watch?v=${video.key}-U`}
                      playing={true}
                      controls={true}
                    /> */}
                    <button
                      className="h-10 w-10 bg-red-600 flex hover:bg-red-800 mt-2 justify-center items-center rounded-md "
                      onClick={() => {
                        setPlayTrailer(false);
                      }}
                    >
                      <MdOutlineClose className="font-bold h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <div className=" p-5 h-full">
                    <h1 className="text-xl tracking-wider  font-bold">
                      {movie?.original_title.split(":")[0] +
                        ` (${movie?.release_date.slice(0, 4)})`}
                    </h1>
                    <h1 className="font-thin tracking-wider text-sm  ">
                      {genres}
                    </h1>

                    <div className="flex gap-10 items-center mt-5 ">
                      <div className="h-10 w-10 ">
                        <CircularProgressbar
                          value={percentage}
                          text={`${percentage}%`}
                          background
                          backgroundPadding={6}
                          styles={buildStyles({
                            backgroundColor: "#081C22",
                            textColor: "#fff",
                            pathColor: "#21D07A",
                            trailColor: "transparent",
                          })}
                        />
                      </div>
                      <a
                        href={`https://www.youtube.com/watch?v=${video.key}-U`}
                        className="items-center h-6 text-xs bg-red-700 hover:bg-red-900 flex py-3 px-2 gap-x-1 rounded-md"
                        onClick={() => {
                          localStorage.setItem("movie", id);
                        }}
                      >
                        <BsPlayFill />
                        Watch Clips
                      </a>
                    </div>
                    <p className="tracking-widest font-[100] text-sm mt-3 ">
                      {movie?.tagline}
                    </p>
                    <div className="sm:hidden mt-2">
                      <h1 className="font-bold tracking-wide">Overview</h1>
                      <p className=" font-[100] text-xs">
                        {movie?.overview.slice(0, 200)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="  md:block hidden md:h-[600px] ">
            <img
              className="object-cover brightness-50 h-full  w-full mt-20 bg-no-repeat "
              alt=""
              src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
            />

            <div className=" hidden   top-20  absolute h-[400px] left-40 md:flex gap-7 flex-row">
              <img
                className="h-full"
                src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                alt=""
              />

              <div className="text-white text-start">
                {video && playTrailer ? (
                  <>
                    <ReactPlayer
                      className=""
                      url={`https://www.youtube.com/watch?v=${video.key}-U`}
                      width="200%"
                      playing={true}
                      controls={true}
                      height="100%"
                    />
                    <button
                      className="h-10 w-10 bg-red-600 flex hover:bg-red-800 mt-2 justify-center items-center rounded-md "
                      onClick={() => {
                        setPlayTrailer(false);
                      }}
                    >
                      <MdOutlineClose className="font-bold h-5 w-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <h1 className="text-3xl tracking-wider mt-10 font-bold">
                      {movie?.original_title.split(":")[0] +
                        ` (${movie?.release_date.slice(0, 4)})`}
                    </h1>
                    <h1 className="font-thin tracking-wider text-lg  ">
                      {genres}
                    </h1>

                    <div className="flex gap-10 items-center mt-5 ">
                      <div className="h-16 w-16 ">
                        <CircularProgressbar
                          value={percentage}
                          text={`${percentage}%`}
                          background
                          backgroundPadding={6}
                          styles={buildStyles({
                            backgroundColor: "#081C22",
                            textColor: "#fff",
                            pathColor: "#21D07A",
                            trailColor: "transparent",
                          })}
                        />
                      </div>
                      <button
                        className="items-center h-6 bg-red-700 hover:bg-red-900 flex py-4 px-2 gap-x-1 rounded-md"
                        onClick={() => {
                          setPlayTrailer(true);
                          localStorage.setItem("movie", id);
                        }}
                      >
                        <BsPlayFill />
                        Watch Clips
                      </button>
                    </div>
                    <p className="tracking-widest font-[100] text-base mt-5 ">
                      {movie?.tagline}
                    </p>
                    <div className="mt-5">
                      <h1 className="font-bold tracking-wide">Overview</h1>
                      <p className=" font-[100] text-base">
                        {movie?.overview.slice(0, 200)}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className=" hidden md:hidden absolute h-[200px] w-[50%] top-20 text-white">
              <img
                className="h-full w-full"
                src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                alt=""
              />
            </div>
          </div>

          <Slider moviess={recommendation} />
        </section>
      )}
    </>
  );
};

export default MovieDetails;
