import { Link } from "react-router-dom";
import { IoArrowUndoSharp } from "react-icons/io5";

export default function BackLink({ to }) {
  return (
    <Link to={to}>
      <IoArrowUndoSharp />
      Back to movies
    </Link>
  );
}
