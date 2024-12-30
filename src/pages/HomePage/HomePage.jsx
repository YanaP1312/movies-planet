import MoviesList from "../../components/MoviesList/MoviesList";
import { fetchTrendingMovies } from "../../tmdb-api";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMoviesOnHomePage = async () => {
      const cachedMovies = sessionStorage.getItem("trendingMovies");
      if (cachedMovies) {
        setMovies(JSON.parse(cachedMovies));
        return;
      }

      try {
        setLoading(true);
        setError(false);
        const data = await fetchTrendingMovies();
        setMovies(data.results);
        sessionStorage.setItem("trendingMovies", JSON.stringify(data.results));
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesOnHomePage();
  }, []);

  return (
    <main>
      <h1>Trending today</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error, try again, please.</p>}
      <MoviesList movies={movies} />
    </main>
  );
}
