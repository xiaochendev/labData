import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// pages
import PeoplePage from './pages/PeoplePage'
import PlanetPage from './pages/PlanetsPage'
import StarshipPage from './pages/StarshipsPage'

// components
import NavBar from './components/Nav/NavBar'

function App() {
  const [count, setCount] = useState(0)

// Set up our routes & route components
  // create 3 page components to use with the routes
  //  // people starships, planets
  //  Create a nav bar to naviagte between pages

  return (
    <>
      <main className="App">
        <NavBar />
        <Routes>
          <Route path='/people' element={<PeoplePage />} />
          <Route path='/planets' element={<PlanetPage />} />
          <Route path='/starships' element={<StarshipPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
