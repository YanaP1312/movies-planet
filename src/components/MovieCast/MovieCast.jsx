import { useLocation } from "react-router-dom";

export default function MovieCast() {
  const location = useLocation();
  const cast = location.state?.cast || [];
  const defaultImg =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/No_picture_available.png/640px-No_picture_available.png";

  return (
    <ul>
      {cast.length > 0 ? (
        cast.map((item) => (
          <li key={item.id}>
            <img
              src={
                item.profile_path
                  ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                  : defaultImg
              }
              alt={item.name}
            />
            <h2>{item.name}</h2>
            <p>{item.character}</p>
          </li>
        ))
      ) : (
        <p>Sorry, no cast available</p>
      )}
    </ul>
  );
}
