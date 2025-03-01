import React, { useState } from "react";
import MovieDetails from "./MovieDetails";
import axios from "axios";
import backdrop from "../assets/backdrop.jpg";

export default function MovieList({
  searching,
  movieDetails,
  searchedMovieDetails,
}) {
  const [showMovieDetailsPopUp, setShowMovieDetailsPopUp] = useState(false);

  const [poster, setPoster] = useState(null);
  const [backdropImg, setBackdropImg] = useState(null);
  const [movieDescription, setMovieDescription] = useState("");
  const [movieName, setMovieName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [castDetails, setCastDetails] = useState([]);
  const [genres, setGenres] = useState([]);
  const [runtime, setRunTime] = useState("");
  const apiKey = import.meta.env.VITE_API_KEY;

  // const getWatchProviders = async (id) => {
  //   const response = await axios.get(
  //     `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=df6870b28b8bac6570172e8933e51d7e`
  //   );
  //   try {
  //     console.log(response.data.results);
  //     console.log(response.data.results.AD.flatrate[0].provider_name);
  //   } catch (error) {
  //     console.log("Error getting movie", error);
  //   }
  // };

  const getCast = async (id) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
    );
    try {
      console.log(response.data.cast);
      setCastDetails(response.data.cast);
    } catch (error) {
      console.log("Error getting movie", error);
    }
  };

  const getGenres = async (id) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
    );
    try {
      console.log("Selected movie responses ", response);
      response.data.runtime < 90 && setRunTime("Short");
      response.data.runtime >= 90 &&
        response.data.runtime < 120 &&
        setRunTime("Medium");
      response.data.runtime >= 120 && setRunTime("Long");
      console.log(response.data.genres);
      setGenres(response.data.genres);
    } catch (error) {
      console.log("Error getting movie Genres", error);
    }
  };

  const getPerticularMovieDetails = (perticularMovie) => {
    handlePopUpDisplay();
    // getWatchProviders(perticularMovie.id);
    getGenres(perticularMovie.id);
    getCast(perticularMovie.id);
    console.log(perticularMovie);
    setBackdropImg(perticularMovie.backdrop_path);
    setPoster(perticularMovie.poster_path);
    setMovieName(perticularMovie.title);
    setMovieDescription(perticularMovie.overview);
    setReleaseDate(perticularMovie.release_date);
  };

  const handlePopUpDisplay = () => {
    setShowMovieDetailsPopUp((prev) => !prev);
  };
  return (
    <>
      {!searching && (
        <div className="all-movies-container">
          {movieDetails.map((movie) => (
            <div key={movie.title} className="movie-details-card">
              <div className="overlay-movie-details">
                <button
                  onClick={() => getPerticularMovieDetails(movie)}
                  className="show-details-btn"
                >
                  Show Details
                </button>
              </div>
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt="poster"
              />
              <p className="movie-name">
                {movie.title.length > 15
                  ? movie.title.substring(0, 22) + "..."
                  : movie.title}
              </p>
              <p className="release">{movie.release_date}</p>
            </div>
          ))}
        </div>
      )}

      {searching && (
        <div className="all-movies-container">
          {searchedMovieDetails.map((movie) => (
            <div key={movie.id} className="movie-details-card">
              <div className="overlay-movie-details">
                <button
                  onClick={() => getPerticularMovieDetails(movie)}
                  className="show-details-btn"
                >
                  Show Details
                </button>
              </div>
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt="poster"
              />
              <p className="movie-name">
                {movie.title.length > 15
                  ? movie.title.substring(0, 22) + "..."
                  : movie.title}
              </p>
              <p className="release">{movie.release_date}</p>
            </div>
          ))}
        </div>
      )}

      <MovieDetails
        showMovieDetailsPopUp={showMovieDetailsPopUp}
        setShowMovieDetailsPopUp={setShowMovieDetailsPopUp}
        poster={poster}
        backdropImg={backdropImg}
        movieDescription={movieDescription}
        movieName={movieName}
        releaseDate={releaseDate}
        castDetails={castDetails}
        genres={genres}
        runtime={runtime}
      />
    </>
  );
}
