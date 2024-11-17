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
        <a href="/" className="navbar-brand">WTF Cinema</a>
        <div className="navbar-links">
          {isAuthenticated ? (
            <div className="profile-menu">
              <button onClick={toggleProfileMenu} className="navbar-button">
                My Profile
              </button>
              {isProfileMenuOpen && (
                <div className="profile-dropdown">
                  <a href="/cinema-purchases" className="dropdown-item">My Purchases</a>
                  <a href="#" onClick={handleLogout} className="dropdown-item">Log out</a>
                </div>
              )}
            </div>
          ) : (
            <>
              <a href="/login" className="navbar-button">Iniciar sesión</a>
              <a href="/register" className="navbar-button">Registrarse</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}