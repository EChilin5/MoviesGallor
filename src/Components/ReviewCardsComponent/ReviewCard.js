import React from "react";
import { Button } from "react-bootstrap";
import "./ReviewCard.css";

const ReviewCard = () => {
  return (
    <div className="review-post-display">
      <div className="review-header">
        <div className="review-header-left">
          <div>
            <h4>Review Name</h4>
          </div>
          <div>Review Rating out of 5 </div>
        </div>

        <div className="review-header-right">
          <Button>Upvote</Button> <Button>DownVote</Button>{" "}
          <Button>Edit</Button>
        </div>
      </div>

      <div>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing
      </div>
    </div>
  );
};

export default ReviewCard;
