import React from "react";
import Form from "react-bootstrap/Form";

export const CatalogFilter = () => {
  return (
    <div>
      <div className="catalog-grid">
        <div className="catalog-searchfield">
          <Form.Label>Rating</Form.Label>
          <Form.Control type="text" placeholder="Enter rating" />
        </div>
        <div className="catalog-searchfield">
          <Form.Label>Year</Form.Label>
          <Form.Control type="text" placeholder="Enter year" />
        </div>
        <div className="catalog-searchfield">
          <Form.Label>Year</Form.Label>
          <Form.Control type="text" placeholder="Enter year" />
        </div>
        <div className="catalog-searchfield">
          <Form.Label>Actor</Form.Label>
          <Form.Control type="text" placeholder="Enter actor" />
        </div>
        <div className="catalog-searchfield">
          <Form.Label>Director</Form.Label>
          <Form.Control type="text" placeholder="Enter director" />
        </div>
      </div>
    </div>
  );
};
