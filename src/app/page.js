'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [selectedGame, setSelectedGame] = useState('lol');

  const handleNavigate = (path) => {
    router.push(`${path}?game=${selectedGame}`);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-6">
      <h1 className="text-4xl font-bold mb-8 text-center">eSport Tracker 🎮</h1>

      <GameSelector selectedGame={selectedGame} setSelectedGame={setSelectedGame} />

      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <button
          onClick={() => handleNavigate('/upcoming')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow text-lg"
        >
          Matchs à venir
        </button>

        <button
          onClick={() => handleNavigate('/finished')}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl shadow text-lg"
        >
          Matchs terminés
        </button>

        <button
          onClick={() => handleNavigate('/live')}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl shadow text-lg"
        >
          Matchs en cours
        </button>
      </div>
    </main>
  );
}

function GameSelector({ selectedGame, setSelectedGame }) {
  const games = [
    { id: 'lol', name: 'League of Legends' },
    { id: 'valorant', name: 'Valorant' },
    { id: 'rocket-league', name: 'Rocket League' },
    { id: 'tft', name: 'Teamfight Tactics' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {games.map((game) => (
        <button
          key={game.id}
          onClick={() => setSelectedGame(game.id)}
          className={`px-4 py-2 rounded-full border ${
            selectedGame === game.id
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-800 hover:bg-gray-200'
          }`}
        >
          {game.name}
        </button>
      ))}
    </div>
  );
}
