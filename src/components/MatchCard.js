'use client';

import Image from 'next/image';

export default function MatchCard({ match, showScore = false, showStream = false }) {
  const leagueName = match.league?.name || 'League inconnue';
  const leagueLogo = match.league?.image_url || '/default-league-logo.png';
  const date = new Date(match.begin_at).toLocaleString();
  const results = match.results?.map(r => r.score).join(' - ');
  const streamLinks = match.streams_list || [];

  return (
    <div className="bg-white rounded-xl p-4 shadow flex flex-col items-center justify-between min-h-[200px]">
      <Image
        src={leagueLogo}
        alt={leagueName}
        width={64}
        height={64}
        className="object-contain mb-2"
      />
      <p className="text-lg font-semibold text-gray-800">{leagueName}</p>
      <p className="text-sm text-gray-600">{date}</p>

      {showScore && results && (
        <p className="text-sm mt-1 text-gray-700">Score : {results}</p>
      )}

      {showStream && streamLinks.length > 0 && (
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {streamLinks.map((stream, index) => (
            <a
              key={index}
              href={stream.raw_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Regarder ({stream.language.toUpperCase()})
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
