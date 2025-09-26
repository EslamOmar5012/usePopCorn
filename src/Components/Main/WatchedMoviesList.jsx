import WatchedMoviesItem from "./WatchedMoviesItem";

export default function WatchedMoviesList({ watched, onDelete }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMoviesItem
          movie={movie}
          onDelete={onDelete}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}
