import { useState, useEffect } from "react";
import trackDetails from "../data/trackDetails";
import circuitCoords from "../data/circuitCoords";



function ResultCard({ result }) {
  return (
    <div className="mt-6 p-5 bg-gray-950 rounded-xl">
      <h2 className="text-xl font-bold text-white mb-2">{result.stops}</h2>
      <p className="text-white mb-2">Tire sequence: {result.tires.join(" → ")}</p>
      <p className="text-gray-400 text-sm">{result.note}</p>
    </div>
  );
}

function Strategy() {
  const [mode, setMode] = useState("manual");
  const [laps, setLaps] = useState(55);
  const [degradation, setDegradation] = useState("medium");
  const [rain, setRain] = useState(false);
  const [result, setResult] = useState(null);

  const [nextRace, setNextRace] = useState(null);
  const [rainChance, setRainChance] = useState(null);
  const [forecastAvailable, setForecastAvailable] = useState(true);
  const [autoLoading, setAutoLoading] = useState(false);
  const [autoError, setAutoError] = useState(null);

  const handleSimulate = () => setResult(getStrategy(laps, degradation, rain ? 100 : 0));

  useEffect(() => {
    if (mode !== "auto") return;
    setAutoLoading(true);
    setAutoError(null);

    fetch("https://api.jolpi.ca/ergast/f1/current.json")
      .then((res) => res.json())
      .then((data) => {
        const races = data.MRData.RaceTable.Races;
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const upcoming = races.find((r) => new Date(r.date) >= now);

        if (!upcoming) {
          setAutoError("No upcoming races found in the current season.");
          setAutoLoading(false);
          return;
        }
        setNextRace(upcoming);

        const raceDate = new Date(upcoming.date);
        const daysAway = Math.ceil((raceDate - now) / (1000 * 60 * 60 * 24));

        if (daysAway > 16) {
          setForecastAvailable(false);
          setAutoLoading(false);
          return;
        }
        setForecastAvailable(true);

        const coords = circuitCoords[upcoming.Circuit.circuitId];
        if (!coords) {
          setAutoError("No coordinates on file for this circuit yet.");
          setAutoLoading(false);
          return;
        }

        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=precipitation_probability_max&timezone=auto&start_date=${upcoming.date}&end_date=${upcoming.date}`)
          .then((res) => res.json())
          .then((weatherData) => {
            setRainChance(weatherData?.daily?.precipitation_probability_max?.[0] ?? 0);
            setAutoLoading(false);
          })
          .catch((err) => {
            setAutoError(err.message);
            setAutoLoading(false);
          });
      })
      .catch((err) => {
        setAutoError(err.message);
        setAutoLoading(false);
      });
  }, [mode]);

  const nextRaceDetails = nextRace ? trackDetails[nextRace.Circuit.circuitId] : null;
  const autoResult =
    nextRace && rainChance !== null && nextRaceDetails
      ? getStrategy(nextRaceDetails.laps, nextRaceDetails.degradation, rainChance)
      : null;

  return (
    <div className="px-4 py-6">
      <h1 className="text-center text-4xl md:text-5xl font-extrabold text-red-600 mb-6">
        Pit Strategy Simulator
      </h1>

      <div className="flex justify-center gap-3 mb-8">
        <button
          onClick={() => setMode("manual")}
          className={`px-5 py-2.5 rounded-lg font-semibold ${mode === "manual" ? "bg-red-600 text-white" : "bg-gray-800 text-white hover:bg-gray-700"}`}
        >
          Manual
        </button>
        <button
          onClick={() => setMode("auto")}
          className={`px-5 py-2.5 rounded-lg font-semibold ${mode === "auto" ? "bg-red-600 text-white" : "bg-gray-800 text-white hover:bg-gray-700"}`}
        >
          Auto (Next Race Forecast)
        </button>
      </div>

      {mode === "manual" && (
        <div className="max-w-md mx-auto bg-gray-800 rounded-2xl p-6 text-white">
          <label className="block mb-2">Race Length (laps): {laps}</label>
          <input
            type="range"
            min="30"
            max="78"
            value={laps}
            onChange={(e) => setLaps(Number(e.target.value))}
            className="w-full mb-5 accent-red-600"
          />

          <label className="block mb-2">Tire Degradation</label>
          <select
            value={degradation}
            onChange={(e) => setDegradation(e.target.value)}
            className="w-full p-2.5 rounded-lg mb-5 bg-gray-900 text-white border border-gray-700"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <label className="flex items-center gap-2.5 mb-6">
            <input type="checkbox" checked={rain} onChange={(e) => setRain(e.target.checked)} className="accent-red-600 w-4 h-4" />
            Rain expected
          </label>

          <button
            onClick={handleSimulate}
            className="w-full py-3.5 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white font-bold"
          >
            Simulate Strategy
          </button>

          {result && <ResultCard result={result} />}
        </div>
      )}

      {mode === "auto" && (
        <div className="max-w-md mx-auto bg-gray-800 rounded-2xl p-6 text-white">
          {autoLoading && <p>Loading next race and forecast...</p>}
          {autoError && <p className="text-red-500">{autoError}</p>}

          {!autoLoading && !autoError && nextRace && (
            <>
              <h2 className="text-xl font-bold mb-1">{nextRace.raceName}</h2>
              <p className="text-gray-400 mb-5">
                {nextRace.Circuit.circuitName} — {new Date(nextRace.date).toLocaleDateString()}
              </p>

              {!forecastAvailable && (
                <p className="text-gray-400">
                  This race is more than 16 days away — weather forecasts aren't reliable that far out yet. Check back closer to race day for an automatic prediction.
                </p>
              )}

              {forecastAvailable && rainChance !== null && (
                <>
                  <p className="mb-4">🌧️ Forecast rain probability: <strong>{rainChance}%</strong></p>
                  {nextRaceDetails ? (
                    <>
                      <p className="text-gray-400 mb-4">
                        Track profile: {nextRaceDetails.laps} laps, {nextRaceDetails.degradation} degradation
                      </p>
                      {autoResult && <ResultCard result={autoResult} />}
                    </>
                  ) : (
                    <p className="text-gray-400">No track profile on file yet for this circuit.</p>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Strategy;