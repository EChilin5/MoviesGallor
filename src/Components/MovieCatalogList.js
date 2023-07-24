import React from "react";
// import "./MovieCatalog.css";

const MovieCatalogList = (props) => {
  const openMovieDetail = (id) => {
    let urlItem = "http://localhost:3000/catalog/item/" + id;
    window.open(urlItem);
    window.close();
  };

  const movieContent = () => {
    let search = props.search.toLowerCase();
    let movieInfo;

    if (search.length > 0) {
      movieInfo = props.movies.filter((film) =>
        film.title.toLowerCase().includes(search)
      );
    } else {
      movieInfo = props.movies;
    }

    return movieInfo.map((film) => {
      return (
        <div key={film.id} className="movie-catalog-item">
          <img
            src={film.backImage}
            alt=""
            onClick={() => openMovieDetail(film.id)}
          />
          <h5>{film.title}</h5>
        </div>
      );
    });
  };

  return <div className="grid-movie-catalog-container">{movieContent()}</div>;
};

export default MovieCatalogList;
