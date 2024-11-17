import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Carousel.css';

interface Movie {
  id: number;
  title: string;
  image: string;
}

export default function Carousel() {
  const movies: Movie[] = [
    { id: 1, title: 'Inception', image: '/placeholder.svg?height=600&width=1200' },
    { id: 2, title: 'The Dark Knight', image: '/placeholder.svg?height=600&width=1200' },
    { id: 3, title: 'Interstellar', image: '/placeholder.svg?height=600&width=1200' },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  return (
    <div className="carousel-container">
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${movie.image})` }}
        >
          <div className="carousel-content">
            <h2 className="movie-title">{movie.title}</h2>
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