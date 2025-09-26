import MoviesItem from "./Moviesitem";
import Modal from "./Modal";

export default function MoviesList({ movies, isLoading, error, selectMovie }) {
  return (
    <>
      {isLoading && <Modal cls="loader" text="Loading..." />}
      {error && <Modal cls="error" text={error} />}
      {!isLoading && !error && (
        <ul className="list list-movies">
          {movies?.map((movie) => (
            <MoviesItem
              movie={movie}
              selectMovie={selectMovie}
              key={movie.imdbID}
            />
          ))}
        </ul>
      )}
    </>
  );
}
