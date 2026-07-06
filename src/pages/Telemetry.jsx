import { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import useRaceSessions from "../hooks/useRaceSessions";
import SessionSelect from "../components/SessionSelect";

function Telemetry() {
  const { sessions, loading, error } = useRaceSessions(2026, "Race");
  const [selectedSession, setSelectedSession] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [fetchingTelemetry, setFetchingTelemetry] = useState(false);

  useEffect(() => {
    if (!selectedSession) {
      setDrivers([]);
      setSelectedDriver(null);
      setChartData([]);
      return;
    }
    fetch(`https://api.openf1.org/v1/drivers?session_key=${selectedSession.session_key}`)
      .then((res) => res.json())
      .then((data) => {
        const unique = Array.from(new Map(data.map((d) => [d.driver_number, d])).values());
        setDrivers(unique);
      })
      .catch(() => setDrivers([]));
  }, [selectedSession]);

  useEffect(() => {
    if (!selectedSession || !selectedDriver) return;
    setFetchingTelemetry(true);
    fetch(`https://api.openf1.org/v1/car_data?session_key=${selectedSession.session_key}&driver_number=${selectedDriver}`)
      .then((res) => res.json())
      .then((data) => {
        const sampleRate = Math.max(1, Math.floor(data.length / 300));
        const sampled = data.filter((_, i) => i % sampleRate === 0);
        setChartData(sampled.map((d, i) => ({ index: i, speed: d.speed, throttle: d.throttle, brake: d.brake })));
        setFetchingTelemetry(false);
      })
      .catch(() => setFetchingTelemetry(false));
  }, [selectedDriver, selectedSession]);

  if (loading) return <p className="text-center text-white py-10">Loading sessions...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Failed to load data: {error}</p>;

  return (
    <div className="px-4 py-6">
      <h1 className="text-center text-4xl md:text-5xl font-extrabold text-red-600 mb-8">
        Telemetry
      </h1>

      <div className="max-w-4xl mx-auto">
        <SessionSelect sessions={sessions} selectedSession={selectedSession} onSelect={setSelectedSession} />

        {selectedSession && drivers.length > 0 && (
          <select
            onChange={(e) => setSelectedDriver(Number(e.target.value))}
            defaultValue=""
            className="w-full p-3 rounded-lg mb-6 bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-red-500"
          >
            <option value="" disabled>Select a driver</option>
            {drivers.map((d) => <option key={d.driver_number} value={d.driver_number}>{d.full_name}</option>)}
          </select>
        )}

        {fetchingTelemetry && <p className="text-center text-gray-400">Loading telemetry...</p>}

        {chartData.length > 0 && !fetchingTelemetry && (
          <>
            <div className="bg-gray-800 rounded-2xl p-5 mb-6">
              <h3 className="text-white font-semibold mb-3">Speed (km/h)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="index" stroke="#9ca3af" hide />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ background: "#111827", border: "none" }} />
                  <Line type="monotone" dataKey="speed" stroke="#E10600" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gray-800 rounded-2xl p-5 mb-6">
              <h3 className="text-white font-semibold mb-3">Throttle & Brake (%)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="index" stroke="#9ca3af" hide />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ background: "#111827", border: "none" }} />
                  <Legend />
                  <Line type="monotone" dataKey="throttle" name="Throttle" stroke="#22c55e" dot={false} />
                  <Line type="monotone" dataKey="brake" name="Brake" stroke="#ef4444" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Telemetry;