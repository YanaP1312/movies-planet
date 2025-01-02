import LoadMore from "../../components/LoadMore/LoadMore";
import MoviesList from "../../components/MoviesList/MoviesList";
import { fetchTrendingMovies } from "../../tmdb-api";
import { useEffect, useState, useRef } from "react";
import ThanksForTMDB from "../../components/ThanksToTMDB/ThanksForTMDB";
import Loader from "../../components/Loader/Loader";
import s from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const cacheRef = useRef({});

  useEffect(() => {
    const savedMovies = sessionStorage.getItem("trendingMovies");
    const savedPage = sessionStorage.getItem("trendingPage");

    if (savedMovies && savedPage) {
      setMovies(JSON.parse(savedMovies));
      setPage(Number(savedPage));
    }
  }, []);

  useEffect(() => {
    const fetchMoviesOnHomePage = async () => {
      setLoading(true);
      setError(false);

      if (cacheRef.current[page]) {
        setMovies((prevMovies) => [...prevMovies, ...cacheRef.current[page]]);
        setLoading(false);
        return;
      }

      try {
        const data = await fetchTrendingMovies(page);

        cacheRef.current[page] = data.results;

        setMovies((prevMovies) => {
          const updated = [...prevMovies, ...data.results];
          const unique = updated.filter(
            (movie, index, self) =>
              index === self.findIndex((m) => m.id === movie.id)
          );
          sessionStorage.setItem("trendingMovies", JSON.stringify(unique));
          sessionStorage.setItem("trendingPage", page.toString());
          return unique;
        });

        setTotalPages(data.total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesOnHomePage();
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <main className={s.mainSection}>
        <h1 className={s.title}>Trending today</h1>
        {loading && <Loader />}
        {error && <p className="errorMsg">Error, try again, please.</p>}
        <MoviesList movies={movies} />
        {movies.length > 0 && page < totalPages && (
          <LoadMore onClick={loadMore} />
        )}
      </main>
      <ThanksForTMDB />
    </div>
  );
}
