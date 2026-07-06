import { useState, useEffect } from "react";

function Prediction() {
  const [nextRace, setNextRace] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("https://api.jolpi.ca/ergast/f1/current/driverstandings.json").then((r) => r.json()),
      fetch("https://api.jolpi.ca/ergast/f1/current/constructorstandings.json").then((r) => r.json()),
      fetch("https://api.jolpi.ca/ergast/f1/current.json").then((r) => r.json()),
    ])
      .then(([driverData, constructorData, calendarData]) => {
        const drivers = driverData.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];
        const constructors = constructorData.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || [];
        const races = calendarData.MRData.RaceTable.Races;

        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const upcoming = races.find((r) => new Date(r.date) >= now);
        setNextRace(upcoming);

        const constructorPoints = {};
        constructors.forEach((c) => { constructorPoints[c.Constructor.name] = Number(c.points); });

        const maxDriverPoints = Math.max(...drivers.map((d) => Number(d.points)), 1);
        const maxConstructorPoints = Math.max(...Object.values(constructorPoints), 1);

        const scored = drivers.map((d) => {
          const driverPts = Number(d.points);
          const teamName = d.Constructors[0]?.name;
          const teamPts = constructorPoints[teamName] || 0;
          const position = Number(d.position);
          const normDriver = (driverPts / maxDriverPoints) * 100;
          const normConstructor = (teamPts / maxConstructorPoints) * 100;
          const positionBonus = Math.max(0, 100 - (position - 1) * 8);
          const score = normDriver * 0.6 + normConstructor * 0.3 + positionBonus * 0.1;
          return { name: `${d.Driver.givenName} ${d.Driver.familyName}`, team: teamName, score: Math.round(score * 10) / 10 };
        });

        scored.sort((a, b) => b.score - a.score);
        const top5 = scored.slice(0, 5);
        const totalScore = top5.reduce((sum, d) => sum + d.score, 0);
        setPredictions(top5.map((d) => ({ ...d, probability: Math.round((d.score / totalScore) * 100) })));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-white py-10">Calculating predictions...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Failed to load prediction data: {error}</p>;

  return (
    <div className="px-4 py-6">
      <h1 className="text-center text-4xl md:text-5xl font-extrabold text-red-600 mb-2">
        Race Winner Prediction
      </h1>
      {nextRace && (
        <p className="text-center text-gray-400 mb-8">
          {nextRace.raceName} — {new Date(nextRace.date).toLocaleDateString()}
        </p>
      )}

      <div className="max-w-xl mx-auto space-y-3">
        {predictions.map((p, i) => (
          <div
            key={p.name}
            className={`flex items-center justify-between rounded-xl px-5 py-4 text-white shadow-lg ${
              i === 0 ? "bg-gradient-to-r from-red-900 to-gray-900 border-2 border-red-600" : "bg-gray-800"
            }`}
          >
            <div>
              <p className="font-bold text-lg">{i === 0 ? "🏆 " : `${i + 1}. `}{p.name}</p>
              <p className="text-gray-400 text-sm">{p.team}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-xl">{p.probability}%</p>
              <p className="text-gray-400 text-xs">win probability</p>
            </div>
          </div>
        ))}

        <p className="text-gray-600 text-sm text-center mt-5">
          Prediction based on current championship points, constructor performance, and standings position. This is a statistical estimate, not a guaranteed outcome — it doesn't account for track-specific history, qualifying pace, or race-day incidents.
        </p>
      </div>
    </div>
  );
}

export default Prediction;