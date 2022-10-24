import React from "react";
import Card from "react-bootstrap/Card";
import "./CastCard.css";

const CastCard = (props) => {
  return (
    <div>
      <Card style={{ width: "10rem" }}>
        <Card.Img variant="top" src={props.image} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>Character: {props.character}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CastCard;
