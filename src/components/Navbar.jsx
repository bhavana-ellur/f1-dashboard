function Navbar({ page, setPage }) {
  const pages = ["dashboard", "standings", "constructors", "calendar", "tracks", "weather", "laps", "telemetry", "strategy", "predictions", "about"];

  return (
    <div className="flex justify-center flex-wrap gap-3 p-4 mb-8 bg-gray-900 rounded-2xl">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`px-5 py-2.5 rounded-lg text-sm font-semibold capitalize text-white transition-colors duration-200 ${
            page === p ? "bg-red-600" : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}

export default Navbar;