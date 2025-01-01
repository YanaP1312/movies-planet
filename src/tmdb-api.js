import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGE0ZDJiYjEwNGQwNTdjOWRlNjFjMzE2ODkzMDZlNiIsIm5iZiI6MTczNTMxNTM0MC41Miwic3ViIjoiNjc2ZWNmOGM2MmJhMzEwZmMwMTJkNTQ0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.zKNJtNvgYradpWH1OO4cyryMj8EuK2GDUPtZs-fOrpo";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export async function fetchTrendingMovies(page) {
  const response = await axiosInstance.get("/trending/movie/day", {
    params: { page: page },
  });
  return response.data;
}

export async function fetchSearchMovies(userQuery, page) {
  const response = await axiosInstance.get("/search/movie", {
    params: { query: userQuery, page: page },
  });
  return response.data;
}

export async function fetchMoviesDetails(id, appendResponse = "") {
  const response = await axiosInstance.get(`/movie/${id}`, {
    params: {
      append_to_response: appendResponse,
    },
  });
  return response.data;
}
