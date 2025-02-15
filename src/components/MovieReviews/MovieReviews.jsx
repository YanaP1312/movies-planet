import { useParams } from "react-router-dom";
import { BiSolidCameraMovie } from "react-icons/bi";
import s from "./MovieReviews.module.css";
import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import { fetchMoviesDetails } from "../../tmdb-api";
import EmptyArr from "../EmptyArr/EmptyArr";
import Error from "../Error/Error";

export default function MovieReviews() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchMoviesDetails(id, "reviews");

        const sortedReviews = data.reviews.results.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setReviews(sortedReviews);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, [id]);

  return (
    <ul className={s.revList}>
      {isLoading && <Loader />}
      {isError && <Error />}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <li className={s.item} key={review.id}>
            <h2 className={s.topic}>
              <BiSolidCameraMovie size="25" /> {review.author}
            </h2>
            <span className={s.dscr}>{review.created_at.split("T")[0]}</span>
            <p className={s.text}>{review.content}</p>
          </li>
        ))
      ) : (
        <EmptyArr children="reviews" />
      )}
    </ul>
  );
}
