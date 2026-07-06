import { useState, useEffect } from "react";
import trackDetails from "../data/trackDetails";

function Tracks() {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.jolpi.ca/ergast/f1/current.json")
      .then((res) => res.json())
      .then((data) => {
        setRaces(data.MRData.RaceTable.Races || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-white py-10">Loading tracks...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Failed to load tracks: {error}</p>;

  return (
    <div className="px-4 py-6">
      <h1 className="text-center text-4xl md:text-5xl font-extrabold text-red-600 mb-8">
        Tracks
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {races.map((race) => {
          const circuit = race.Circuit;
          const details = trackDetails[circuit.circuitId];

          return (
            <div
              key={race.round}
              className="bg-gray-800 rounded-2xl p-6 text-white shadow-lg transition-transform duration-300 hover:-translate-y-1"
            >
              <h2 className="text-lg font-bold mb-1">{circuit.circuitName}</h2>
              <p className="text-gray-400 text-sm mb-4">
                {circuit.Location.locality}, {circuit.Location.country}
              </p>

              <p className="text-sm mb-1">
                📅 {new Date(race.date).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
              </p>

              {details ? (
                <>
                  <p className="text-sm mb-1"> Length: {details.length}</p>
                  <p className="text-sm mb-1"> Laps: {details.laps}</p>
                  <p className="text-sm">⏱ Lap Record: {details.lapRecord}</p>
                </>
              ) : (
                <p className="text-sm text-gray-500">Track stats coming soon</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Tracks;