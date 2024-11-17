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

  // Fetch reservations data when the component mounts
  useEffect(() => {
    axios
      .get(`https://cine-o753.onrender.com/reservations/user/${userId}`)
      .then((response) => {
        setPurchases(response.data); // Set the fetched reservations
      })
      .catch((error) => {
        console.error("There was an error fetching the data:", error);
      });
  }, [userId]);

  // Handle canceling the reservation
  const handleCancel = (reservationId: number) => {
    axios
      .delete(`https://cine-o753.onrender.com/reservations/cancel/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}` // Use actual token if available
        }
      })
      .then(() => {
        // Remove the canceled reservation from the list
        setPurchases((prevPurchases) =>
          prevPurchases.filter((purchase) => purchase.reservationId !== reservationId)
        );
        alert("Reserva cancelada exitosamente.");
      })
      .catch((error) => {
        console.error("Error canceling reservation:", error);
        alert("Hubo un error al cancelar la reserva.");
      });
  };

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
                Asientos: {purchase.reservationDetails.map((detail) => `A${detail.seatId}`).join(", ")}
              </p>
              <button
                className="cancel-button"
                onClick={() => handleCancel(purchase.reservationId)}
              >
                Cancelar Reserva
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
