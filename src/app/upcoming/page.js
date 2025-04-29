'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';

function UpcomingMatchesContent() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const selectedGame = searchParams.get('game') || 'lol';

  useEffect(() => {
    async function fetchUpcomingMatches() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/matches?game=${selectedGame}`);
        setMatches(res.data);
      } catch (error) {
        console.error('Erreur chargement matchs à venir:', error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUpcomingMatches();
  }, [selectedGame]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">
        Matchs à venir ({selectedGame.toUpperCase()})
      </h1>

      {loading ? (
        <p className="text-center">Chargement...</p>
      ) : matches.length === 0 ? (
        <p className="text-center text-gray-600">Aucun match à venir trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {matches.map((match) => (
            <div key={match.id} className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition-all">
              <div className="flex items-center justify-center mb-2">
                <Image
                  src={match.league?.image_url || 'https://via.placeholder.com/64'}
                  alt={match.league?.name || 'League Logo'}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <div className="text-center text-sm text-gray-700">{match.league?.name}</div>
              <div className="text-center text-xs text-gray-500 mt-1">
                Début : {match.begin_at ? new Date(match.begin_at).toLocaleString() : 'Non précisé'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function UpcomingMatchesPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <Suspense fallback={<p className="text-center">Chargement des matchs...</p>}>
        <UpcomingMatchesContent />
      </Suspense>
    </main>
  );
}
