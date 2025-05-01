'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const games = [
  {
    id: 'lol',
    name: 'League of Legends',
    icon: '/logos/lol.png',
  },
  {
    id: 'valorant',
    name: 'Valorant',
    icon: '/logos/valorant.png',
  },
  {
    id: 'rocket-league',
    name: 'Rocket League',
    icon: '/logos/rocket-league.png',
  },
  {
    id: 'teamfight-tactics',
    name: 'TFT',
    icon: '/logos/tft.png',
  },
];


export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedGame = searchParams.get('game') || 'lol';

  const navigateTo = (path) => {
    router.push(`${path}?game=${selectedGame}`);
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Bienvenue sur l’Esport App</h1>
      <p style={styles.subtitle}>Choisissez une section pour suivre l’actualité eSport ({selectedGame.toUpperCase()})</p>

      <div style={styles.buttonGroup}>
        <button style={{ ...styles.button, backgroundColor: '#0070f3' }} onClick={() => navigateTo('/upcoming')}>🗓 Matchs à venir</button>
        <button style={{ ...styles.button, backgroundColor: '#e91e63' }} onClick={() => navigateTo('/live')}>🔴 Matchs en cours</button>
        <button style={{ ...styles.button, backgroundColor: '#4caf50' }} onClick={() => navigateTo('/finished')}>✅ Matchs terminés</button>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Sélectionnez un jeu</h2>
        <div style={styles.grid}>
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => router.push(`/upcoming?game=${game.id}`)}
              style={{
                ...styles.card,
                borderColor: selectedGame === game.id ? '#0070f3' : '#ddd',
              }}
            >
              <img src={game.icon} alt={game.name} style={styles.image} />
              <p style={styles.label}>{game.name}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    color: '#222',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '2rem',
  },
  buttonGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'center',
    marginBottom: '2rem',
  },
  button: {
    padding: '1rem 1.5rem',
    fontSize: '1rem',
    border: 'none',
    color: '#fff',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  section: {
    marginTop: '2rem',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '1.5rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: '#fff',
    border: '2px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  image: {
    width: '64px',
    height: '64px',
    objectFit: 'contain',
    marginBottom: '0.5rem',
  },
  label: {
    fontSize: '1rem',
    fontWeight: '500',
  },
};
