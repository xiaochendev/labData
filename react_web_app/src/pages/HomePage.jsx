import React, { useEffect, useState } from "react";
import MovieDisplay from "../components/MovieDisplay";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY; // for Vite, all env variable must start w VITE_
  // State to hold movie data
  const [movies, setMovies] = useState([]);  // used [] instead of null, so no mistake when calling map
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // navigate hook

  const popularTitles = [
    "Clueless",
    "Titanic",
    "Test",
    "Mean Girls",
    "The Dark Knight",
    "Best",
  ];

  // try to change the useEffect we created so that it grabs a random movie on each page refresh, rather than always starting with "Clueless."
  useEffect(() => {
    const fetchPopularMovies = async () => {
      const movieData = await Promise.all(
        popularTitles.map(async (title) => {
          const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`
          );
          return await response.json();
        })
      );
      setMovies(movieData);
    };

    fetchPopularMovies();
  }, []);

  const handleClick = (title) => {
    navigate(`/movie?q=${encodeURIComponent(title)}`);
  };

  return (
    <div>
      <h1>Popular Movies</h1>
      {loading && <h2>Loading...</h2>}
      {!loading && movies && (
        <div className='movies-container'>
          {movies && movies.map((movie, index) => (
            <div key={index} onClick={() => handleClick(movie.Title)} style={{ cursor: 'pointer' }}>
              <MovieDisplay movie={movie} />
            </div>
          ))}
        </div>
      )}
      {!loading && !movies && <p>Coming soon...</p>}
    </div>
  );
}
