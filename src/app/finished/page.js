'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function FinishedMatchesPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const selectedGame = searchParams.get('game') || 'lol'; // Par défaut : LoL

  useEffect(() => {
    async function fetchFinishedMatches() {
      try {
        const res = await axios.get(`http://localhost:3001/matches/finished?game=${selectedGame}`);
        setMatches(res.data);
      } catch (error) {
        console.error('Erreur chargement matchs terminés:', error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFinishedMatches();
  }, [selectedGame]); // ⬅️ Important : relance fetch si le jeu change

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Matchs terminés ({selectedGame.toUpperCase()})
      </h1>

      {loading ? (
        <p className="text-center">Chargement...</p>
      ) : matches.length === 0 ? (
        <p className="text-center text-gray-600">Aucun match terminé trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {matches.map((match) => (
            <FinishedMatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </main>
  );
}

function FinishedMatchCard({ match }) {
  const [team1, team2] = match.opponents?.map((o) => o.opponent) || [];
  const score1 = match.results?.[0]?.score ?? '-';
  const score2 = match.results?.[1]?.score ?? '-';

  const endedAt = match.end_at
    ? new Date(match.end_at).toLocaleString()
    : new Date(match.begin_at).toLocaleString();

  return (
    <div className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-4">
        <TeamScore team={team1} score={score1} />
        <span className="text-lg font-semibold text-gray-500">VS</span>
        <TeamScore team={team2} score={score2} />
      </div>

      <p className="text-center text-sm text-gray-500">⏱ {endedAt}</p>
    </div>
  );
}

function TeamScore({ team, score }) {
  return (
    <div className="flex flex-col items-center text-center">
      <img
        src={team?.image_url || 'https://via.placeholder.com/64'}
        alt={team?.name}
        className="h-12 w-12 object-contain mb-1"
      />
      <span className="text-sm font-semibold text-gray-800">{team?.name}</span>
      <span className="text-md font-bold mt-1">{score}</span>
    </div>
  );
}
