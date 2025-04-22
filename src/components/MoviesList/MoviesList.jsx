import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import s from "./MoviesList.module.css";
import { HiOutlineStar } from "react-icons/hi2";

export default function MoviesList({ movies, onAllImagesLoaded }) {
  const location = useLocation();
  const defaultImg = "https://ranobehub.org/img/ranobe/posters/default.jpg";

  const getImageSrc = (posterPath) =>
    posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : defaultImg;

  useEffect(() => {
    if (movies.length === 0) return;

    let loadedCount = 0;

    movies.forEach((movie) => {
      const img = new Image();
      img.src = getImageSrc(movie.poster_path);

      const onLoadOrError = () => {
        loadedCount++;
        if (loadedCount === movies.length) {
          onAllImagesLoaded();
        }
      };

      img.onload = onLoadOrError;
      img.onerror = onLoadOrError;
    });
  }, [movies, onAllImagesLoaded]);

  return (
    <ul className={s.moviesList}>
      {movies.map((movie) => (
        <li key={movie.id} className={s.moviesItem}>
          <Link
            className={s.link}
            to={`/movies/${movie.id}`}
            state={{ from: location.pathname + location.search }}
          >
            <div className={s.img}>
              <img
                src={getImageSrc(movie.poster_path)}
                alt={`poster ${movie.title}`}
                width={320}
              />
              <p className={s.movieVote}>
                <HiOutlineStar fill="rgb(142, 235, 79)" />{" "}
                {movie.vote_average.toFixed(1)}
              </p>
            </div>
            <h2 className={s.movieTitle}>
              {movie.title} ({movie.release_date.slice(0, 4)})
            </h2>
          </Link>
        </li>
      ))}
    </ul>
  );
}
