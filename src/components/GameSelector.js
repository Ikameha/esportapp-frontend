'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function GameSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentGame = searchParams.get('game') || 'lol';

  const handleChange = (e) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('game', e.target.value);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <select value={currentGame} onChange={handleChange} style={styles.select}>
      <option value="lol">League of Legends</option>
      <option value="valorant">Valorant</option>
      <option value="rocket-league">Rocket League</option>
      <option value="teamfight-tactics">TFT</option>
    </select>
  );
}

const styles = {
  select: {
    padding: '0.4rem',
    fontSize: '1rem',
    backgroundColor: '#1f1f1f',
    color: '#fff',
    border: '1px solid #444',
    borderRadius: '4px',
    marginLeft: '1rem',
  },
};
