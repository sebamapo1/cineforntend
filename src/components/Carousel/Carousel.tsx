import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Carousel.css';

interface Movie {
  movieId: number;
  name: string;
  coverImageBase64: string;
}

export default function Carousel() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://cine-o753.onrender.com/movies');
        if (!response.ok) {
          if (response.status === 204) {
            setMovies([]); // Handle no content response
            return;
          }
          throw new Error('Network response was not ok');
        }
        const fetchedMovies = await response.json();
        const sortedMovies = fetchedMovies
          .sort((a: Movie, b: Movie) => a.name.localeCompare(b.name))
          .slice(0, 3); // Display only the first 3 movies
        setMovies(sortedMovies);
      } catch (error) {
        setError('Error fetching movies');
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % movies.length);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  useEffect(() => {
    const autoPlayTimer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(autoPlayTimer);
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (movies.length === 0) {
    return <div className="loading">Cargando películas...</div>;
  }

  return (
    <div className="carousel-container">
      {movies.map((movie, index) => (
        <div
          key={movie.movieId}
          className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${movie.coverImageBase64})` }}
        >
          <div className="carousel-content">
            <h2 className="movie-title">{movie.name}</h2>
            <button className="watch-now-btn">
              <Link to="/ticket-booking">Watch Now</Link>
            </button>
          </div>
        </div>
      ))}
      <button onClick={prevSlide} className="carousel-button carousel-button-prev" aria-label="Previous slide">
        &#10094;
      </button>
      <button onClick={nextSlide} className="carousel-button carousel-button-next" aria-label="Next slide">
        &#10095;
      </button>
      <div className="carousel-indicators">
        {movies.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}
