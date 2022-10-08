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

  let tempData = [
    { id: 1, name: "Edgar", rating: 5, description: "" },
    { id: 2, name: "Dan", rating: 2, description: "" },
  ];
  const [isLoading, setLoading] = useState(true);
  const [vidLoad, setVidLoad] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [movieInfo, setMovieInfo] = useState();
  const [videoID, setVideoID] = useState([]);
  const [castMem, setCastMem] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);
  const [reviews, setReviews] = useState(tempData);
  let key = process.env.REACT_APP_MOVIE_API;
  let baseUrl = `https://api.themoviedb.org/3/movie/${id}?${key}`;
  let imageBaseUrl = `https://image.tmdb.org/t/p/original`;
  // let vide = `https://www.youtube.com/embed/`;
  let videoUrl = `http://api.themoviedb.org/3/movie/${id}/videos?${key}`;

  let cast = `https://api.themoviedb.org/3/movie/${id}/credits?${key}&language=en-US`;
  let similar = `https://api.themoviedb.org/3/movie/${id}/similar?${key}&page=1`;

  let movieListUrl = `https://localhost:44332/api/MovieFavouriteValues`;
  let imageWidthUrl = `https://image.tmdb.org/t/p/w500`;

  useEffect(() => {
    if (vidLoad === true || isLoading === true) {
      fetchMovieDetails();
      fetchMovieID();
      fetchCastDetails();
      fetchSimilarMovies();
    }
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

  const addNewReview = (reviewInfo) => {
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
  };

  if (isLoading === true || vidLoad === true) {
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
        <h5>Movie Videos</h5>

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
          <div key={reviewInfo.id}>
            <ReviewCard></ReviewCard>
            <hr></hr>
          </div>
        );
      })}

      <ReviewModal
        show={showModal}
        handleClose={closeReviewModal}
        addReview={addNewReview}
      />
    </div>
  );
};
