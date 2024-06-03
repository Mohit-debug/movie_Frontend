import { NavLink, useParams } from "react-router-dom";
import 'tailwindcss/tailwind.css';
import useFetch from "./useFetch";

const SingleMovie = () => {
  const { id } = useParams();
  console.log({id});

  const { isLoading, movie, isError } = useFetch(`&i=${id}`);
  console.log({movie});

  if (isLoading) {
    return (
      <section className="movie-section bg-black">
        <div className="loading">Loading....</div>;
      </section>
    );
  }

  return (
    <section className="movie-section"
        style={{ backgroundImage: `url(${movie.Poster})`,
        backgroundSize: '100% auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center' }}>
      <div className="movie-card bg-white bg-opacity-80 ">
        <figure>
          <img src={movie.Poster} alt="" />
        </figure>
        <div className="card-content">
          <p className="title">{movie.Title}</p>
          <p className=""></p>
          <p className="card-text">{movie.Released}</p>
          <p className="card-text">{movie.Genre}</p>
          <p className="card-text">{movie.imdbRating} / 10</p>
          <p className="card-text">{movie.Country}</p>
        </div>
      </div>
    </section>
  );
};

export default SingleMovie;