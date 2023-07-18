import React from "react";
import Carousel from "react-bootstrap/Carousel";
// import "./MovieCarousel.css";

export const MovieCarousel = (props) => {
  const openMovieDetail = (id) => {
    // https://moviesgallor.web.app/
    // http://localhost:3000/
    let urlItem = "https://moviesgallor.web.app/catalog/item/" + id;
    window.open(urlItem);
    window.close();
  };

  return (
    <div className="gallery">
      <Carousel>
        {console.log("test")}
        {props.itemInfo.map((item) => {
          var image = item.backImage;

          //   var name = item.productName;
          return (
            <Carousel.Item key={item.id}>
              <img
                src={image}
                alt="First slide"
                onClick={() => openMovieDetail(item.id)}
              />
              <Carousel.Caption>
                <div className="carousel__content">
                  <h3>{item.title}</h3>
                  <p>{item.overview.trim(20)}</p>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};
