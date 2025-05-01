import React from 'react';

export default function MatchCard({ match, showStream = false }) {
  const {
    id,
    league,
    opponents,
    begin_at,
    status,
    streams_list,
    results
  } = match;

  const teamA = opponents[0]?.opponent;
  const teamB = opponents[1]?.opponent;

  const getScore = () => {
    if (results?.length === 2) {
      return `${results[0].score} - ${results[1].score}`;
    }
    return 'À venir';
  };

  return (
    <div style={styles.card}>
      <div style={styles.league}>
        {league?.image_url && (
          <img src={league.image_url} alt={league.name} style={styles.logo} />
        )}
        <span>{league?.name}</span>
      </div>

      <div style={styles.teams}>
        <div style={styles.team}>
          {teamA?.image_url && (
            <img src={teamA.image_url} alt={teamA.name} style={styles.teamLogo} />
          )}
          <p>{teamA?.name || 'TBD'}</p>
        </div>

        <span style={styles.vs}>VS</span>

        <div style={styles.team}>
          {teamB?.image_url && (
            <img src={teamB.image_url} alt={teamB.name} style={styles.teamLogo} />
          )}
          <p>{teamB?.name || 'TBD'}</p>
        </div>
      </div>

      <p style={styles.date}>{new Date(begin_at).toLocaleString()}</p>
      <p style={styles.score}>Score : {getScore()}</p>

      {showStream && streams_list?.length > 0 && (
        <div style={styles.streams}>
          {streams_list.map((stream, i) => (
            <a
              key={i}
              href={stream.raw_url}
              target="_blank"
              rel="noreferrer"
              style={styles.streamBtn}
            >
              Regarder ({stream.language.toUpperCase()})
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: 12,
    padding: 16,
    background: '#fff',
    color: '#000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    maxWidth: 400,
    margin: 'auto',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  league: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontWeight: 'bold',
    fontSize: 14,
  },
  logo: {
    width: 24,
    height: 24,
  },
  teams: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  team: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  teamLogo: {
    width: 48,
    height: 48,
    objectFit: 'contain',
  },
  vs: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  date: {
    fontSize: 14,
    color: '#333',
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  streams: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    marginTop: 8,
  },
  streamBtn: {
    padding: '6px 12px',
    background: '#2563eb',
    color: '#fff',
    borderRadius: 6,
    textDecoration: 'none',
    fontSize: 12,
  },
};
