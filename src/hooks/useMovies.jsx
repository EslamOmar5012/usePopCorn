import { useState, useEffect } from "react";
import { API, KEY } from "../config";

function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setError("");
        setIsLoading(true);
        const response = await fetch(`${API}${KEY}&s=${query}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("❌ Can't get data");

        const data = await response.json();
        if (data.Response === "False")
          throw new Error("❌ No Movie with this name");

        setMovies(data.Search);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length > 2) fetchMovies();

    if (query.length === 0) setMovies([]);

    return () => controller.abort();
  }, [query, setMovies]);

  return [isLoading, error, movies];
}

export { useMovies };
