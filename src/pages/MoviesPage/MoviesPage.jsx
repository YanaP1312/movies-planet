import { useSearchParams } from "react-router-dom";
import SearchBox from "../../components/SearchBox/SearchBox";
import MoviesList from "../../components/MoviesList/MoviesList";
import { useState, useEffect, useRef } from "react";
import { fetchSearchMovies } from "../../tmdb-api";
import LoadMore from "../../components/LoadMore/LoadMore";
import Loader from "../../components/Loader/Loader";
import s from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const [currentQuery, setCurrentQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // const cacheRef = useRef({});

  useEffect(() => {
    if (!query) return;

    const savedMovies = sessionStorage.getItem(`searchMovies-${query}`);
    const savedPage = sessionStorage.getItem(`searchPage-${query}`);
    const savedTotalPages = sessionStorage.getItem(`totalPages-${query}`);

    if (savedMovies && savedPage && savedTotalPages) {
      setMovies(JSON.parse(savedMovies));
      setPage(Number(savedPage));
      setTotalPages(Number(savedTotalPages));
    } else {
      fetchMoviesOnMoviePage(1);
    }
  }, [query]);

  const fetchMoviesOnMoviePage = async (page) => {
    setError(false);
    setLoading(true);
    setNoResults(false);

    try {
      const data = await fetchSearchMovies(query, page);
      if (data.results.length === 0 && page === 1) {
        setNoResults(true);
        setLoading(false);
        return;
      }

      setMovies((prevMovies) => {
        const updatedMovies = [...prevMovies, ...data.results];
        const uniqueMovies = updatedMovies.filter(
          (movie, index, self) =>
            index === self.findIndex((m) => m.id === movie.id)
        );

        sessionStorage.setItem(
          `searchMovies-${query}`,
          JSON.stringify(uniqueMovies)
        );

        sessionStorage.setItem(`searchPage-${query}`, page.toString());
        sessionStorage.setItem(
          `totalPages-${query}`,
          data.total_pages.toString()
        );
        return uniqueMovies;
      });

      setTotalPages(data.total_pages);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchParams({ query });
    setCurrentQuery("");
    setMovies([]);
    setPage(1);
    sessionStorage.removeItem(`searchMovies-${query}`);
    sessionStorage.removeItem(`searchPage-${query}`);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMoviesOnMoviePage(nextPage);
  };

  return (
    <div>
      <SearchBox
        onSearch={handleSearch}
        value={currentQuery}
        onChange={setCurrentQuery}
      />
      {noResults && (
        <p className={s.msg}>No movie found matching your request</p>
      )}
      {loading && <Loader />}
      {error && <p className={s.msg}>Something go wrong, please try again!</p>}
      {movies.length > 0 && <MoviesList movies={movies} />}
      {movies.length > 0 && page < totalPages && (
        <LoadMore onClick={loadMore} />
      )}
    </div>
  );
}
