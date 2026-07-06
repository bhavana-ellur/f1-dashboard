import { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import useRaceSessions from "../hooks/useRaceSessions";
import SessionSelect from "../components/SessionSelect";

function LapComparison() {
  const { sessions, loading, error } = useRaceSessions(2026, "Race");
  const [selectedSession, setSelectedSession] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [driver1, setDriver1] = useState(null);
  const [driver2, setDriver2] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!selectedSession) {
      setDrivers([]);
      setDriver1(null);
      setDriver2(null);
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
    if (!selectedSession || !driver1 || !driver2) return;
    Promise.all([
      fetch(`https://api.openf1.org/v1/laps?session_key=${selectedSession.session_key}&driver_number=${driver1}`).then((r) => r.json()),
      fetch(`https://api.openf1.org/v1/laps?session_key=${selectedSession.session_key}&driver_number=${driver2}`).then((r) => r.json()),
    ]).then(([laps1, laps2]) => {
      const maxLap = Math.max(
        laps1.length ? Math.max(...laps1.map((l) => l.lap_number)) : 0,
        laps2.length ? Math.max(...laps2.map((l) => l.lap_number)) : 0
      );
      const merged = [];
      for (let i = 1; i <= maxLap; i++) {
        const lap1 = laps1.find((l) => l.lap_number === i);
        const lap2 = laps2.find((l) => l.lap_number === i);
        merged.push({ lap: i, driver1: lap1?.lap_duration ?? null, driver2: lap2?.lap_duration ?? null });
      }
      setChartData(merged);
    });
  }, [driver1, driver2, selectedSession]);

  if (loading) return <p className="text-center text-white py-10">Loading sessions...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Failed to load data: {error}</p>;

  const d1 = drivers.find((d) => d.driver_number === driver1);
  const d2 = drivers.find((d) => d.driver_number === driver2);

  return (
    <div className="px-4 py-6">
      <h1 className="text-center text-4xl md:text-5xl font-extrabold text-red-600 mb-8">
        Lap Time Comparison
      </h1>

      <div className="max-w-3xl mx-auto">
        <SessionSelect sessions={sessions} selectedSession={selectedSession} onSelect={setSelectedSession} />

        {selectedSession && drivers.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <select
              onChange={(e) => setDriver1(Number(e.target.value))}
              defaultValue=""
              className="flex-1 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-red-500"
            >
              <option value="" disabled>Driver 1</option>
              {drivers.map((d) => <option key={d.driver_number} value={d.driver_number}>{d.full_name}</option>)}
            </select>
            <select
              onChange={(e) => setDriver2(Number(e.target.value))}
              defaultValue=""
              className="flex-1 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-red-500"
            >
              <option value="" disabled>Driver 2</option>
              {drivers.map((d) => <option key={d.driver_number} value={d.driver_number}>{d.full_name}</option>)}
            </select>
          </div>
        )}

        {chartData.length > 0 && (
          <div className="bg-gray-800 rounded-2xl p-5">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="lap" stroke="#9ca3af" label={{ value: "Lap", position: "insideBottom", offset: -5, fill: "#9ca3af" }} />
                <YAxis stroke="#9ca3af" label={{ value: "Lap Time (s)", angle: -90, position: "insideLeft", fill: "#9ca3af" }} />
                <Tooltip contentStyle={{ background: "#111827", border: "none" }} />
                <Legend />
                <Line type="monotone" dataKey="driver1" name={d1?.full_name || "Driver 1"} stroke="#E10600" dot={false} connectNulls />
                <Line type="monotone" dataKey="driver2" name={d2?.full_name || "Driver 2"} stroke="#00D2BE" dot={false} connectNulls />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default LapComparison;