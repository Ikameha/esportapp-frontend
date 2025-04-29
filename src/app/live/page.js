'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function LiveMatchesPage() {
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
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Matchs en direct ({selectedGame.toUpperCase()})
      </h1>

      {loading ? (
        <p className="text-center">Chargement...</p>
      ) : matches.length === 0 ? (
        <p className="text-center text-gray-600">Aucun match en direct actuellement.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {matches.map((match) => (
            <LiveMatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </main>
  );
}

function LiveMatchCard({ match }) {
  const [team1, team2] = match.opponents?.map((o) => o.opponent) || [];

  return (
    <div className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-4">
        <TeamCard team={team1} />
        <span className="text-lg font-semibold text-red-500">LIVE 🔴</span>
        <TeamCard team={team2} />
      </div>

      <div className="flex justify-center items-center text-sm text-gray-500">
        {match?.live?.opens_at ? `Débuté à ${new Date(match.live.opens_at).toLocaleTimeString()}` : 'En direct'}
      </div>

      {match.streams_list?.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {match.streams_list.map((stream, i) => (
            <a
              key={i}
              href={stream.raw_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs"
            >
              Regarder ({stream.language.toUpperCase()})
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function TeamCard({ team }) {
  return (
    <div className="flex flex-col items-center text-center">
      <img
        src={team?.image_url || 'https://via.placeholder.com/64'}
        alt={team?.name}
        className="h-12 w-12 object-contain mb-1"
      />
      <span className="text-sm font-semibold text-gray-800">{team?.name}</span>
    </div>
  );
}
