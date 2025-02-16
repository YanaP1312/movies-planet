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
  const [imagesLoaded, setImagesLoaded] = useState(false);

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

  const getImageSrc = (profile_path) =>
    profile_path
      ? `https://image.tmdb.org/t/p/w500${profile_path}`
      : defaultImg;

  useEffect(() => {
    if (cast.length === 0) return;
    let loadedCount = 0;
    cast.forEach((actor) => {
      const img = new Image();
      img.src = getImageSrc(actor.profile_path);
      img.onload = () => {
        loadedCount += 1;
        if (loadedCount === cast.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount += 1;
        if (loadedCount === cast.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, [cast]);

  return (
    <ul className={s.cast}>
      {isLoading && <Loader />}
      {isError && <Error />}
      {cast.length < 0 && <EmptyArr children="cast info" />}
      {cast.length > 0 &&
        imagesLoaded &&
        cast.map((item) => (
          <li key={item.id} className={s.castItem}>
            <div>
              <img
                src={getImageSrc(item.profile_path)}
                alt={item.name}
                width={150}
              />
            </div>
            <h2 className={s.topic}>{item.name}</h2>
            <p className={s.dscr}>{item.character}</p>
          </li>
        ))}
    </ul>
  );
}
