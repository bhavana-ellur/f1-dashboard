function TeamCard({ team, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: team.color,
        borderRadius: "20px",
        padding: "25px",
        cursor: "pointer",
        textAlign: "center",
        minHeight: "220px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        border: "2px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
        transition: "0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
      }}
    >
      <img
        src={team.logo}
        alt={team.name}
        style={{
          width: "120px",
          height: "80px",
          objectFit: "contain",
          marginBottom: "15px",
        }}
      />
      <h2>{team.name}</h2>
    </div>
  );
}

export default TeamCard;