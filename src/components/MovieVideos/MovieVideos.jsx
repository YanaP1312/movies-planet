import { useLocation } from "react-router-dom";
import s from "./MovieVideos.module.css";

export default function MovieVideo() {
  const location = useLocation();
  const videos = location.state?.videos || [];
  const firstYouTubeVideo = videos.find(
    (video) => video.site === "YouTube" && video.type === "Teaser"
  );

  return (
    <div className={s.container}>
      {firstYouTubeVideo ? (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${firstYouTubeVideo.key}`}
          title={firstYouTubeVideo.name}
          allowFullScreen
        ></iframe>
      ) : (
        <p className={s.errorMsg}>Sorry, no video yet</p>
      )}
    </div>
  );
}
