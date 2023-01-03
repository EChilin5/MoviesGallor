import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCatalogList from "../Components/MovieCatalogList";
import Form from "react-bootstrap/Form";

import "./MovieCatalog.css";

const MovieCatalog = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");

  useEffect(() => {
    getPopularMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMovieChangeHandler = (input) => {
    setSearchMovie(input);
  };

  let api = process.env.REACT_APP_MOVIE_API;
  let trendingMovesURL = `https://api.themoviedb.org/3/movie/popular?${api}&page=1`;
  let imageBaseUrl = `https://image.tmdb.org/t/p/w500`;

  const getPopularMovies = () => {
    axios.get(`${trendingMovesURL}`).then((res) => {
      for (var i = 0; i < res.data.results.length; i++) {
        let movie = res.data.results[i];
        let moviData = {
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          genre_id: movie.genre_ids[0],
          release: movie.release_date,
          frontImage: `${imageBaseUrl}` + movie.poster_path,
          backImage: `${imageBaseUrl}` + movie.backdrop_path,
        };
        // console.log(moviData);
        setTopMovies((prev) => {
          return [...prev, moviData];
        });
      }
    });
  };

  return (
    <div className="movie-catalog-page">
      <div className="movie-catalog-input">
        <Form.Control
          type="text"
          placeholder="Search Movie"
          onChange={(event) => onMovieChangeHandler(event.target.value)}
        />
      </div>

      <div>
        <MovieCatalogList movies={topMovies} search={searchMovie} />
      </div>
    </div>
  );
};

export default MovieCatalog;
