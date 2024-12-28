import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setSearchParams({ query: e.target.value })}
      />
    </div>
  );
}
