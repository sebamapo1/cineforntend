import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import './TicketBooking.css';

interface Movie {
  movieId: number;
  name: string;
}

interface Cinema {
  cinemaId: number;
  neighborhood: string;
  address: string;
}

interface ShowTime {
  showtimeId: number;
  movie: Movie;
  showtimeDate: string;
  room: {
    roomId: number;
    cinema: Cinema;
  };
}

export default function TicketBooking() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);
  const [selectedCinema, setSelectedCinema] = useState<number | null>(null);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<ShowTime[]>([]);
  const [selectedTime, setSelectedTime] = useState<ShowTime | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMoviesAndCinemas = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [moviesResponse, cinemasResponse] = await Promise.all([
          fetch('https://cine-o753.onrender.com/movies'),
          fetch('https://cine-o753.onrender.com/cinemas'),
        ]);

        if (!moviesResponse.ok || !cinemasResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const moviesData = await moviesResponse.json();
        const cinemasData = await cinemasResponse.json();
        setMovies(moviesData || []);
        setCinemas(cinemasData || []);
      } catch (error) {
        console.error('Error fetching movies and cinemas:', error);
        setError('Could not load movies and cinemas. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMoviesAndCinemas();
  }, []);

  useEffect(() => {
    const fetchShowtimes = async () => {
      if (!selectedMovie || !selectedCinema) return;
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://cine-o753.onrender.com/showtimes/by-movie-cinema/${selectedMovie}/${selectedCinema}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data: string[] = await response.json();

        const datesSet = new Set<string>();
        const showtimes: ShowTime[] = [];
        data.forEach((showtimeStr, index) => {
          const showtimeDate = new Date(showtimeStr); // Parse the backend date string
          const dateOnly = showtimeDate.toISOString().split('T')[0]; // Get date part only
          datesSet.add(dateOnly);
          showtimes.push({
            showtimeId: index,  // assuming index is the unique ID for the showtime
            movie: { movieId: selectedMovie, name: "Sample Movie" }, // Movie info can be adjusted
            showtimeDate: showtimeDate.toISOString(),
            room: { roomId: selectedCinema, cinema: { cinemaId: selectedCinema, neighborhood: 'Pocitos', address: 'Sample Address' } }
          });
        });
        setAvailableDates(Array.from(datesSet).sort());
        setAvailableTimes(showtimes);
      } catch (error) {
        console.error('Error fetching showtimes:', error);
        setError('Could not load showtimes. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchShowtimes();
  }, [selectedMovie, selectedCinema]);

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
    setSelectedTime(null); // Reset selected time when date changes
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTimeId = Number(event.target.value);
    const selectedTime = availableTimes.find((time) => time.showtimeId === selectedTimeId);
    setSelectedTime(selectedTime || null);
  };

  const handlePurchase = () => {
    if (!selectedTime) {
      alert('Please select a showtime before purchasing');
      return;
    }
    // Navigate to seat selection with showtime information
    navigate('/seat-selection', {
      state: {
        showtimeId: selectedTime.showtimeId,
        movieName: selectedTime.movie.name,
        cinema: `${selectedTime.room.cinema.neighborhood}, ${selectedTime.room.cinema.address}`,
        datetime: selectedTime.showtimeDate,
        roomId: selectedTime.room.roomId,
      },
    });
    
  };

  if (error) return <div className="error-message">{error}</div>;
  if (isLoading) return <div className="loading-message">Loading...</div>;

  return (
    <div className="ticket-booking-container">
      <div className="form-group">
        <label htmlFor="movie-select">Select a Movie</label>
        <select
          id="movie-select"
          className="select-input"
          value={selectedMovie || ''}
          onChange={(e) => {
            const movieId = Number(e.target.value);
            setSelectedMovie(movieId || null);
            setSelectedCinema(null);
            setSelectedDate(null);
            setSelectedTime(null);
          }}
        >
          <option value="">Select a Movie</option>
          {movies.map((movie) => (
            <option key={`movie-${movie.movieId}`} value={movie.movieId}>
              {movie.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="cinema-select">Select a Cinema</label>
        <select
          id="cinema-select"
          className="select-input"
          value={selectedCinema || ''}
          onChange={(e) => {
            const cinemaId = Number(e.target.value);
            setSelectedCinema(cinemaId || null);
            setSelectedDate(null);
            setSelectedTime(null);
          }}
          disabled={!selectedMovie || cinemas.length === 0}
        >
          <option value="">Select a Cinema</option>
          {cinemas.map((cinema) => (
            <option key={`cinema-${cinema.cinemaId}`} value={cinema.cinemaId}>
              {cinema.neighborhood} ({cinema.address})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date-select">Select a Date</label>
        <select
          id="date-select"
          className="select-input"
          value={selectedDate || ''}
          onChange={handleDateChange}
          disabled={!selectedCinema || availableDates.length === 0}
        >
          <option value="">Select a Date</option>
          {availableDates.map((date) => (
            <option key={`date-${date}`} value={date}>
              {format(new Date(date), 'PPPP')} {/* Format using Date object */}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="time-select">Select a Time</label>
        <select
          id="time-select"
          className="select-input"
          value={selectedTime?.showtimeId || ''}
          onChange={handleTimeChange}
          disabled={!selectedDate || availableTimes.length === 0}
        >
          <option value="">Select a Time</option>
          {availableTimes
            .filter((showtime) => new Date(showtime.showtimeDate).toISOString().split('T')[0] === selectedDate)
            .map((showtime) => (
              <option key={`time-${showtime.showtimeId}`} value={showtime.showtimeId}>
                {format(new Date(showtime.showtimeDate), 'p')} {/* Format time */}
              </option>
            ))}
        </select>
      </div>

      <button
        className="purchase-button"
        onClick={handlePurchase}
        disabled={!selectedTime}
      >
        Proceed to Seat Selection
      </button>
    </div>
  );
}
