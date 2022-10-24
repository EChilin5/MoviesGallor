import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import CastCard from "./CastCard";
import "./CastList.css";

const CastList = (props) => {
  let imageBaseUrl = `https://image.tmdb.org/t/p/original`;
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(6);
  const onIncrement = () => {
    setStart(start + 1);
    setEnd(end + 1);
  };
  const onDecrement = () => {
    setStart(start - 1);
    setEnd(end - 1);
  };

  return (
    <div>
      <h3 className="cast-list-title">Actors</h3>
      <div className="actors-section">
        <div className="actors-section-left">
          <Button onClick={() => onDecrement()}>{`<`}</Button>
        </div>
        <div className="actors-section-mid">
          {props.actors.slice(start, end).map((actor) => {
            console.log(actor.id);
            return (
              <div key={actor.id} className="actor-card">
                {" "}
                <CastCard
                  name={actor.name}
                  character={actor.character}
                  image={`${imageBaseUrl}${actor.profile_path}`}
                />
              </div>
            );
          })}
        </div>
        <div className="actors-section-right">
          <Button onClick={() => onIncrement()}>{`>`}</Button>{" "}
        </div>
      </div>
    </div>
  );
};

export default CastList;
