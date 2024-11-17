import "./SeatSelection.css";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type Seat = {
  id: string;
  row: number;
  number: number;
  type: "available" | "occupied" | "selected";
};

const generateSeats = (): Seat[] => {
  const rows = 15;
  const columns = 10;
  const seats: Seat[] = [];

  for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= columns; col++) {
      seats.push({
        id: `${row}-${col}`,
        row,
        number: col,
        type: Math.random() > 0.8 ? "occupied" : "available",
      });
    }
  }

  return seats;
};

export default function SeatSelection() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { movieName = "Película no especificada", cinema = "Dirección no especificada" } =
    location.state || {};

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const [seats, setSeats] = useState<Seat[]>(generateSeats());
  const [seatSize, setSeatSize] = useState(30);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setSeatSize(20);
      } else if (width < 768) {
        setSeatSize(25);
      } else if (width < 1024) {
        setSeatSize(30);
      } else {
        setSeatSize(35);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSeatSelection = (seatId: string) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.id === seatId && seat.type === "available"
          ? { ...seat, type: "selected" }
          : seat.id === seatId && seat.type === "selected"
          ? { ...seat, type: "available" }
          : seat
      )
    );

    setSelectedSeats((prev) =>
      prev.some((seat) => seat.id === seatId)
        ? prev.filter((seat) => seat.id !== seatId)
        : [...prev, seats.find((seat) => seat.id === seatId)!]
    );
  };

  const handleBuyTickets = async () => {
    try {
      const response = await fetch("/api/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieName,
          cinema,
          seats: selectedSeats,
        }),
      });

      if (response.ok) {
        navigate("/cinema-purchases");
      } else {
        console.error("Error purchasing tickets");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="seat-selection-container">
      <div className="seat-selection-content">
        <h1 className="seat-selection-title">Elige tu asiento</h1>
        <div className="seat-selection-legend">
          <div className="seat-selection-legend-item">
            <span className="seat-selection-legend-color seat-selection-occupied"></span>
            Ocupado
          </div>
          <div className="seat-selection-legend-item">
            <span className="seat-selection-legend-color seat-selection-available"></span>
            Disponible
          </div>
          <div className="seat-selection-legend-item">
            <span className="seat-selection-legend-color seat-selection-selected"></span>
            Seleccionado
          </div>
        </div>
        <div className="seat-selection-screen"></div>
        <div className="seat-selection-screen-label">Pantalla</div>
        <div className="seat-selection-seating-area">
          <div className="seat-selection-grid">
            <div className="seat-selection-row-numbers">
              {Array.from({ length: 15 }, (_, i) => (
                <div
                  key={i}
                  className="seat-selection-row-number"
                  style={{
                    height: `${seatSize}px`,
                    lineHeight: `${seatSize}px`,
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div
              className="seat-selection-seats-container"
              style={{
                paddingTop: `${seatSize * 0.1}px`,
                paddingBottom: `${seatSize * 0.1}px`,
              }}
            >
              <div
                className="seat-selection-seats"
                style={{
                  gridTemplateColumns: `repeat(10, ${seatSize}px)`,
                  gridGap: `${seatSize * 0.2}px`,
                }}
              >
                {seats.map((seat) => (
                  <div
                    key={seat.id}
                    onClick={() =>
                      seat.type !== "occupied" && toggleSeatSelection(seat.id)
                    }
                    className={`seat-selection-seat seat-selection-${seat.type}`}
                    style={{
                      width: `${seatSize}px`,
                      height: `${seatSize}px`,
                    }}
                  ></div>
                ))}
              </div>
              <div className="seat-selection-column-numbers">
                {Array.from({ length: 10 }, (_, i) => (
                  <div
                    key={i}
                    className="seat-selection-column-number"
                    style={{ width: `${seatSize}px` }}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="seat-selection-overlay">
        <h2>{movieName}</h2>
        <p>{cinema}</p>
        <p>Asientos seleccionados:</p>
        <ul>
          {selectedSeats.map((seat) => (
            <li key={seat.id}>
              Fila {seat.row}, Número {seat.number}
            </li>
          ))}
        </ul>
        <button
          className="seat-selection-buy-button"
          onClick={handleBuyTickets}
          disabled={selectedSeats.length === 0}
        >
          Comprar Entradas
        </button>
      </div>
    </div>
  );
}
