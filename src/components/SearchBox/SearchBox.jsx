import toast, { Toaster } from "react-hot-toast";
import s from "./SearchBox.module.css";

export default function SearchBox({ onSearch, value, onChange }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      toast("Please enter your query", {
        position: "top-right",
        style: {
          background: "transparent",
          color: "rgb(142, 235, 79)",
          fontStyle: "italic",
          boxShadow: "none",
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
      <Toaster />
    </div>
  );
}
