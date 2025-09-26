import { useEffect, useState } from "react";
import { KEY, API } from "../config";

export function useMovie(selectedMovie) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movieDetails, setMovieDetails] = useState({});
  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setError("");
        setIsLoading(true);
        const response = await fetch(`${API}${KEY}&i=${selectedMovie}`);
        if (!response.ok) throw new Error("Can't fetch data");
        const movie = await response.json();
        if (!movie) throw new Error("Can't get movie");
        setMovieDetails(movie);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, [selectedMovie]);

  return [isLoading, error, movieDetails];
}
