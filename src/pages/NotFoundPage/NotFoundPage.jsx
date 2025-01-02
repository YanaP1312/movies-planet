import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <nav className={s.home}>
      <Link to="/">Home</Link>
    </nav>
  );
}
