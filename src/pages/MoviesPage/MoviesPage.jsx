import { useSearchParams } from "react-router-dom";
import SearchBox from "../../components/SearchBox/SearchBox";
import MoviesList from "../../components/MoviesList/MoviesList";
import { useState, useEffect } from "react";
import { fetchSearchMovies } from "../../tmdb-api";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryName = searchParams.get("query") ?? "";
  const updateQueryString = (query) => {
    const nextParams = query !== "" ? { query } : {};
    setSearchParams(nextParams);
  };

  const [currentQuery, setCurrentQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async (query) => {
    setCurrentQuery(query);
    setMovies([]);
    setNoResults(false);
    setError(false);
  };

  useEffect(() => {
    if (!currentQuery) return;

    const fetchMoviesOnMoviePage = async () => {
      try {
        setError(false);
        setLoading(true);
        setNoResults(false);
        const data = await fetchSearchMovies(currentQuery);
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

    fetchMoviesOnMoviePage();
  }, [currentQuery]);

  return (
    <div>
      <SearchBox
        onSearch={handleSearch}
        value={queryName}
        onChange={updateQueryString}
      />
      {noResults && <p>No movie found matching your request</p>}
      {loading && <p>Loading...</p>}
      {error && <p>Something go wrong, please try again!</p>}
      {movies.length > 0 && <MoviesList movies={movies} />}
    </div>
  );
}
