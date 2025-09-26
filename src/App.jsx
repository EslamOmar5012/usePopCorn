//hooks imports
import { useState, useEffect } from "react";
import { useMovies } from "./hooks/useMovies.jsx";
import { useKey } from "./hooks/useKey.jsx";

//NavBar imports
import NavBar from "./Components/navBar/NavBar";
import Logo from "./Components/navBar/Logo";
import Search from "./Components/navBar/Search";
import Results from "./Components/navBar/Results";

//main imports
import Main from "./Components/Main/MainBoxes.jsx";
import Box from "./Components/Main/Box.jsx";
import MoviesList from "./Components/Main/MoviesList.jsx";
import Summary from "./Components/Main/Summary.jsx";
import WatchedMoviesList from "./Components/Main/WatchedMoviesList.jsx";
import MovieDetails from "./Components/Main/MovieDetails.jsx";

export default function App() {
  const [watched, setWatched] = useState(() => {
    const storage = JSON.parse(localStorage.getItem("watched"));

    return storage ? storage : [];
  });
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [query, setQuery] = useState("");
  const [isLoading, error, movies] = useMovies(query);

  const handleSelectMovie = (id) => {
    if (selectedMovie === id) {
      setSelectedMovie(null);
      return;
    }

    setSelectedMovie(id);
  };

  const handleCloseMovie = () => {
    setSelectedMovie(null);
  };

  const handleCheckWatched = (id) => {
    return watched.find((movie) => movie.imdbID === id)?.userRating;
  };

  const handleDeleteMovie = (id) => {
    setWatched((movies) => movies.filter((movie) => movie.imdbID !== id));
  };

  useKey("Escape", () => setSelectedMovie(null));

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Results movies={movies} />
      </NavBar>

      <Main>
        <Box>
          <MoviesList
            movies={movies}
            isLoading={isLoading}
            error={error}
            selectMovie={handleSelectMovie}
          />
        </Box>

        <Box>
          {selectedMovie ? (
            <MovieDetails
              selectedMovie={selectedMovie}
              onCloseMovie={handleCloseMovie}
              onWatched={handleCheckWatched}
              onRate={setWatched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDelete={handleDeleteMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
