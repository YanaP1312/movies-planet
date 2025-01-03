import s from "./EmptyArr.module.css";

export default function EmptyArr({ children }) {
  return (
    <div>
      <p className={s.errorMsg}>Sorry, no {children} yet</p>
    </div>
  );
}
