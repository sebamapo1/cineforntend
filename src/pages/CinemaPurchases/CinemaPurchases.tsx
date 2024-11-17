import { useState, useEffect } from 'react';
import axios from 'axios';
import './CinemaPurchases.css';

interface ReservationDetail {
  reservationDetailId: number;
  reservationId: number;
  seatId: number;
}

interface Reservation {
  reservationId: number;
  date: string;
  reservationDetails: ReservationDetail[];
}

export default function CinemaPurchases() {
  const [purchases, setPurchases] = useState<Reservation[]>([]);
  const userId = 1; // Replace with dynamic user ID as needed

  useEffect(() => {
    // Fetch data from the backend using Axios
    axios
      .get(`https://cine-o753.onrender.com/reservations/user/${userId}`)
      .then((response) => {
        setPurchases(response.data); // Set the fetched reservations
      })
      .catch((error) => {
        console.error("There was an error fetching the data:", error);
      });
  }, [userId]); // This will re-run the effect if userId changes

  return (
    <div className="cinema-purchases container">
      <h1>Mis Compras</h1>
      {purchases.length === 0 ? (
        <p>No tienes compras recientes.</p>
      ) : (
        <ul className="purchase-list">
          {purchases.map((purchase) => (
            <li key={purchase.reservationId} className="purchase-item">
              <h2>Reserva #{purchase.reservationId}</h2>
              <p>Fecha: {new Date(purchase.date).toLocaleString()}</p>
              <p>
                Asientos: {purchase.reservationDetails.map(detail => `A${detail.seatId}`).join(", ")}
              </p>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
