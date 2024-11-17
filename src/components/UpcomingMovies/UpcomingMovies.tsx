
import { useState, useEffect } from 'react'
import './UpcomingMovies.css'

interface Movie {
  movieId: number
  name: string
  coverImageBase64: string
  releaseDate: string
}

export default function UpcomingMovies() {
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([])
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://cine-o753.onrender.com/movies', {
          mode: 'no-cors'
        });
        if (!response.ok) {
          if (response.status === 204) {
            setUpcomingMovies([]) // Handle no content response
            return
          }
          throw new Error('Network response was not ok')
        }
        const movies = await response.json()
        // Sort movies alphabetically by name and take only the first 3
        const sortedMovies = movies
          .sort((a: Movie, b: Movie) => a.name.localeCompare(b.name))
          .slice(0, 3)
        setUpcomingMovies(sortedMovies)
      } catch (error) {
        setError('Error fetching movies')
        console.error('Error fetching movies:', error)
      }
    }

    fetchMovies()
  }, [])

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="upcoming-movies">
      <h2>Próximos Estrenos</h2>
      <ul>
        {upcomingMovies.map((movie) => (
          <li key={movie.movieId}>
            <h3 className="movie-title">{movie.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  )
}