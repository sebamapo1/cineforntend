import { useState, useEffect } from 'react';
import './FeaturedMovies.css';

interface Movie {
  movieId: number;
  name: string;
  coverImagebase64: string;
}

const FeaturedMovies = () => {
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://cine-o753.onrender.com/movies');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const movies = await response.json();
        setFeaturedMovies(movies);
      } catch (error) {
        setError('Error fetching movies');
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const getImageSrc = (base64String: string) => {
    if (base64String?.startsWith('data:image')) {
      return base64String;
    }
    return base64String ? `data:image/jpeg;base64,${base64String}` : '/api/placeholder/300/450';
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="featured-movies">
      <h2>Películas Destacadas</h2>
      <div className="featured-movies-grid">
        {featuredMovies.map((movie) => (
          <div key={movie.movieId} className="featured-movie">
            <img
              src={getImageSrc(movie.coverImagebase64)}
              alt={movie.name}
              className="movie-image"
            />
            <h3>{movie.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedMovies;
