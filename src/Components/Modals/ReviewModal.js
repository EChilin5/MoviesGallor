import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const ReviewModal = (props) => {
  const [userRating, setNewRating] = useState();
  const [desc, setDesc] = useState();

  const onSaveReview = () => {
    let filmId = props.movieId;
    let reviewInfo = {
      id: 0,
      name: "testing",
      rating: userRating,
      description: desc,
      movieId: filmId,
    };
    console.log(reviewInfo);
    props.addReview(reviewInfo);
    props.handleClose();
  };

  const onRatingChangeHandler = (rating) => {
    setNewRating(rating);
  };

  const onDescChangeHandler = (userDesc) => {
    setDesc(userDesc);
  };

  return (
    <div>
      <Modal show={props.show} onHide={() => props.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Review by user 01</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter rating out of 5"
            onChange={(event) => onRatingChangeHandler(event.target.value)}
            max="5"
            min="0"
          />
          <Form.Label>Your Review</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Type your Review"
            onChange={(event) => onDescChangeHandler(event.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.handleClose()}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => onSaveReview()}>
            Post Review
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReviewModal;
