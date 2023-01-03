import React, { useEffect, useState } from "react";
import { MovieCarousel } from "../Components/MovieCarousel";
import MovieList from "../Components/MovieList";
import axios from "axios";

export const HomePage = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [yourMovies, setYourMovies] = useState([]);
  const [yourMovieName, setYourMoviesName] = useState([]);
  let api = process.env.REACT_APP_MOVIE_API;

  // let genre = [
  //   {
  //     id: 28,
  //     name: "Action",
  //   },
  //   {
  //     id: 12,
  //     name: "Adventure",
  //   },
  //   {
  //     id: 16,
  //     name: "Animation",
  //   },
  //   {
  //     id: 35,
  //     name: "Comedy",
  //   },
  //   {
  //     id: 80,
  //     name: "Crime",
  //   },
  //   {
  //     id: 99,
  //     name: "Documentary",
  //   },
  //   {
  //     id: 18,
  //     name: "Drama",
  //   },
  //   {
  //     id: 10751,
  //     name: "Family",
  //   },
  //   {
  //     id: 14,
  //     name: "Fantasy",
  //   },
  //   {
  //     id: 36,
  //     name: "History",
  //   },
  //   {
  //     id: 27,
  //     name: "Horror",
  //   },
  //   {
  //     id: 10402,
  //     name: "Music",
  //   },
  //   {
  //     id: 9648,
  //     name: "Mystery",
  //   },
  //   {
  //     id: 10749,
  //     name: "Romance",
  //   },
  //   {
  //     id: 878,
  //     name: "Science Fiction",
  //   },
  //   {
  //     id: 10770,
  //     name: "TV Movie",
  //   },
  //   {
  //     id: 53,
  //     name: "Thriller",
  //   },
  //   {
  //     id: 10752,
  //     name: "War",
  //   },
  //   {
  //     id: 37,
  //     name: "Western",
  //   },
  // ];

  let movieListUrl = `https://localhost:44332/api/MovieFavouriteValues`;
  let trendingMovesURL = `https://api.themoviedb.org/3/movie/popular?${api}&page=1`;
  let imageBaseUrl = `https://image.tmdb.org/t/p/w500`;

  useEffect(() => {
    getPopularMovies();
    getYourMovieList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPopularMovies = () => {
    axios.get(`${trendingMovesURL}`).then((res) => {
      for (var i = 0; i < res.data.results.length; i++) {
        let movie = res.data.results[i];

        let moviData = {
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          genre_id: movie.genre_ids,
          release: movie.release_date,
          frontImage: `${imageBaseUrl}` + movie.poster_path,
          backImage: `${imageBaseUrl}` + movie.backdrop_path,
        };
        setTopMovies((prev) => {
          return [...prev, moviData];
        });
      }
    });
  };

  const getYourMovieList = () => {
    const id = localStorage.getItem("userId");

    axios.put(`${movieListUrl}`, { userId: id }).then((res) => {
      console.log(res.data);
      for (var i = 0; i < res.data.length; i++) {
        let movie = res.data[i];

        let moviData = {
          id: movie.originalMovieId,
          title: movie.title,
          overview: movie.overview,
          genre_id: movie.genre_id,
          release: movie.release,
          frontImage: movie.frontImage,
          backImage: movie.backImage,
        };

        console.log(moviData);

        setYourMovies((prev) => {
          return [...prev, moviData];
        });
        setYourMoviesName((prev) => {
          return [...prev, moviData.title];
        });
      }
    });
  };

  const sortMovies = (id) => {
    let filter = topMovies;
    let movies = [];

    for (var i = 0; i < filter.length; i++) {
      let movieItem = filter[i];

      for (var j = 0; j < movieItem.genre_id.length; j++) {
        let temp = movieItem.genre_id[j];
        if (temp === id) {
          movies = [...movies, movieItem];
          break;
        }
      }
    }

    return movies;
  };

  const animationFilms = sortMovies(16);
  const actionFilms = sortMovies(28);
  const fantasyFilm = sortMovies(14);
  const comedyFilm = sortMovies(35);

  return (
    <div className="homePage">
      <div>
        <MovieCarousel itemInfo={topMovies.slice(0, 10)} />
      </div>
      {yourMovies.length === 0 ? (
        ""
      ) : (
        <div>
          {" "}
          <div>
            <MovieList
              title="Your MovieList"
              movieContent={yourMovies}
              id={16}
              userList={yourMovieName}
            />
          </div>
        </div>
      )}

      {animationFilms.length === 0 ? (
        ""
      ) : (
        <div>
          <MovieList
            title="Animation"
            movieContent={animationFilms}
            id={16}
            userList={yourMovieName}
          />
        </div>
      )}

      {actionFilms.length === 0 ? (
        ""
      ) : (
        <div>
          <MovieList
            title="Action"
            movieContent={actionFilms}
            id={28}
            userList={yourMovieName}
          />
        </div>
      )}

      {fantasyFilm.length === 0 ? (
        ""
      ) : (
        <div>
          <MovieList
            title="Fantasy"
            movieContent={fantasyFilm}
            id={14}
            userList={yourMovieName}
          />
        </div>
      )}

      {comedyFilm.length === 0 ? (
        ""
      ) : (
        <div>
          <MovieList
            title="Comedy"
            movieContent={comedyFilm}
            id={35}
            userList={yourMovieName}
          />
        </div>
      )}
    </div>
  );
};
