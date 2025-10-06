import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Form from '../components/Form';
import MovieDisplay from '../components/MovieDisplay';

export default function MoviePage() {
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY; // for Vite, all env variable must start w VITE_
  // State to hold movie data
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q'); // get ?q= from URL

  // Function to get movies
  const getMovie = async(searchTerm) => {
    try {
      // Make fetch request and store the response
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&t=${searchTerm}`
      );
      // Parse JSON response into a JavaScript object
      const data = await response.json();

      // if movie not found
      if (data.Response === "False") {
        console.warn("Movie not found:", data.Error);
        setMovie(null); // clear the display
      } else {
        // Set the Movie state to the received data
        setMovie(data);
      }
      } catch (e) {
        console.error(e);
      }
  };
  
  // Auto-search when query param is present
  useEffect(() => {
    if (query) {
      getMovie(query);
    }
  }, [query]);

  return (
    <div>
      <h1>Search A Movie</h1>
      <Form moviesearch={getMovie} /> <br />
      
      {loading && <h2>Loading...</h2>}

      {!loading && movie && (
          <MovieDisplay movie={movie} />
      )}

      {!loading && !movie && <p>Try searching for a any title (e.g. "Godfather")</p>}

    </div>
  );
}