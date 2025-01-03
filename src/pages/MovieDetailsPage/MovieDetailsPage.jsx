import { useEffect, useState, useRef, Suspense } from "react";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { fetchMoviesDetails } from "../../tmdb-api";
import BackLink from "../../components/BackLink/BackLink";
import Loader from "../../components/Loader/Loader";
import s from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from || "/movies");

  useEffect(() => {
    const fetchDetailsOnMoviePage = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchMoviesDetails(id);
        setDetails(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetailsOnMoviePage();
  }, [id]);

  const defaultImg = "https://ranobehub.org/img/ranobe/posters/default.jpg";

  return (
    <main className={s.main}>
      <BackLink to={backLinkHref.current} />
      {isLoading && <Loader />}
      {isError && <p className={s.errorMsg}>Error, try again, please.</p>}
      <div className={s.container}>
        <div className={s.img}>
          <img
            src={
              details.poster_path
                ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                : defaultImg
            }
            alt={`poster ${details.title}`}
            width={360}
          />
        </div>
        <div>
          <h1 className={s.title}>{details.title}</h1>

          <ul>
            <li className={s.listItem}>
              <h2 className={s.topic}>Release date</h2>
              <p className={s.dscr}>{details.release_date}</p>
            </li>
            <li></li>
            <li className={s.listItem}>
              <h2 className={s.topic}>User Score</h2>
              <p className={s.dscr}>{details.vote_average?.toFixed(1)}</p>
            </li>
            <li className={s.listItem}>
              <h2 className={s.topic}>Overview</h2>
              <p className={s.dscr}>{details.overview}</p>
            </li>
            <li className={s.listItem}>
              <h2 className={s.topic}>Genres</h2>
              <p className={s.dscr}>
                {details.genres?.map((genre) => genre.name).join(" ")}
              </p>
            </li>
            <li className={s.listItem}>
              <h2 className={s.topic}>Original language</h2>
              <p className={s.dscr}>{details.original_language}</p>
            </li>
            <li className={s.listItem}>
              <h2 className={s.topic}>Production countries</h2>
              <p className={s.dscr}>
                {details.production_countries
                  ?.map((country) => country.name)
                  .join(" ")}
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className={s.topicAdd}>Additional information</h2>
        <ul className={s.moreInfoList}>
          <li>
            <Link className={s.more} to="cast">
              Cast
            </Link>
          </li>
          <li>
            <Link className={s.more} to="reviews">
              Reviews
            </Link>
          </li>
          <li>
            <Link className={s.more} to="videos">
              Video
            </Link>
          </li>
        </ul>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </main>
  );
}
