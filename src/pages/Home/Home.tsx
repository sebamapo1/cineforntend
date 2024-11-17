import { Link } from 'react-router-dom';
import Carousel from '../../components/Carousel/Carousel';
import TicketBooking from '../../components/TicketBooking/TicketBooking';
import UpcomingMovies from '../../components/UpcomingMovies/UpcomingMovies';
import FeaturedMovies from '../../components/FeaturedMovies/FeaturedMovies';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="carousel-ticket-container">
        <Carousel />
        <div className="ticket-booking-overlay">
          <TicketBooking />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <Link to="/seat-selection" className="block text-center my-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go to Seat Selection
          </button>
        </Link>
        <UpcomingMovies />
        <FeaturedMovies />
      </div>
    </div>
  );
}