import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // Import the AuthContext
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginRegister.css';

export default function Login() {
  const { login } = useAuth(); // Get the login function from context
  const navigate = useNavigate(); // Initialize navigate
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://cine-o753.onrender.com/users/login', {
        email,
        password,
      });

      if (response.status === 200) {
        login(); // Update the authentication state
        navigate('/home'); // Redirect to the home page
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="LoginRegister-form">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );  
}
