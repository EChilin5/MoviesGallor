import React from "react";
import "./TrailerCard.css";
const TrailerCard = (props) => {
  return (
    <div>
      <div className="movie-trailer-film-iframe">
        <iframe
          src={props.link}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
      <div className="trailer-subtitle"> {props.name} </div>
    </div>
  );
};

export default TrailerCard;
