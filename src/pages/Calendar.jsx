import { useState, useEffect } from "react";

function Calendar() {
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

  if (loading) return <p className="text-center text-white py-10">Loading calendar...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Failed to load calendar: {error}</p>;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="px-4 py-6">
      <h1 className="text-center text-4xl md:text-5xl font-extrabold text-red-600 mb-8">
        Race Calendar
      </h1>

      <div className="max-w-3xl mx-auto space-y-3">
        {races.map((race) => {
          const raceDate = new Date(race.date);
          const isPast = raceDate < today;

          return (
            <div
              key={race.round}
              className={`flex items-center justify-between rounded-xl px-6 py-4 text-white shadow-lg ${
                isPast ? "bg-gray-800 opacity-60" : "bg-gray-900 border-2 border-red-600"
              }`}
            >
              <div>
                <p className="text-lg font-bold">
                  Round {race.round}: {race.raceName}
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  {race.Circuit.circuitName} — {race.Circuit.Location.locality}, {race.Circuit.Location.country}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  {raceDate.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
                </p>
                {isPast && <p className="text-xs text-gray-500 mt-1">Completed</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;