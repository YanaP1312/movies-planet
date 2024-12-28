import { useLocation } from "react-router-dom";

export default function MovieReviews() {
  const location = useLocation();
  const reviews = location.state?.review || [];

  return (
    <ul>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <li key={review.id}>
            <h2>{review.author}</h2>
            <span>{review.created_at}</span>
            <p>{review.content}</p>
          </li>
        ))
      ) : (
        <p>Sorry, no reviews yet</p>
      )}
    </ul>
  );
}
