import { useParams } from "react-router-dom";
import { BiSolidCameraMovie } from "react-icons/bi";
import s from "./MovieReviews.module.css";
import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import { fetchMoviesDetails } from "../../tmdb-api";

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
        setReviews(data.reviews.results);
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
      {isError && <p className={s.errorMsg}>Error, try again, please.</p>}
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

// export default function MovieReviews() {
//   const location = useLocation();
//   const reviews = location.state?.reviews || [];

//   return (
//     <ul className={s.revList}>
//       {reviews.length > 0 ? (
//         reviews.map((review) => (
//           <li className={s.item} key={review.id}>
//             <h2 className={s.topic}>
//               <BiSolidCameraMovie size="25" /> {review.author}
//             </h2>
//             <span className={s.dscr}>{review.created_at.split("T")[0]}</span>
//             <p className={s.text}>{review.content}</p>
//           </li>
//         ))
//       ) : (
//         <p className={s.errorMsg}>Sorry, no reviews yet</p>
//       )}
//     </ul>
//   );
// }
