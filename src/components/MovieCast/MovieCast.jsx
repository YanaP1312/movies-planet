import { useLocation } from "react-router-dom";

export default function MovieCast() {
  const location = useLocation();
  const cast = location.state?.cast || [];

  return (
    <ul>
      {cast.length > 0 ? (
        cast.map((item) => (
          <li key={item.id}>
            <img src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} />
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
