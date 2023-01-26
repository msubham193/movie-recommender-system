import React, {  useState } from "react";
import requests from "../Requests";
import Hero from "./Hero/Hero";
import Loading from "./Loading/Loading";
import Slider from "./Slider/Slider";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [recommendation, setRecommendation] = useState([]);

  let movie = "Avengers";
  movie = localStorage.getItem("movie")
    ? localStorage.getItem("movie")
    : "Avatar";
  const apiKey = "8321fba1bd0a71fd23430a1b4d42bfd9";

  const getRecommendationMovie = (data) => {
    // let counter=16;

    setRecommendation([]);
    for (let movie of data.movies) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movie}`
      ).then((Response) =>
        Response.json().then((data) =>
          setRecommendation((recommendation) => [
            ...recommendation,
            data.results[0],
          ])
        )
      );
      // counter--;
      // if (counter === 0) break;
    }
  };

  React.useEffect(() => {
    let movie = "Avatar";
    movie = localStorage.getItem("movie")
      ? localStorage.getItem("movie")
      : "Avatar";

    fetch("https://movie-recommender-system2.onrender.com/api/movies")
      .then((response) => response.json().then((data) => setMovies(data.arr)))
      .catch((error) => {
        console.log(error);
      });

    if (movie.length === 0) {
      fetch(requests.requestPopular)
        .then((response) =>
          response.json().then((data) => {
            setRecommendation(data.results);
            setLoading(false);
          })
        )
        .catch((error) => console.log(error));
      console.log(recommendation);
    } else {
      fetch(`https://movie-recommender-system2.onrender.com/api/similarity/${movie}`).then((Response) =>
        Response.json()
          .then((data) => {
            getRecommendationMovie(data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          })
      );
    }
  }, [loading, movie]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="md:mt-20 ">
          <Hero movies={movies} />
          <Slider
            moviess={recommendation}
            id={localStorage.getItem("movie") == null ? 1 : 2}
            name={movie}
          />
        </div>
      )}
    </>
  );
};

export default Home;
