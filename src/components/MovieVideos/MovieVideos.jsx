import { useParams } from "react-router-dom";
import s from "./MovieVideos.module.css";
import { useState, useEffect } from "react";
import { fetchMoviesDetails } from "../../tmdb-api";
import Loader from "../Loader/Loader";
import EmptyArr from "../EmptyArr/EmptyArr";
import Error from "../Error/Error";

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
      {isError && <Error />}
      {video ? (
        <iframe
          className={s.video}
          src={`https://www.youtube.com/embed/${video.key}`}
          title={video.name}
          allowFullScreen
        ></iframe>
      ) : (
        <EmptyArr children="video" />
      )}
    </div>
  );
}
