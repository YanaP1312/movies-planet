import s from "./LoadMore.module.css";
export default function LoadMore({ onClick }) {
  return (
    <div>
      <button onClick={onClick} className={s.btn}>
        Load More
      </button>
    </div>
  );
}
