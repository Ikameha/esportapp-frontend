'use client';

import './globals.css';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import GameSelector from '@/components/GameSelector';

export default function RootLayout({ children }) {
  const searchParams = useSearchParams();
  const selectedGame = searchParams.get('game') || 'lol';

  const buildLink = (path) => `${path}?game=${selectedGame}`;

  return (
    <html lang="fr">
      <body style={styles.body}>
        <header style={styles.header}>
          <h1 style={styles.title}>Esport Tracker</h1>
          <nav style={styles.nav}>
            <Link href={buildLink('/upcoming')} style={styles.link}>Matchs à venir</Link>
            <Link href={buildLink('/live')} style={styles.link}>Matchs en cours</Link>
            <Link href={buildLink('/finished')} style={styles.link}>Matchs terminés</Link>
          </nav>
          <GameSelector />
        </header>
        <main style={styles.main}>
          {children}
        </main>
      </body>
    </html>
  );
}

const styles = {
  body: {
    margin: 0,
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#121212',
    color: '#fff',
  },
  header: {
    backgroundColor: '#1f1f1f',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderBottom: '1px solid #333',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: 0,
  },
  nav: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  main: {
    padding: '2rem',
    minHeight: '100vh',
  },
};
