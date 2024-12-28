import { useParams, Link, Outlet } from "react-router-dom";

export default function MovieDetailsPage() {
  const { id, title } = useParams();
  return (
    <div>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
