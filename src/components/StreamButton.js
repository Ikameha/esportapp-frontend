export default function StreamButton({ stream }) {
    return (
      <a
        href={stream.raw_url}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-xs"
      >
        Regarder ({stream.language.toUpperCase()})
      </a>
    );
  }
  