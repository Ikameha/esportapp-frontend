'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e) => {
    const selectedGame = e.target.value;
    router.push(`${pathname}?game=${selectedGame}`);
  };

  return (
    <header style={styles.header}>
      <div style={styles.logoSection}>
        <span style={styles.logo}>🎮</span>
        <h1 style={styles.title}>Esport App</h1>
      </div>

      <nav style={styles.nav}>
        <Link href="/upcoming" style={styles.navLink}>
          Matchs à venir
        </Link>
        <Link href="/live" style={styles.navLink}>
          Matchs en cours
        </Link>
        <Link href="/finished" style={styles.navLink}>
          Matchs terminés
        </Link>
      </nav>

      <select defaultValue="lol" onChange={handleChange} style={styles.selector}>
        <option value="lol">League of Legends</option>
        <option value="valorant">Valorant</option>
        <option value="rocket-league">Rocket League</option>
        <option value="tft">TFT</option>
      </select>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    borderBottom: '1px solid #eaeaea',
    backgroundColor: '#fff',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logo: {
    fontSize: '2rem',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    margin: 0,
  },
  nav: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  navLink: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: '500',
  },
  selector: {
    padding: '0.4rem 0.6rem',
    borderRadius: '4px',
    fontSize: '1rem',
  },
};
