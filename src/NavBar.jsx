import { useState } from "react";

export function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}
export function Logo() {
  <div className="logo">
    <span role="img">🍿</span>
    <h1>usePopcorn</h1>
  </div>;
}
export function Search() {
  const [query, setQuery] = useState("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
export function Resaults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
