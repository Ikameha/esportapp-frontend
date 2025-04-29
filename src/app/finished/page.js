'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

function FinishedMatchesContent() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const selectedGame = searchParams.get('game') || 'lol';

  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/matches/finished?game=${selectedGame}`);
        setMatches(res.data);
      } catch (err) {
        console.error('Erreur chargement matchs terminés:', err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMatches();
  }, [selectedGame]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Matchs terminés ({selectedGame.toUpperCase()})</h1>
      {loading ? <p className="text-center">Chargement...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.map(match => (
            <div key={match.id} className="bg-gray-100 rounded-lg p-4 shadow">
              <p>{match.league?.name}</p>
              <p>Score : {match.results?.map(r => r.score).join(' - ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <main className="p-6">
      <Suspense fallback={<p className="text-center">Chargement des résultats...</p>}>
        <FinishedMatchesContent />
      </Suspense>
    </main>
  );
}
