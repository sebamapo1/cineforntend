import { Link } from 'react-router-dom'; // Import Link
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand">WTF Cinema</Link>
        <div className="navbar-links">
          {isAuthenticated ? (
            <div className="profile-menu">
              <button onClick={toggleProfileMenu} className="navbar-button">
                My Profile
              </button>
              {isProfileMenuOpen && (
                <div className="profile-dropdown">
                  <Link to="/cinema-purchases" className="dropdown-item">My Purchases</Link>
                  <button onClick={handleLogout} className="dropdown-item">Log out</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="navbar-button">Iniciar sesión</Link>
              <Link to="/register" className="navbar-button">Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
