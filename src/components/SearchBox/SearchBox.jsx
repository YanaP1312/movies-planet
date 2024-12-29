import toast, { Toaster } from "react-hot-toast";

export default function SearchBox({ onSearch, value, onChange }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const query = form.elements.query.value;
    if (query.trim() === "") {
      toast("Please enter your query", {
        position: "top-right",
        style: {
          background: "transparent",
          color: "aliceblue",
          fontStyle: "italic",
          boxShadow: "none",
        },
        icon: "⚠️",
      });
      return;
    }
    onSearch(query);
    form.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoFocus
          name="query"
          placeholder="Search movie"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <Toaster />
    </div>
  );
}
