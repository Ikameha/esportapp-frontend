export default function TeamCard({ team }) {
    return (
      <div className="flex flex-col items-center text-center w-24">
        <div className="bg-gray-100 p-2 rounded-lg shadow-sm">
          <img
            src={team?.image_url || 'https://via.placeholder.com/64'}
            alt={team?.name || 'Équipe inconnue'}
            className="h-14 w-14 object-contain"
          />
        </div>
        <span className="text-sm font-semibold mt-2 text-gray-800">
          {team?.name || 'Équipe inconnue'}
        </span>
      </div>
    );
  }
  