import toast from "react-hot-toast";
import s from "./SearchBox.module.css";

export default function SearchBox({ onSearch, value, onChange }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      toast("Please enter your query", {
        style: {
          color: "rgb(60, 138, 7)",
        },
        icon: "⚡",
      });
      return;
    }
    onSearch(value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          className={s.input}
          type="text"
          autoFocus
          autoComplete="off"
          name="query"
          placeholder="Search movie"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button type="submit" className={s.btn}>
          Search
        </button>
      </form>
    </div>
  );
}
