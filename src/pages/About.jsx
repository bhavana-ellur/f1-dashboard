function About() {
  return (
    <div className="px-4 py-6">
      <h1 className="text-center text-4xl md:text-5xl font-extrabold text-red-600 mb-8">
        About This Project
      </h1>

      <div className="max-w-2xl mx-auto bg-gray-800 rounded-2xl p-8 text-white space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-2">What is this?</h2>
          <p className="text-gray-300 leading-relaxed">
            An F1 analytics dashboard built with React that combines live standings,
            race schedules, weather forecasts, telemetry, and lap time data with two
            custom-built tools: a pit strategy simulator and a race winner prediction
            model. It's designed to feel like a real motorsport data platform, not just
            a static team roster.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Tech Stack</h2>
          <ul className="text-gray-300 space-y-1 list-disc list-inside">
            <li>React + Vite</li>
            <li>Tailwind CSS</li>
            <li>Recharts (lap time and telemetry charts)</li>
            <li>Jolpica-F1 API (standings, calendar, results)</li>
            <li>OpenF1 API (sessions, weather, laps, telemetry)</li>
            <li>Open-Meteo API (race weekend rain forecasts)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">How the Prediction Model Works</h2>
          <p className="text-gray-300 leading-relaxed">
            The Race Winner Prediction page uses a weighted statistical scoring model —
            not machine learning. It combines each driver's championship points (60%),
            their constructor's points (30%), and a bonus for standings position (10%)
            into a single score, then converts the top 5 scores into relative win
            probabilities. It's a transparent, explainable heuristic rather than a
            trained model, and it doesn't account for track-specific history,
            qualifying pace, or race-day incidents.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">How the Pit Strategy Simulator Works</h2>
          <p className="text-gray-300 leading-relaxed">
            A rules-based system that recommends a tire strategy from race length,
            track-specific tire degradation, and real rain forecast data (via
            Open-Meteo) for the next race on the calendar. High rain probability
            overrides fixed strategy entirely in favor of a reactive approach, matching
            how real teams handle changeable conditions.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Data Accuracy Note</h2>
          <p className="text-gray-300 leading-relaxed">
            Live data (standings, calendar, weather, lap times, telemetry) comes
            directly from the APIs above and updates automatically. Driver career
            statistics and track degradation ratings are curated estimates, current as
            of mid-2026 season, and not pulled from a live official source.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;