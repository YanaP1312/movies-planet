import { useLocation } from "react-router-dom";

export default function MovieCast() {
  const location = useLocation();
  const cast = location.state?.cast || [];
  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

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
