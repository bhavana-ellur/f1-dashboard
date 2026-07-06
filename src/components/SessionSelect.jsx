function SessionSelect({ sessions, onSelect, selectedSession }) {
  if (selectedSession) {
    return (
      <div className="flex items-center justify-between mb-4 bg-gray-800 rounded-xl px-5 py-3">
        <span className="text-white font-semibold">
          {selectedSession.location} — {new Date(selectedSession.date_start).toLocaleDateString()}
        </span>
        <button
          onClick={() => onSelect(null)}
          className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors"
        >
          Change
        </button>
      </div>
    );
  }

  return (
    <select
      onChange={(e) => {
        const session = sessions.find((s) => s.session_key == e.target.value);
        if (!session.isPast) return;
        onSelect(session);
      }}
      defaultValue=""
      className="w-full p-3 rounded-lg mb-4 bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-red-500"
    >
      <option value="" disabled>Select a session</option>
      {sessions.map((s) => (
        <option key={s.session_key} value={s.session_key} disabled={!s.isPast}>
          {s.location} — {s.session_name ? `${s.session_name} — ` : ""}
          {new Date(s.date_start).toLocaleDateString()}
          {!s.isPast ? " — Upcoming (no data yet)" : ""}
        </option>
      ))}
    </select>
  );
}

export default SessionSelect;