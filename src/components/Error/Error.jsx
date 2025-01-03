import s from "./Error.module.css";

export default function Error() {
  return (
    <div>
      <p className={s.errorMsg}>Something go wrong, please try again!</p>
    </div>
  );
}
