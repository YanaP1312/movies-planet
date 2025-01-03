import { useParams } from "react-router-dom";
import s from "./MovieCast.module.css";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { fetchMoviesDetails } from "../../tmdb-api";
import Error from "../Error/Error";
import EmptyArr from "../EmptyArr/EmptyArr";

export default function MovieCast() {
  const { id } = useParams();
  const [cast, setCast] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const defaultImg =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/No_picture_available.png/640px-No_picture_available.png";

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchMoviesDetails(id, "credits");
        setCast(data.credits.cast);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCast();
  }, [id]);

  return (
    <ul className={s.cast}>
      {isLoading && <Loader />}
      {isError && <Error />}
      {cast.length > 0 ? (
        cast.map((item) => (
          <li key={item.id} className={s.castItem}>
            <div>
              <img
                src={
                  item.profile_path
                    ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                    : defaultImg
                }
                alt={item.name}
                width={280}
              />
            </div>
            <h2 className={s.topic}>{item.name}</h2>
            <p className={s.dscr}>{item.character}</p>
          </li>
        ))
      ) : (
        <EmptyArr children="cast info" />
      )}
    </ul>
  );
}
