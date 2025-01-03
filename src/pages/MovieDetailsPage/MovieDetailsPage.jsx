import { useEffect, useState, useRef, Suspense } from "react";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { fetchMoviesDetails } from "../../tmdb-api";
import BackLink from "../../components/BackLink/BackLink";
import Loader from "../../components/Loader/Loader";
import s from "./MovieDetailsPage.module.css";
import Error from "../../components/Error/Error";
import { HiOutlineStar } from "react-icons/hi2";

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
    <main className={s.container}>
      <BackLink to={backLinkHref.current} />
      {isLoading && <Loader />}
      {isError && <Error />}
      <div className={s.wrap}>
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
          <p className={s.movieVote}>
            <HiOutlineStar fill="rgb(142, 235, 79)" />{" "}
            {details.vote_average?.toFixed(1)}
          </p>
        </div>
        <div>
          <h1 className={s.title}>{details.title}</h1>

          <ul>
            <li className={s.listItem}>
              <h2 className={s.topic}>Release date</h2>
              <p className={s.dscr}>{details.release_date}</p>
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
