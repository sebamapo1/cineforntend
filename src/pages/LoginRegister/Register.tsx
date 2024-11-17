import React, { useState } from 'react';
import axios from 'axios';
import './LoginRegister.css';

export default function Register() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('https://cine-o753.onrender.com/users/register', {
        name,
        lastName,
        email,
        password,
        telephone,
      });

      if (response.status === 201) {
        alert('Usuario registrado con éxito');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          setError('El usuario ya existe');
        } else {
          setError(`Error en el registro: ${error.response.data.message || 'Intente nuevamente'}`);
        }
      } else {
        setError('Error en el registro: Intente nuevamente');
      }
    }
  };

  return (
    <div className="LoginRegister-form">
      <h1>Registrarse</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Apellido"
          required
        />
        <input
          type="tel"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          placeholder="Teléfono"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmar contraseña"
          required
        />
        <button type="submit">Registrarse</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}