import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowUndoSharp } from "react-icons/io5";

export default function BackLink() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackLink = () => {
    if (location.state?.cast || location.state?.reviews) {
      navigate(-2);
    } else if (location.key === "default") {
      navigate("/movies");
    } else {
      navigate(-1);
    }
  };

  return (
    <button onClick={handleBackLink}>
      <IoArrowUndoSharp />
      Back to movies
    </button>
  );
}
