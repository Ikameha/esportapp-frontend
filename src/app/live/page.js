'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';

function LiveMatchesContent() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const selectedGame = searchParams.get('game') || 'lol';

  useEffect(() => {
    async function fetchLiveMatches() {
      try {
        const res = await axios.get(`http://localhost:3001/matches/live?game=${selectedGame}`);
        setMatches(res.data);
      } catch (error) {
        console.error('Erreur chargement matchs en direct:', error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLiveMatches();
  }, [selectedGame]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">
        Matchs en direct ({selectedGame.toUpperCase()})
      </h1>

      {loading ? (
        <p className="text-center">Chargement...</p>
      ) : matches.length === 0 ? (
        <p className="text-center text-gray-600">Aucun match en cours.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {matches.map((match) => (
            <div key={match.id} className="bg-white rounded-xl p-4 shadow">
              {match.name || match.league?.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LiveMatchesPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <Suspense fallback={<p className="text-center">Chargement en cours...</p>}>
        <LiveMatchesContent />
      </Suspense>
    </main>
  );
}
