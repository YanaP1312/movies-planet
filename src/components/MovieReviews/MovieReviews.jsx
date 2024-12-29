import { useLocation } from "react-router-dom";
import { BiSolidCameraMovie } from "react-icons/bi";

export default function MovieReviews() {
  const location = useLocation();
  const reviews = location.state?.reviews || [];

  return (
    <ul>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <li key={review.id}>
            <BiSolidCameraMovie size="25" />
            <h2>{review.author}</h2>
            <span>{review.created_at.split("T")[0]}</span>
            <p>{review.content}</p>
          </li>
        ))
      ) : (
        <p>Sorry, no reviews yet</p>
      )}
    </ul>
  );
}
