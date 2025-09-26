import { useState, useEffect } from "react";
import { useMovie } from "../../hooks/useMovie";
import Modal from "./Modal";
import StarRating from "../StarRating";

export default function MovieDetails({
  selectedMovie,
  onCloseMovie,
  onWatched,
  onRate,
}) {
  const [userRating, setUserRating] = useState(0);

  const isRated = onWatched(selectedMovie);

  const handleAdd = () => {
    const newMovie = {
      imdbID: selectedMovie,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      Runtime: parseFloat(movie.Runtime),
      imdbRating: Number(movie.imdbRating),
      userRating: userRating,
    };

    onRate((prev) => [...prev, newMovie]);
  };

  const [isLoading, error, movie] = useMovie(selectedMovie);

  useEffect(() => {
    if (selectedMovie) document.title = movie.Title;
    return () => (document.title = "usePopCorn(Xeno)");
  }, [selectedMovie, movie.Title]);

  return (
    <>
      {isLoading && <Modal cls="loader" text="Loading..." />}
      {error && <Modal cls="error" text={error} />}
      {!isLoading && !error && (
        <div className="details">
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>

            <img
              src={movie.Poster}
              alt={`Poster of ${movie.Title} movie`}
              title={`Poster of ${movie.Title} movie`}
            />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>💫</span>
                {movie.imdbRating} IMDB rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {isRated ? (
                <p>You rated this movie with {isRated} ⭐</p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating != 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </div>
      )}
    </>
  );
}
