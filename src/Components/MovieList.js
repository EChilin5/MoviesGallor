import React, { useState } from "react";
import { Button } from "react-bootstrap";
import CardComponent from "./CardComponent";
import "./MovieList.css";

const MovieList = (props) => {
  // const [movies, setMovies] = useState([]);
  let count = 0;
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(3);

  const incrementCount = () => {
    setStart(start + 1);
    setEnd(end + 1);
    displayCard();
  };

  const decrementCount = () => {
    setStart(start - 1);
    setEnd(end - 1);
    displayCard();
  };

  let status =
    props.userList != null
      ? props.userList.indexOf(props.movieContent.title) > -1
        ? true
        : false
      : false;

  // temp.genre_id.filter((test) => test === props.id)

  const displayCard = () => {
    let filter = props.movieContent;

    return filter.slice(start, end).map((item) => {
      return (
        <div key={count++} className="individual-card">
          <CardComponent item={item} favoriteList={status} />
        </div>
      );
    });
  };

  return (
    <div>
      <h3 className="film-type-name">{props.title}</h3>
      <div className="card-grid">
        <div className="card-grid-left">
          <Button onClick={() => decrementCount()}>{"<"}</Button>
        </div>
        <div className="card-grid-mid">{displayCard()}</div>
        <div className="card-grid-right">
          {" "}
          <Button onClick={() => incrementCount()}>{">"}</Button>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
