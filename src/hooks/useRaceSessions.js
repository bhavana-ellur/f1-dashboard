import { useState, useEffect } from "react";

// Reusable hook: fetches sessions of a given type for a season,
// tags each as past/upcoming, sorted most recent first.
function useRaceSessions(year = 2026, sessionName = null) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = sessionName
      ? `https://api.openf1.org/v1/sessions?year=${year}&session_name=${sessionName}`
      : `https://api.openf1.org/v1/sessions?year=${year}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const sorted = [...data].sort(
          (a, b) => new Date(b.date_start) - new Date(a.date_start)
        );

        const tagged = sorted.map((s) => ({
          ...s,
          isPast: new Date(s.date_start) < now,
        }));

        setSessions(tagged);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [year, sessionName]);

  return { sessions, loading, error };
}

export default useRaceSessions;