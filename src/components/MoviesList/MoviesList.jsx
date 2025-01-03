import { Link, useLocation } from "react-router-dom";
import s from "./MoviesList.module.css";
import { HiOutlineStar } from "react-icons/hi2";

export default function MoviesList({ movies }) {
  const location = useLocation();
  const defaultImg = "https://ranobehub.org/img/ranobe/posters/default.jpg";
  return (
    <div>
      <ul className={s.moviesList}>
        {movies.map((movie) => {
          return (
            <li key={movie.id} className={s.moviesItem}>
              <Link
                className={s.link}
                to={`/movies/${movie.id}`}
                state={{ from: location.pathname + location.search }}
              >
                <div className={s.img}>
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : defaultImg
                    }
                    alt={`poster ${movie.title}`}
                    width={320}
                  />
                  <p className={s.movieVote}>
                    <HiOutlineStar fill="rgb(142, 235, 79)" />{" "}
                    {movie.vote_average.toFixed(1)}
                  </p>
                </div>

                <h2 className={s.movieTitle}>{movie.title}</h2>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
