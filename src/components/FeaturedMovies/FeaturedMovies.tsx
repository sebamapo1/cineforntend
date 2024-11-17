import { useState, useEffect } from 'react';
import styles from './FeaturedMovies.css'; 
interface Movie {
  idPelicula: number;
  nombre: string;
  imagenBase64: string;
}

const FeaturedMovies = () => {
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://cine-o753.onrender.com/movies');
        if (!response.ok) {
          throw new Error('Network response was not successful');
        }
        const movies = await response.json();
        setFeaturedMovies(movies);
      } catch (err) {
        setError('Error fetching movies');
        console.error('Error fetching movies:', err);
      }
    };

    fetchMovies();
  }, []);

  const getImageSrc = (base64String: string) => {
    if (base64String?.startsWith('data:image')) {
      return base64String;
    }
    return base64String
      ? `data:image/jpeg;base64,${base64String}`
      : '/api/placeholder/300/450';
  };

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.featuredMovies}>
      <h2 className={styles.title}>Películas Destacadas</h2>
      <div className={styles.moviesGrid}>
        {featuredMovies.map((movie) => (
          <div key={movie.idPelicula} className={styles.movieCard}>
            <img
              src={getImageSrc(movie.imagenBase64)}
              alt={movie.nombre}
              className={styles.movieImage}
            />
            <h3 className={styles.movieTitle}>{movie.nombre}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedMovies;