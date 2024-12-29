import { useSearchParams } from "react-router-dom";
import SearchBox from "../../components/SearchBox/SearchBox";
import MoviesList from "../../components/MoviesList/MoviesList";
import { useState, useEffect } from "react";
import { fetchSearchMovies } from "../../tmdb-api";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const [currentQuery, setCurrentQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const fetchMoviesOnMoviePage = async (query) => {
    setMovies([]);
    setNoResults(false);
    setError(false);
    setLoading(true);

    try {
      const data = await fetchSearchMovies(query);
      if (data.results.length === 0) {
        setNoResults(true);
        return;
      }
      setMovies(data.results);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchParams({ query });
    fetchMoviesOnMoviePage(query);
    setCurrentQuery("");
  };

  useEffect(() => {
    if (query) {
      fetchMoviesOnMoviePage(query);
    }
  }, [query]);

  return (
    <div>
      <SearchBox
        onSearch={handleSearch}
        value={currentQuery}
        onChange={setCurrentQuery}
      />
      {noResults && <p>No movie found matching your request</p>}
      {loading && <p>Loading...</p>}
      {error && <p>Something go wrong, please try again!</p>}
      {movies.length > 0 && <MoviesList movies={movies} />}
    </div>
  );
}
