'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import MatchList from '@/components/MatchList';

export default function UpcomingMatchesPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const selectedGame = searchParams.get('game') || 'lol'; // jeu par défaut : LoL

  useEffect(() => {
    async function fetchUpcoming() {
      try {
        const res = await axios.get(`http://localhost:3001/matches?game=${selectedGame}`);
        setMatches(res.data);
      } catch (err) {
        console.error('Erreur chargement matchs à venir:', err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUpcoming();
  }, [selectedGame]);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Matchs à venir ({selectedGame.toUpperCase()})
      </h1>

      {loading ? (
        <p className="text-center">Chargement...</p>
      ) : (
        <MatchList matches={matches} />
      )}
    </main>
  );
}
