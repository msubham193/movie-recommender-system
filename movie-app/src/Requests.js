const key = process.env.MOVIE_API_KEY;

const requests = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=8321fba1bd0a71fd23430a1b4d42bfd9&language=en-US&page=1`,
  requestSearch:`​https://api.themoviedb.org/3/search/movie?api_key=8321fba1bd0a71fd23430a1b4d42bfd9&language=en-US&page=1&query=`
};

console.log(key);

export default requests;
