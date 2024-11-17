import React, { useState } from 'react';

interface MoviePurchase {
  id: number;
  title: string;
  showtime: string;
  date: string;
  tickets: number;
  price: number;
}

const purchases: MoviePurchase[] = [
  { id: 1, title: "Dune: Part Two", showtime: "19:30", date: "2024-03-15", tickets: 2, price: 25.98 },
  { id: 2, title: "The Batman 2", showtime: "20:00", date: "2025-10-03", tickets: 3, price: 38.97 },
  { id: 3, title: "Guardians of the Galaxy Vol. 4", showtime: "18:45", date: "2026-05-01", tickets: 4, price: 51.96 },
  { id: 4, title: "Pulp Fiction", showtime: "21:15", date: "2024-07-20", tickets: 2, price: 25.98 },
];

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#ffffff',
    backgroundColor: '#0a192f',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '30px',
    borderBottom: '1px solid #1e3a8a',
    paddingBottom: '10px',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#1e3a8a',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  },
  cardTitle: {
    fontSize: '1.2rem',
    marginTop: '0',
    marginBottom: '10px',
    color: '#ffffff',
  },
  cardText: {
    margin: '5px 0',
    fontSize: '0.9rem',
    color: '#cbd5e0',
  },
  button: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    marginTop: '10px',
    transition: 'background-color 0.3s ease',
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#1e3a8a',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
};

const PurchaseCard: React.FC<{ purchase: MoviePurchase }> = ({ purchase }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>{purchase.title}</h3>
      <p style={styles.cardText}>Date: {purchase.date}</p>
      <p style={styles.cardText}>Showtime: {purchase.showtime}</p>
      <p style={styles.cardText}>Tickets: {purchase.tickets}</p>
      <p style={styles.cardText}>Total: ${purchase.price.toFixed(2)}</p>
      <button 
        style={styles.button} 
        onClick={() => setIsModalOpen(true)}
        aria-label={`View details for ${purchase.title}`}
      >
        View Details
      </button>
      {isModalOpen && (
        <>
          <div style={styles.modalOverlay as React.CSSProperties} onClick={() => setIsModalOpen(false)} />
          <div style={styles.modal as React.CSSProperties} role="dialog" aria-modal="true">
            <h2 style={styles.cardTitle}>{purchase.title}</h2>
            <p style={styles.cardText}>Date: {purchase.date}</p>
            <p style={styles.cardText}>Showtime: {purchase.showtime}</p>
            <p style={styles.cardText}>Tickets: {purchase.tickets}</p>
            <p style={styles.cardText}>Total: ${purchase.price.toFixed(2)}</p>
            <button 
              style={styles.button} 
              onClick={() => setIsModalOpen(false)}
              aria-label="Close details"
            >
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const CinemaPurchases: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Mis Compras</h1>
      <div style={styles.cardGrid}>
        {purchases.map(purchase => (
          <PurchaseCard key={purchase.id} purchase={purchase} />
        ))}
      </div>
    </div>
  );
};

export default CinemaPurchases;