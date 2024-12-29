import { Link, useLocation } from "react-router-dom";

export default function MoviesList({ movies }) {
  const location = useLocation();
  return (
    <div>
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={location}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <h2>{movie.title}</h2>
                <p>{movie.vote_average.toFixed(1)}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
