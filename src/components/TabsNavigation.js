'use client';

import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const games = [
  { id: 'lol', name: 'League of Legends' },
  { id: 'valorant', name: 'Valorant' },
  { id: 'rocket-league', name: 'Rocket League' },
  { id: 'tft', name: 'Teamfight Tactics' }
];

export default function TabsNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentGame = searchParams.get('game') || 'lol';

  const [selectedGame, setSelectedGame] = useState(currentGame);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('game', selectedGame);
    router.push(`${pathname}?${params.toString()}`);
  }, [selectedGame]);

  const tabs = [
    { label: 'Matchs à venir', href: '/upcoming' },
    { label: 'Matchs en cours', href: '/live' },
    { label: 'Matchs terminés', href: '/finished' },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <div className="flex gap-2">
        {tabs.map(tab => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={`${tab.href}?game=${selectedGame}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                isActive ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border'
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      <select
        value={selectedGame}
        onChange={e => setSelectedGame(e.target.value)}
        className="border rounded px-3 py-1 bg-white text-sm text-gray-800"
      >
        {games.map(game => (
          <option key={game.id} value={game.id}>
            {game.name}
          </option>
        ))}
      </select>
    </div>
  );
}
