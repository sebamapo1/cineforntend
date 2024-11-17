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
        <UpcomingMovies />
        <FeaturedMovies />
      </div>
    </div>
  );
}