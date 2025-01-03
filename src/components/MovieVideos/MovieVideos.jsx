import { useParams } from "react-router-dom";
import s from "./MovieVideos.module.css";
import { useState, useEffect } from "react";
import { fetchMoviesDetails } from "../../tmdb-api";
import Loader from "../Loader/Loader";

export default function MovieVideo() {
  const { id } = useParams();
  const [video, setVideo] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchMoviesDetails(id, "videos");
        setVideo(
          data.videos.results.find(
            (video) => video.site === "YouTube" && video.type === "Trailer"
          )
        );
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  return (
    <div className={s.container}>
      {isLoading && <Loader />}
      {isError && <p className={s.errorMsg}>Error, try again, please.</p>}
      {video ? (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${video.key}`}
          title={video.name}
          allowFullScreen
        ></iframe>
      ) : (
        <p className={s.errorMsg}>Sorry, no video yet</p>
      )}
    </div>
  );
}

// export default function MovieVideo() {
//   const location = useLocation();
//   const videos = location.state?.videos || [];
//   console.log(videos);
//   const firstYouTubeVideo = videos.find(
//     (video) => video.site === "YouTube" && video.type === "Trailer"
//   );

//   return (
//     <div className={s.container}>
//       {firstYouTubeVideo ? (
//         <iframe
//           width="560"
//           height="315"
//           src={`https://www.youtube.com/embed/${firstYouTubeVideo.key}`}
//           title={firstYouTubeVideo.name}
//           allowFullScreen
//         ></iframe>
//       ) : (
//         <p className={s.errorMsg}>Sorry, no video yet</p>
//       )}
//     </div>
//   );
// }
