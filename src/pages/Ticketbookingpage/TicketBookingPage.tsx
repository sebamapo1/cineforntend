import TicketBooking from '../../components/TicketBooking/TicketBooking';
import './TicketBookingPage.css';

export default function TicketBookingPage() {
    return (
      <div className="ticket-booking-page">
        <h1 className="page-title">
          Movie Ticket <span className="highlight">Booking</span>
        </h1>
        <TicketBooking />
      </div>
    );
  }