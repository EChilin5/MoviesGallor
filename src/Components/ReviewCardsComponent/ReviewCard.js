import React from "react";
import { Button } from "react-bootstrap";
import "./ReviewCard.css";

const ReviewCard = (props) => {
  return (
    <div className="review-post-display">
      <div className="review-header">
        <div className="review-header-left">
          <div>
            <h4>{props.reviewId}</h4>
          </div>
          <div>{props.rating}</div>
        </div>

        <div className="review-header-right">
          <Button>Upvote</Button> <Button>DownVote</Button>{" "}
          <Button>Edit</Button>
        </div>
      </div>

      <div>{props.description}</div>
    </div>
  );
};

export default ReviewCard;
