import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ItemDetail.css";
import MovieTrailerFilms from "./MovieTrailerFilms";
import CastList from "./CastList";
import MovieList from "./MovieList";
import { Button } from "react-bootstrap";
import ReviewModal from "./Modals/ReviewModal";
import ReviewCard from "./ReviewCardsComponent/ReviewCard";

export const ItemDetail = () => {
  let { id } = useParams();
  let counter = 0;

  console.log(id);

  const [isLoading, setLoading] = useState(true);
  const [vidLoad, setVidLoad] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [movieInfo, setMovieInfo] = useState();
  const [videoID, setVideoID] = useState([]);
  const [castMem, setCastMem] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [yourMovieName, setYourMovieNames] = useState([]);
  let key = process.env.REACT_APP_MOVIE_API;
  let baseUrl = `https://api.themoviedb.org/3/movie/${id}?${key}`;
  let imageBaseUrl = `https://image.tmdb.org/t/p/original`;
  // let vide = `https://www.youtube.com/embed/`;
  let videoUrl = `http://api.themoviedb.org/3/movie/${id}/videos?${key}`;

  let cast = `https://api.themoviedb.org/3/movie/${id}/credits?${key}&language=en-US`;
  let similar = `https://api.themoviedb.org/3/movie/${id}/similar?${key}&page=1`;

  let movieListUrl = `https://localhost:44332/api/MovieFavouriteValues`;
  let imageWidthUrl = `https://image.tmdb.org/t/p/w500`;

  let reviewUrl = `https://localhost:44332/api/ReviewValues
  `;

  useEffect(() => {
    if (vidLoad === true || isLoading === true) {
      fetchMovieDetails();
      fetchMovieID();
      fetchCastDetails();
      fetchSimilarMovies();
      getYourMovieList();
      // getUserReviews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMovieDetails = () => {
    axios.get(`${baseUrl}`).then((res) => {
      console.log(res.data);
      setMovieInfo(res.data);
      setLoading(false);
    });
  };

  const fetchCastDetails = () => {
    axios.get(`${cast}`).then((res) => {
      for (var i = 0; i < res.data.cast.length; i++) {
        let castInfo = res.data.cast[i];
        setCastMem((pre) => {
          return [...pre, castInfo];
        });
      }
    });
  };

  const fetchMovieID = () => {
    axios.get(`${videoUrl}`).then((res) => {
      for (var i = res.data.results.length - 1; i >= 0; i--) {
        let youtube = res.data.results[i];

        setVideoID((prev) => {
          return [...prev, youtube];
        });
      }
      setVidLoad(false);
    });
  };

  const fetchSimilarMovies = () => {
    axios.get(`${similar}`).then((res) => {
      for (var i = 0; i < res.data.results.length; i++) {
        let movie = res.data.results[i];

        let moviData = {
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          genre_id: movie.genre_ids,
          release: movie.release_date,
          frontImage: `${imageWidthUrl}` + movie.poster_path,
          backImage: `${imageWidthUrl}` + movie.backdrop_path,
        };
        setSimilarMovie((prev) => {
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
        setYourMovieNames((prev) => {
          return [...prev, movie.title];
        });
      }
    });
  };

  // const getUserReviews = () => {
  //   let film = movieInfo.id;
  //   axios.put(`${reviewUrl}`, { movieId: film }).then((res) => {
  //     for (var i = 0; i < res.data.length; i++) {
  //       let userReview = res.data[i];
  //       setReviews((prev) => {
  //         return [...prev, userReview];
  //       });
  //     }
  //   });
  // };

  const addNewReview = (reviewInfo) => {
    axios
      .post(`${reviewUrl}`, {
        name: reviewInfo.name,
        rating: reviewInfo.rating,
        description: reviewInfo.description,
        movieId: reviewInfo.movieId,
      })
      .then((res) => {
        console.log(res.data);
      });
    reviewInfo.id = reviewInfo.length;
    setReviews((prev) => {
      return [...prev, reviewInfo];
    });
  };

  const openReviewModal = () => {
    setShowModal(true);
  };
  const closeReviewModal = () => {
    setShowModal(false);
  };

  const addFavorite = () => {
    const id = localStorage.getItem("userId");
    if (!(yourMovieName.indexOf(movieInfo.title) > -1)) {
      axios
        .post(`${movieListUrl}`, {
          originalMovieId: Number(movieInfo.id),
          title: movieInfo.title,
          overview: movieInfo.overview,
          genre_id: movieInfo.genres[0].id,
          release: movieInfo.release_date,
          frontImage: `${imageWidthUrl}` + movieInfo.poster_path,
          backImage: `${imageWidthUrl}` + movieInfo.backdrop_path,
          userId: id,
        })
        .then((res) => {
          console.log(res.data);
          console.log("hello");
        });
    } else {
      alert("Already exist");
    }
  };

  if (isLoading === true || vidLoad === true) {
    //  getUserReviews();

    return <div className="App">Loading...</div>;
  }

  let features = videoID.filter((mType) => mType.type === "Featurette");

  return (
    <div>
      <div>
        <div className="movie-section-one">
          <div className="movie-section-one-left">
            <img src={`${imageBaseUrl}` + movieInfo.poster_path} alt="" />
          </div>
          <div className="movie-section-one-right">
            <h1>{movieInfo.title}</h1>
            <div className="movie-topics-information">
              {movieInfo.genres.map((genre) => {
                return (
                  <div className="movie-genre-header" key={counter++}>
                    {" "}
                    {genre.name},{" "}
                  </div>
                );
              })}{" "}
              {movieInfo.runtime + " "} mins
              {" " + movieInfo.release_date}
            </div>
            <div className="movie-section-actions">
              <Button onClick={() => addFavorite()}>Add to List</Button>
              <Button onClick={() => openReviewModal()}>Review</Button>
            </div>

            <h4>{movieInfo.tagline}</h4>
            <h5>Status: {movieInfo.status}</h5>
            <h5>Overview</h5>
            {movieInfo.overview}
          </div>
        </div>
      </div>

      <div className="movie-cast-actors">
        <CastList
          actors={castMem.filter(
            (cast) => cast.known_for_department === "Acting"
          )}
        />
      </div>

      <div className="movie-trailer-list">
        <MovieTrailerFilms
          mainTitle="Trailers"
          films={videoID.filter((mType) => mType.type === "Trailer")}
        />

        {features.length === 0 ? (
          ""
        ) : (
          <MovieTrailerFilms
            mainTitle="Features"
            films={videoID.filter((mType) => mType.type === "Featurette")}
          />
        )}
      </div>

      <div>
        <MovieList title="Similar Movies" movieContent={similarMovie} />
      </div>

      {reviews.map((reviewInfo) => {
        return (
          <div key={reviewInfo.reviewId}>
            <ReviewCard review={reviewInfo}></ReviewCard>
            <hr></hr>
          </div>
        );
      })}

      <ReviewModal
        show={showModal}
        handleClose={closeReviewModal}
        movieId={movieInfo.id}
        addReview={addNewReview}
      />
    </div>
  );
};
