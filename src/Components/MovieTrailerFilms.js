import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./MovieTrailerFilms.css";
const MovieTrailerFilms = (props) => {
  let vide = `https://www.youtube.com/embed/`;
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(3);

  const onIncrement = () => {
    setStart(start + 1);
    setEnd(end + 1);
  };

  const onDecrement = () => {
    setEnd(end - 1);
    setStart(start - 1);
  };

  return (
    <div className="movie-trailer-section-title">
      <h3>{props.mainTitle}</h3>
      <hr></hr>
      <div className="movie-trailer-section">
        <div className="movie-trailer-section-left">
          <Button onClick={() => onDecrement()}>{`<`}</Button>
        </div>
        <div className="movie-trailer-section-mid">
          {props.films.slice(start, end).map((prev) => {
            return (
              <div key={prev.id} className="movie-trailer-section-mid-video">
                <div>
                  <iframe
                    width="350"
                    height="200"
                    src={`${vide}${prev.key}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                  />
                </div>
                <div> {prev.name} </div>
              </div>
            );
          })}
        </div>

        <div>
          <Button onClick={() => onIncrement()}>{">"}</Button>
        </div>
      </div>
    </div>
  );
};

export default MovieTrailerFilms;
