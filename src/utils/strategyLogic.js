export function getDryStrategy(laps, degradation) {
  if (degradation === "low") {
    return {
      stops: "1-Stop",
      tires: ["Medium", "Hard"],
      note: `Low tire degradation over ${laps} laps supports a single stop — this keeps track position and avoids extra time loss in the pits.`,
    };
  }
  if (degradation === "medium") {
    if (laps > 60) {
      return {
        stops: "2-Stop",
        tires: ["Soft", "Medium", "Hard"],
        note: `At ${laps} laps with medium degradation, tire life likely won't stretch to a 1-stop — a 2-stop keeps drivers on faster compounds longer.`,
      };
    }
    return {
      stops: "1-Stop",
      tires: ["Soft", "Hard"],
      note: `Medium degradation over a shorter ${laps}-lap race can still support a 1-stop if the Hard compound is managed carefully in the final stint.`,
    };
  }
  return {
    stops: "2-Stop",
    tires: ["Soft", "Medium", "Hard"],
    note: `High degradation means tires fall off quickly — a 2-stop keeps drivers on fresher rubber and avoids a late-race pace collapse.`,
  };
}

export function getStrategy(laps, degradation, rainChance) {
  if (rainChance >= 60) {
    return {
      stops: "Reactive (Wet)",
      tires: ["Intermediate", "Wet (if rain intensifies)", "Slick (once track dries)"],
      note: `${rainChance}% rain probability means a fixed dry strategy isn't safe to commit to. Teams will react lap-by-lap to track conditions.`,
    };
  }
  if (rainChance >= 25) {
    const base = getDryStrategy(laps, degradation);
    return {
      ...base,
      note: `${base.note} However, there's a ${rainChance}% chance of rain — teams will likely keep Intermediates ready on the pit wall as a contingency.`,
    };
  }
  return getDryStrategy(laps, degradation);
}