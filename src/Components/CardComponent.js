import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./MovieList.css";
import axios from "axios";

const CardComponent = (props) => {
  const [movieImageHover, setVideoImageHover] = useState(false);
  const [videoID, setVideoID] = useState();
  let id = props.item.id;
  let key = process.env.REACT_APP_MOVIE_API;

  let videoUrl = `http://api.themoviedb.org/3/movie/${id}/videos?${key}`;
  let youtubeBASEURL = `https://www.youtube.com/embed/`;

  //  "https://www.youtube.com/embed/hEnr6Ewpu_U?autoplay=1&mute=1"

  const openMovieDetail = (id) => {
    let urlItem = "http://localhost:3000/catalog/item/" + id;
    window.open(urlItem);
    window.close();
  };
  useEffect(() => {
    fetchMovieID();
  }, []);

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

  const onMouseEnterHandler = () => {
    setVideoImageHover(true);
  };

  const onMouseLeaveHandler = () => {
    setVideoImageHover(false);
  };
  return (
    <div
      onMouseEnter={() => onMouseEnterHandler()}
      onMouseLeave={() => onMouseLeaveHandler()}
      onClick={() => openMovieDetail(props.item.id)}
    >
      {movieImageHover === false ? (
        <div>
          <img
            src={props.item.backImage}
            onClick={() => openMovieDetail(props.item.id)}
            alt=""
          ></img>

          <Card.Body>
            <Card.Title>{props.item.title}</Card.Title>
            <h4>{props.item.release}</h4>
          </Card.Body>
        </div>
      ) : (
        <div>
          <iframe
            src={videoID}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
            width="100%"
            height="inherit"
          />
          <Card.Body>
            <Card.Title>{props.item.title}</Card.Title>
            <h4>{props.item.release}</h4>
          </Card.Body>
        </div>
      )}
    </div>
  );
};

export default CardComponent;
