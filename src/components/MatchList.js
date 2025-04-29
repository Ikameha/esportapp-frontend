import MatchCard from './MatchCard';

export default function MatchList({ matches }) {
  if (matches.length === 0) {
    return <p className="text-center text-gray-600">Aucun match à venir.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
}
