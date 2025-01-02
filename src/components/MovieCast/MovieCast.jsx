import { useLocation } from "react-router-dom";
import s from "./MovieCast.module.css";

export default function MovieCast() {
  const location = useLocation();
  const cast = location.state?.cast || [];
  const defaultImg =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/No_picture_available.png/640px-No_picture_available.png";

  return (
    <ul className={s.cast}>
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
              />
            </div>
            <h2 className={s.topic}>{item.name}</h2>
            <p className={s.dscr}>{item.character}</p>
          </li>
        ))
      ) : (
        <p className={s.errorMsg}>Sorry, no cast available</p>
      )}
    </ul>
  );
}
