import { Link } from "react-router-dom";

export default function SongCard({ song }) {
  return (
    <Link to={`/lyrics/${song.id}`}>

      <div>SongCards</div>

      <div className="border rounded-xl p-4 hover:bg-gray-50 transition cursor-pointer">
        <h2 className="text-xl font-semibold">{song.title}</h2>
        <p className="text-gray-500">{song.author}</p>
        <div className="flex gap-2 mt-2 flex-wrap">
          {song.category?.split(",").map((cat, i) => (
            <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {cat.trim()}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}