'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import MatchCard from '@/components/MatchCard';

export default function LivePage() {
  const searchParams = useSearchParams();
  const selectedGame = searchParams.get('game') || 'lol';

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/matches/live?game=${selectedGame}`
        );
        setMatches(res.data);
      } catch (err) {
        console.error('Erreur chargement matchs en cours:', err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, [selectedGame]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        Matchs en cours ({selectedGame.toUpperCase()})
      </h1>

      {loading ? (
        <p>Chargement...</p>
      ) : matches.length === 0 ? (
        <p>Aucun match en cours.</p>
      ) : (
        <div style={styles.grid}>
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} showStream />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '1.5rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '1.5rem',
  },
};
