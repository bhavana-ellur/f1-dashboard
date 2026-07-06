import { useState, useEffect } from "react";
import useRaceSessions from "../hooks/useRaceSessions";
import SessionSelect from "../components/SessionSelect";

function Weather() {
  const { sessions, loading, error } = useRaceSessions(2026);
  const [selectedSession, setSelectedSession] = useState(null);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    if (!selectedSession || !selectedSession.isPast) {
      setWeather([]);
      return;
    }
    fetch(`https://api.openf1.org/v1/weather?session_key=${selectedSession.session_key}`)
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch(() => setWeather([]));
  }, [selectedSession]);

  if (loading) return <p className="text-center text-white py-10">Loading sessions...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Failed to load weather: {error}</p>;

  const latest = weather[weather.length - 1];

  return (
    <div className="px-4 py-6">
      <h1 className="text-center text-4xl md:text-5xl font-extrabold text-red-600 mb-8">
        Race Weekend Weather
      </h1>

      <div className="max-w-xl mx-auto">
        <SessionSelect sessions={sessions} selectedSession={selectedSession} onSelect={setSelectedSession} />

        {selectedSession && !selectedSession.isPast && (
          <p className="text-center text-gray-400">This session hasn't happened yet — weather data will appear once it's completed.</p>
        )}

        {selectedSession && selectedSession.isPast && !latest && (
          <p className="text-center text-gray-400">No weather data available for this session.</p>
        )}

        {latest && (
          <div className="bg-gray-800 rounded-2xl p-6 text-white grid grid-cols-2 gap-4">
            <div>🌡️ Air Temp: {latest.air_temperature}°C</div>
            <div>🛣️ Track Temp: {latest.track_temperature}°C</div>
            <div>💧 Humidity: {latest.humidity}%</div>
            <div>🌬️ Wind Speed: {latest.wind_speed} m/s</div>
            <div>🌧️ Rainfall: {latest.rainfall ? "Yes" : "No"}</div>
            <div>📊 Pressure: {latest.pressure} mbar</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;