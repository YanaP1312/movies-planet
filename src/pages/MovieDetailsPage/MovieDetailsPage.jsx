import { useEffect, useState } from "react";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { fetchMoviesDetails } from "../../tmdb-api";
import BackLink from "../../components/BackLink/BackLink";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchDetailsOnMoviePage = async () => {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchMoviesDetails(id, "credits,reviews");
        setDetails(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailsOnMoviePage();
  }, [id]);

  const backLinkHref = location.state ?? "/movies";

  return (
    <main>
      <BackLink to={backLinkHref} />
      {loading && <p>Loading...</p>}
      {error && <p>Error, try again, please.</p>}
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
          alt={details.title}
        />
        <h1>{details.title}</h1>

        <ul>
          <li>
            <h2>Release date</h2>
            <p>{details.release_date}</p>
          </li>
          <li></li>
          <li>
            <h2>User Score</h2>
            <p>{details.vote_average?.toFixed(1)}</p>
          </li>
          <li>
            <h2>Overview</h2>
            <p>{details.overview}</p>
          </li>
          <li>
            <h2>Genres</h2>
            <p>{details.genres?.map((genre) => genre.name).join(" ")}</p>
          </li>
          <li>
            <h2>Original language</h2>
            <p>{details.original_language}</p>
          </li>
          <li>
            <h2>Production countries</h2>
            <p>
              {details.production_countries
                ?.map((country) => country.name)
                .join(" ")}
            </p>
          </li>
        </ul>
      </div>

      <div>
        <p>Additional information</p>
        <ul>
          <li>
            <Link to="cast" state={{ cast: details.credits?.cast }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ reviews: details.reviews?.results }}>
              Reviews
            </Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </main>
  );
}
