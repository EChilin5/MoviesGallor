import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./MovieList.css";
import axios from "axios";
import Button from "react-bootstrap/Button";

const CardComponent = (props) => {
  const [movieImageHover, setVideoImageHover] = useState(false);
  const [videoID, setVideoID] = useState();
  let id = props.item.id;
  let key = process.env.REACT_APP_MOVIE_API;

  let videoUrl = `http://api.themoviedb.org/3/movie/${id}/videos?${key}`;
  let youtubeBASEURL = `https://www.youtube.com/embed/`;
  let movieListUrl = `https://localhost:44332/api/MovieFavouriteValues`;
  let imageWidthUrl = `https://image.tmdb.org/t/p/w500`;

  //  "https://www.youtube.com/embed/hEnr6Ewpu_U?autoplay=1&mute=1"

  const openMovieDetail = (id) => {
    // https://moviesgallor.web.app/
    // http://localhost:3000/
    let urlItem = "https://moviesgallor.web.app/catalog/item/" + id;
    window.open(urlItem);
    window.close();
  };
  useEffect(() => {
    const fetchMovieID = () => {
      axios.get(`${videoUrl}`).then((res) => {
        let videKey = res.data.results[res.data.results.length - 1].key;
        let finalVideoLink = `${youtubeBASEURL}${videKey}?autoplay=1&mute=1`;
        setVideoID(finalVideoLink);

        // for (var i = res.data.results.length - 1; i >= 0; i--) {
        //   let youtube = res.data.results[i];

        //   console.log(youtube);
        //   setVideoID((prev) => {
        //     return [...prev, youtube];
        //   });
        // }
      });
    };
    fetchMovieID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addFavorite = () => {
    const id = localStorage.getItem("userId");
    if (!props.status) {
      let movieInfo = props.item;
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

  const onMouseEnterHandler = () => {
    setVideoImageHover(true);
  };

  const onMouseLeaveHandler = () => {
    setVideoImageHover(false);
  };
  return (
    <div onClick={() => openMovieDetail(props.item.id)}>
      {movieImageHover === false ? (
        <div>
          <img
            src={props.item.backImage}
            onMouseEnter={() => onMouseEnterHandler()}
            onMouseLeave={() => onMouseLeaveHandler()}
            alt=""
          ></img>

          <Card.Body>
            <Card.Title>{props.item.title}</Card.Title>
            <h6>{props.item.release}</h6>
          </Card.Body>
          <Button onClick={() => addFavorite()}>Add Favorite</Button>
        </div>
      ) : (
        <div
          className="card-video-section"
          onMouseLeave={() => onMouseLeaveHandler()}
        >
          <iframe
            src={videoID}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={props.item.title}
          />
          <div className="card-video-section-details">
            <Card.Body>
              <Card.Title>{props.item.title}</Card.Title>
              <h5>{props.item.release}</h5>
            </Card.Body>
            <Button>Add </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardComponent;
