import { Link, useLocation } from "react-router-dom";

export default function MoviesList({ movies }) {
  const location = useLocation();
  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";
  return (
    <div>
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <Link
                to={`/movies/${movie.id}`}
                state={{ from: location.pathname + location.search }}
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : defaultImg
                  }
                  alt={`poster ${movie.title}`}
                  width={250}
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
