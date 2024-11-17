import { useState, useEffect } from 'react';
import './FeaturedMovies.css';

interface Pelicula {
  idPelicula: number;
  nombre: string;
  imagenBase64: string;
}

const PeliculasDestacadas = () => {
  const [peliculasDestacadas, setPeliculasDestacadas] = useState<Pelicula[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const obtenerPeliculas = async () => {
      try {
        const respuesta = await fetch('https://cine-o753.onrender.com/movies');
        if (!respuesta.ok) {
          throw new Error('La respuesta de la red no fue exitosa');
        }
        const peliculas = await respuesta.json();
        setPeliculasDestacadas(peliculas);
      } catch (error) {
        setError('Error al obtener las películas');
        console.error('Error al obtener las películas:', error);
      }
    };

    obtenerPeliculas();
  }, []);

  const obtenerSrcImagen = (cadenaBase64: string) => {
    if (cadenaBase64?.startsWith('data:image')) {
      return cadenaBase64;
    }
    return cadenaBase64
      ? `data:image/jpeg;base64,${cadenaBase64}`
      : '/api/placeholder/300/450';
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="peliculas-destacadas">
      <h2>Películas Destacadas</h2>
      <div className="peliculas-destacadas-grid">
        {peliculasDestacadas.map((pelicula) => (
          <div key={pelicula.idPelicula} className="pelicula-destacada">
            <img
              src={obtenerSrcImagen(pelicula.imagenBase64)}
              alt={pelicula.nombre}
              className="imagen-pelicula"
            />
            <h3>{pelicula.nombre}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeliculasDestacadas;
