import { useState, useEffect } from "react";

function Standings() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.jolpi.ca/ergast/f1/current/driverstandings.json")
      .then((res) => res.json())
      .then((data) => {
        const list = data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];
        setStandings(list);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-white py-10">Loading standings...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Failed to load standings: {error}</p>;

  return (
    <div className="px-4 py-6">
      <h1 className="text-center text-4xl md:text-5xl font-extrabold text-red-600 mb-8">
        Driver Standings
      </h1>

      <div className="max-w-2xl mx-auto space-y-3">
        {standings.map((entry, i) => (
          <div
            key={entry.Driver.driverId}
            className={`flex items-center justify-between rounded-xl px-5 py-4 text-white shadow-lg ${
              i === 0 ? "bg-gradient-to-r from-red-900 to-gray-900 border border-red-600" : "bg-gray-800"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold w-8">{entry.position}</span>
              <div>
                <p className="font-medium">
                  {entry.Driver.givenName} {entry.Driver.familyName}
                </p>
                <p className="text-gray-400 text-sm">{entry.Constructors[0]?.name}</p>
              </div>
            </div>
            <span className="font-bold text-lg">{entry.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Standings;