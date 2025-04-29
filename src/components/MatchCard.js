import TeamCard from './TeamCard';
import StreamButton from './StreamButton';

export default function MatchCard({ match }) {
  const team1 = match.opponents?.[0]?.opponent;
  const team2 = match.opponents?.[1]?.opponent;
  const startTime = match.begin_at
    ? new Date(match.begin_at).toLocaleString()
    : 'Heure inconnue';

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transform hover:scale-105 transition-transform duration-300 p-6">
      <div className="flex justify-between items-center mb-4">
        <TeamCard team={team1} />
        <span className="text-xl font-bold text-gray-600">VS</span>
        <TeamCard team={team2} />
      </div>

      <div className="flex justify-center items-center text-gray-500 text-sm mb-4">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2"
             viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        {startTime}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {match.streams_list?.map((stream, i) => (
          <StreamButton key={i} stream={stream} />
        ))}
      </div>
    </div>
  );
}
