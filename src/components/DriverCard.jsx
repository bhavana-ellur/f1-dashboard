function DriverCard({ driver, teamColor }) {
  return (
    <div
      className="w-full sm:w-64 rounded-2xl overflow-hidden shadow-2xl bg-gray-950 border-2 transition-transform duration-300 hover:-translate-y-2"
      style={{ borderColor: teamColor }}
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-900">
        <img
          src={driver.photo}
          alt={driver.name}
          className="w-full h-full object-cover object-top"
        />
        {/* fade the bottom of the photo into the card background for a seamless look */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-gray-950 to-transparent" />
      </div>

      <div className="p-5 text-white -mt-6 relative">
        <h2 className="text-xl font-bold mb-1">{driver.name}</h2>
        <p className="text-gray-400 text-sm mb-3">
          {driver.nationality} · Age {driver.age}
        </p>

        <div
          className="inline-block px-3 py-1 rounded-full text-sm font-bold mb-4"
          style={{ backgroundColor: teamColor }}
        >
          #{driver.number}
        </div>

        <div className="border-t border-gray-700 pt-4 grid grid-cols-2 gap-y-2 text-sm">
          <div>
            <span className="text-gray-500">Wins</span>
            <p className="font-semibold text-base">{driver.wins}</p>
          </div>
          <div>
            <span className="text-gray-500">Podiums</span>
            <p className="font-semibold text-base">{driver.podiums}</p>
          </div>
          <div>
            <span className="text-gray-500">Poles</span>
            <p className="font-semibold text-base">{driver.poles}</p>
          </div>
          <div>
            <span className="text-gray-500">Championships</span>
            <p className="font-semibold text-base">{driver.championships}</p>
          </div>
        </div>

        <p className="text-xs text-gray-600 mt-4">Career stats as of mid-2026 season</p>
      </div>
    </div>
  );
}

export default DriverCard;