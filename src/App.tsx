import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/LoginRegister/Login';
import Register from './pages/LoginRegister/Register';
import SeatSelection from './pages/SeatSelection/SeatSelection';
import CinemaPurchases from './pages/CinemaPurchases/CinemaPurchases';
import TicketBookingPage from './pages/Ticketbookingpage/TicketBookingPage';
import { AuthProvider } from './context/AuthContext'; 
import './Styles/global.css';

export default function App() {
  return (
    <AuthProvider> 
      <Router>
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/seat-selection" element={<SeatSelection />} />
            <Route path="/cinema-purchases" element={<CinemaPurchases />} />
            <Route path="/ticket-booking" element={<TicketBookingPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}