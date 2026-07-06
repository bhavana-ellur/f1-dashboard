import { useState } from "react";
import teams from "./data/teams";
import TeamCard from "./components/TeamCard";
import DriverCard from "./components/DriverCard";
import Navbar from "./components/Navbar";
import Standings from "./pages/Standings";
import ConstructorStandings from "./pages/ConstructorStandings";
import Calendar from "./pages/Calendar";
import Tracks from "./pages/Tracks";
import Weather from "./pages/Weather";
import LapComparison from "./pages/LapComparison";
import Telemetry from "./pages/Telemetry";
import Strategy from "./pages/Strategy";
import Prediction from "./pages/Prediction";
import About from "./pages/About";

function App() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [page, setPage] = useState("dashboard");

 if (selectedTeam) {
  return (
    <div
      className="min-h-screen text-white px-6 py-8"
      style={{
        background: `radial-gradient(circle at top, ${selectedTeam.color}22, #0a0e1a 60%)`,
      }}
    >
      <button
        onClick={() => setSelectedTeam(null)}
        className="px-5 py-2.5 rounded-lg font-semibold text-white mb-8 transition-opacity hover:opacity-90 shadow-lg"
        style={{ backgroundColor: selectedTeam.color }}
      >
        ← Back
      </button>

      <div className="flex flex-col items-center text-center mb-12">
        <div className="bg-white rounded-2xl px-8 py-5 shadow-2xl mb-6">
          <img
            src={selectedTeam.logo}
            alt={selectedTeam.name}
            className="w-40 h-20 object-contain"
          />
        </div>
        <h1
          className="text-5xl font-extrabold tracking-tight drop-shadow-lg"
          style={{ color: selectedTeam.color }}
        >
          {selectedTeam.name}
        </h1>
      </div>

      <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
        {selectedTeam.drivers.map((driver) => (
          <DriverCard key={driver.name} driver={driver} teamColor={selectedTeam.color} />
        ))}
      </div>
    </div>
  );
}

  return (
   <div className="min-h-screen w-full p-5 box-border bg-gradient-to-br from-gray-600 via-gray-500 to-gray-400 text-white">
      <Navbar page={page} setPage={setPage} />

      {page === "dashboard" && (
        <>
          <h1
          
            style={{
              textAlign: "center",
              fontSize: "2.8rem",
              fontWeight: "800",
              color: "#E10600",
              marginBottom: "40px",
            }}
          >
            Formula One Dashboard
          </h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(350px, 1fr))",
              gap: "60px",
              marginTop: "50px",
              padding: "0 60px",
            }}
          >
            {teams.map((team) => (
              <TeamCard key={team.name} team={team} onClick={() => setSelectedTeam(team)} />
            ))}
          </div>
        </>
      )}

      {page === "standings" && <Standings />}
      {page === "constructors" && <ConstructorStandings />}
      {page === "calendar" && <Calendar />}
      {page === "tracks" && <Tracks />}
      {page === "weather" && <Weather />}
      {page === "laps" && <LapComparison />}
      {page === "telemetry" && <Telemetry />}
      {page === "strategy" && <Strategy />}
      {page === "predictions" && <Prediction />}
      {page === "about" && <About />}
    </div>
  );
}

export default App;