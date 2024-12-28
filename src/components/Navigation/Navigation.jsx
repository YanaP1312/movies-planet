import { NavLink } from "react-router-dom";
import clsx from "clsx";
import s from "./Navigation.module.css";

export default function Navigation() {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  return (
    <div className={s.nav}>
      <NavLink to="/" className={buildLinkClass}>
        Home
      </NavLink>
      <NavLink to="/movies" className={buildLinkClass}>
        Movies
      </NavLink>
    </div>
  );
}
