// import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from '../components/People/Person'

export default function PeoplePage() {
    // const [symbol] = useParams();
    const [people, setPeople] = useState(null);

    let urlStr = "https://swapi.dev/api/people";
    // let urlStr = `https://swapi.dev/api/${symbol}`;

    async function getData(urlStr) {
        try {
            let res = await axios.get(urlStr)   // be aware: the response is an object

            const peopleData = res.data.results // get list of poeple

            // each person has a films property and it is an array of url, want to get each film title?
            // for each person, fetch their films
            const peopleWithFilms = await Promise.all(peopleData.map(async person => {
                const filmTitles = await Promise.all(
                    person.films.map(async filmUrl => {
                        const filmRes = await axios.get(filmUrl);
                        return filmRes.data.title;
                    })
                );

                // return a new obj w filmTitles included
                return {
                    ...person,
                    filmTitles: filmTitles
                };
            }));

            // console.log(res.data);
            // setPeople(res.data)
            // setPeople(peopleData);    

            setPeople(peopleWithFilms);
            
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getData(urlStr);
    }, [])

    // return <h1>people page</h1>

    const loading = () => {
        return <h1>Loading...</h1>
    }

    const loaded = () => people.map( (person, index) => {
        return(
            <Person key={index} {...person} />
        )
    } );

        // return(
        //     <div>
        //         <h1>People</h1>

        //         {/* use map to display object, cuz react don't know how to handle arrays */}
        //         <ul>
        //             {people.map((person, index) => (
        //                 <li key={index}>
        //                     <div><strong>Name:</strong> {person.name}</div>
        //                     <div><strong>Height:</strong> {person.height} cm</div>
        //                      <div>
        //                         <strong>Films:</strong>
        //                         <ul>
        //                             {person.filmTitles.map((title, i) => (
        //                                 <li key={i}>{title}</li>
        //                             ))}
        //                         </ul>
        //                     </div>
        //                 </li>
        //             ))}
        //         </ul>
        //     </div>
        // )

        return people ? loaded() : loading();
    }