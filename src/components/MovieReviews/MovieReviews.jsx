import { useLocation } from "react-router-dom";
import { BiSolidCameraMovie } from "react-icons/bi";
import s from "./MovieReviews.module.css";

export default function MovieReviews() {
  const location = useLocation();
  const reviews = location.state?.reviews || [];

  return (
    <ul className={s.revList}>
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
        <p className={s.errorMsg}>Sorry, no reviews yet</p>
      )}
    </ul>
  );
}
