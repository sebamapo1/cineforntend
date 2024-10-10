import { useState } from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'

const movies = [
  { id: 1, title: 'Inception', image: '/placeholder.svg?height=400&width=300' },
  { id: 2, title: 'The Dark Knight', image: '/placeholder.svg?height=400&width=300' },
  { id: 3, title: 'Interstellar', image: '/placeholder.svg?height=400&width=300' },
]

const upcomingMovies = [
  { id: 4, title: 'Dune: Part Two', releaseDate: '2024-03-15' },
  { id: 5, title: 'The Batman 2', releaseDate: '2025-10-03' },
  { id: 6, title: 'Guardians of the Galaxy Vol. 4', releaseDate: '2026-05-01' },
]

const featuredMovies = [
  { id: 7, title: 'Pulp Fiction', image: '/placeholder.svg?height=200&width=150' },
  { id: 8, title: 'The Shawshank Redemption', image: '/placeholder.svg?height=200&width=150' },
  { id: 9, title: 'The Godfather', image: '/placeholder.svg?height=200&width=150' },
]

function Navbar() {
  return (
    <nav style={{
      backgroundColor: 'black',
      color: 'white',
      padding: '1rem',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', color: 'white' }}>WTF Cinema</Link>
        <div>
          <Link to="/login" style={{
            backgroundColor: '#dc2626',
            color: 'white',
            fontWeight: 'bold',
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            marginRight: '0.5rem',
            textDecoration: 'none',
          }}>
            Iniciar sesión
          </Link>
          <Link to="/register" style={{
            backgroundColor: '#dc2626',
            color: 'white',
            fontWeight: 'bold',
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            textDecoration: 'none',
          }}>
            Registrarse
          </Link>
        </div>
      </div>
    </nav>
  )
}

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % movies.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length)
  }

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '768px', margin: '2rem auto' }}>
      <div style={{ overflow: 'hidden', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <img
          src={movies[currentSlide].image}
          alt={movies[currentSlide].title}
          style={{ width: '100%', height: '400px', objectFit: 'cover' }}
        />
      </div>
      <button
        onClick={prevSlide}
        style={{
          position: 'absolute',
          left: '0',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          padding: '0.5rem',
          borderRadius: '0 0.25rem 0.25rem 0',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        style={{
          position: 'absolute',
          right: '0',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          padding: '0.5rem',
          borderRadius: '0.25rem 0 0 0.25rem',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        &#10095;
      </button>
    </div>
  )
}

function TicketBooking() {
  const [quantity, setQuantity] = useState(1)

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1))
  }

  return (
    <div style={{
      maxWidth: '600px',
      margin: '2rem auto',
      padding: '1rem',
      backgroundColor: '#4a4a4a',
      borderRadius: '0.5rem',
      color: 'white',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1rem',
      }}>
        <button style={{
          backgroundColor: '#dc2626',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem',
          flex: 1,
          marginRight: '0.5rem',
        }}>
          Entradas
        </button>
        <button style={{
          backgroundColor: '#8b4513',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem',
          flex: 1,
          marginRight: '0.5rem',
        }}>
          Snacks
        </button>
        <button style={{
          backgroundColor: '#8b4513',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem',
          flex: 1,
        }}>
          Shop
        </button>
      </div>
      <select style={{
        width: '100%',
        padding: '0.5rem',
        marginBottom: '0.5rem',
        backgroundColor: '#cd7f32',
        color: 'white',
        border: 'none',
        borderRadius: '0.25rem',
      }}>
        <option>Cartelera</option>
      </select>
      <select style={{
        width: '100%',
        padding: '0.5rem',
        marginBottom: '0.5rem',
        backgroundColor: '#cd7f32',
        color: 'white',
        border: 'none',
        borderRadius: '0.25rem',
      }}>
        <option>¿Qué vas a ver?</option>
      </select>
      <select style={{
        width: '100%',
        padding: '0.5rem',
        marginBottom: '0.5rem',
        backgroundColor: '#708090',
        color: 'white',
        border: 'none',
        borderRadius: '0.25rem',
      }}>
        <option>¿Dónde?</option>
      </select>
      <select style={{
        width: '100%',
        padding: '0.5rem',
        marginBottom: '0.5rem',
        backgroundColor: '#708090',
        color: 'white',
        border: 'none',
        borderRadius: '0.25rem',
      }}>
        <option>¿Cuándo?</option>
      </select>
      <select style={{
        width: '100%',
        padding: '0.5rem',
        marginBottom: '0.5rem',
        backgroundColor: '#708090',
        color: 'white',
        border: 'none',
        borderRadius: '0.25rem',
      }}>
        <option>¿A qué hora?</option>
      </select>
      <select style={{
        width: '100%',
        padding: '0.5rem',
        marginBottom: '1rem',
        backgroundColor: '#708090',
        color: 'white',
        border: 'none',
        borderRadius: '0.25rem',
      }}>
        <option>Forma de pago</option>
      </select>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem',
      }}>
        <span>¿Cuántas entradas?</span>
        <div style={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <button onClick={decrementQuantity} style={{
            backgroundColor: '#dc2626',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem 0 0 0.25rem',
          }}>-</button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            style={{
              width: '50px',
              textAlign: 'center',
              border: 'none',
              padding: '0.5rem',
            }}
          />
          <button onClick={incrementQuantity} style={{
            backgroundColor: '#dc2626',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '0 0.25rem 0.25rem 0',
          }}>+</button>
        </div>
      </div>
      <button style={{
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#dc2626',
        color: 'white',
        border: 'none',
        borderRadius: '0.25rem',
        fontSize: '1.1rem',
        fontWeight: 'bold',
      }}>
        COMPRAR
      </button>
    </div>
  )
}

function UpcomingMovies() {
  return (
    <div style={{ marginTop: '3rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Próximos estrenos</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {upcomingMovies.map((movie) => (
          <li key={movie.id} style={{ backgroundColor: '#f3f4f6', padding: '1rem', borderRadius: '0.25rem', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 'bold' }}>{movie.title}</span> - Estreno: {movie.releaseDate}
          </li>
        ))}
      </ul>
    </div>
  )
}

function FeaturedMovies() {
  return (
    <div style={{ marginTop: '3rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Películas destacadas</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {featuredMovies.map((movie) => (
          <div key={movie.id} style={{ backgroundColor: '#f3f4f6', padding: '1rem', borderRadius: '0.25rem' }}>
            <img src={movie.image} alt={movie.title} style={{ width: '100%', height: '12rem', objectFit: 'cover', marginBottom: '0.5rem', borderRadius: '0.25rem' }} />
            <h3 style={{ fontWeight: 'bold' }}>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

function Home() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
      <Carousel />
      <TicketBooking />
      <UpcomingMovies />
      <FeaturedMovies />
    </div>
  )
}

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login attempt with:', email, password)
    // Aquí iría la lógica de autenticación
  }

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>Iniciar sesión</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Correo electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
          />
        </div>
        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
          />
        </div>
        <button type="submit" style={{
          backgroundColor: '#dc2626',
          color: 'white',
          fontWeight: 'bold',
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem',
          border: 'none',
          cursor: 'pointer',
        }}>
          Iniciar sesión
        </button>
      </form>
    </div>
  )
}

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden')
      return
    }
    console.log('Register attempt with:', email, password)
    // Aquí iría la lógica de registro
  }

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>Registrarse</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Correo electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
          />
        </div>
        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '0.5rem' }}>Confirmar contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
          />
        </div>
        <button type="submit" style={{
          backgroundColor: '#dc2626',
          color: 'white',
          fontWeight: 'bold',
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem',
          border: 'none',
          cursor: 'pointer',
        }}>
          Registrarse
        </button>
      </form>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  )
}