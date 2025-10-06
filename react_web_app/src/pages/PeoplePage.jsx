import { useState, useEffect } from "react";
import axios from "axios";
import Form from "../components/Form";
import MovieDisplay from "../components/MovieDisplay";
import Person from "../components/Person";
import { useNavigate } from "react-router-dom";


export default function PeoplePage() {
  const [person, setPerson] = useState(null); // Holds selected person data
  const [films, setFilms] = useState([]); // Holds film objects
  const [loading, setLoading] = useState(false);


  const searchPerson = async (searchTerm) => {
    try {
      setLoading(true); // START loading
      const res = await axios.get(`https://swapi.dev/api/people/?search=${searchTerm}`);
      
      // if movie not found
      if (res.data.results.length === 0) {
        console.warn("Movie not found:", res.data.Error);
        setPerson(null);
        setFilms([]);
        return;
      }

      const foundPerson = res.data.results[0];
      setPerson(foundPerson);

      // Now fetch film data using film URLs in foundPerson.films
      const filmResponses = await Promise.all(
        foundPerson.films.map((filmUrl) => axios.get(filmUrl))
      );

      setFilms(filmResponses.map(f => f.data));
    } catch (err) {
      console.error(err);
      setPerson(null);
      setFilms([]);
    } finally {
    setLoading(false); // END loading
    }

  };

  const navigate = useNavigate(); 
  
  const handleMovieClick = (title) => {
    navigate(`/movie?q=${encodeURIComponent(title)}`);
  }

  return (
    <div className="page">
      <h1>Search Star Wars Character</h1>
      <Form moviesearch={searchPerson} />

      {loading && <h2>Loading...</h2>}
      {!loading && person && (
        <div>
          <Person
            name={person.name}
            height={person.height}
            birth_year={person.birth_year}
          />
            <h3>Films:</h3>
            <div className="movies-container">
                  {films.map((film, i) => (
                    <div key={i} >
                        <h4
                          style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                          onClick={() => handleMovieClick(film.title)}
                        >
                         {film.title}
                         </h4>
                        <MovieDisplay
                          movie={{
                            Title: film.title,
                            Year: film.release_date,
                            Plot: film.opening_crawl,
                            Poster: "", // No poster in SWAPI
                          }}
                        />
                    </div>
                  ))}
            </div>
        </div>
      )}

      {!loading && !person && <p>Try searching for a character (e.g. "Luke")</p>}
    </div>
  );
}
