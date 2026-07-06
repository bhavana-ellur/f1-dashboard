const teams = [
  {
    name: "McLaren",
    color: "#FF8000",
    logo: "/logos/mclaren.png",
    drivers: [
      { name: "Oscar Piastri", age: 25, nationality: "Australian", number: 81, photo: "/drivers/piastri.webp", wins: 9, podiums: 28, poles: 6, championships: 0 },
      { name: "Lando Norris", age: 26, nationality: "British", number: 4, photo: "/drivers/norris.jpeg", wins: 11, podiums: 46, poles: 16, championships: 1 },
    ],
  },
  {
    name: "Ferrari",
    color: "#DC0000",
    logo: "/logos/ferrari.png",
    drivers: [
      { name: "Charles Leclerc", age: 28, nationality: "Monégasque", number: 16, photo: "/drivers/leclare.jpeg", wins: 8, podiums: 52, poles: 27, championships: 0 },
      { name: "Lewis Hamilton", age: 41, nationality: "British", number: 44, photo: "/drivers/hamilton.jpeg", wins: 105, podiums: 202, poles: 104, championships: 7 },
    ],
  },
  {
    name: "Mercedes",
    color: "#00D2BE",
    logo: "/logos/mercedes.png",
    drivers: [
      { name: "George Russell", age: 28, nationality: "British", number: 63, photo: "/drivers/russel.webp", wins: 7, podiums: 28, poles: 11, championships: 0 },
      { name: "Kimi Antonelli", age: 20, nationality: "Italian", number: 12, photo: "/drivers/antonelli.jpeg", wins: 0, podiums: 2, poles: 1, championships: 0 },
    ],
  },
  {
    name: "Red Bull",
    color: "#0600EF",
    logo: "/logos/redbull.png",
    drivers: [
      { name: "Max Verstappen", age: 28, nationality: "Dutch", number: 1, photo: "/drivers/verstappan.jpeg", wins: 71, podiums: 127, poles: 48, championships: 4 },
      { name: "Isack Hadjar", age: 20, nationality: "French and Algerian", number: 6, photo: "/drivers/hadjar.jpeg", wins: 0, podiums: 1, poles: 0, championships: 0 },
    ],
  },
  {
    name: "Aston Martin",
    color: "#006F62",
    logo: "/logos/astonmartin.png",
    drivers: [
      { name: "Fernando Alonso", age: 45, nationality: "Spanish", number: 14, photo: "/drivers/alonso.jpeg", wins: 32, podiums: 106, poles: 22, championships: 2 },
      { name: "Lance Stroll", age: 28, nationality: "Canadian", number: 18, photo: "/drivers/stroll.jpeg", wins: 0, podiums: 3, poles: 1, championships: 0 },
    ],
  },
  {
    name: "Alpine",
    color: "#0090FF",
    logo: "/logos/alpine.png",
    drivers: [
      { name: "Pierre Gasly", age: 30, nationality: "French", number: 10, photo: "/drivers/gasely.jpeg", wins: 1, podiums: 4, poles: 1, championships: 0 },
      { name: "Franco Colapinto", age: 23, nationality: "Argentinian", number: 43, photo: "/drivers/colapinto.webp", wins: 0, podiums: 0, poles: 0, championships: 0 },
    ],
  },
  {
    name: "Haas",
    color: "#B6BABD",
    logo: "/logos/haas.png",
    drivers: [
      { name: "Esteban Ocon", age: 30, nationality: "French", number: 31, photo: "/drivers/ocon.jpeg", wins: 1, podiums: 3, poles: 0, championships: 0 },
      { name: "Oliver Bearman", age: 21, nationality: "British", number: 87, photo: "/drivers/bearman.jpeg", wins: 0, podiums: 0, poles: 0, championships: 0 },
    ],
  },
  {
    name: "Williams",
    color: "#005AFF",
    logo: "/logos/williams.png",
    drivers: [
      { name: "Alexander Albon", age: 30, nationality: "Thai", number: 23, photo: "/drivers/albon.webp", wins: 0, podiums: 2, poles: 0, championships: 0 },
      { name: "Carlos Sainz", age: 32, nationality: "Spanish", number: 55, photo: "/drivers/sainz.webp", wins: 4, podiums: 26, poles: 6, championships: 0 },
    ],
  },
  {
    name: "Racing Bulls",
    color: "#1E41FF",
    logo: "/logos/racingbull.png",
    drivers: [
      { name: "Liam Lawson", age: 24, nationality: "New Zealander", number: 30, photo: "/drivers/lawson.jpeg", wins: 0, podiums: 0, poles: 0, championships: 0 },
      { name: "Isack Hadjar", age: 20, nationality: "French", number: 6, photo: "/drivers/hadjar.jpeg", wins: 0, podiums: 1, poles: 0, championships: 0 },
    ],
  },
  {
    name: "Audi",
    color: "#E10600",
    logo: "/logos/audi.svg",
    drivers: [
      { name: "Nico Hulkenberg", age: 39, nationality: "German", number: 27, photo: "/drivers/hulkenberg.jpeg", wins: 0, podiums: 1, poles: 1, championships: 0 },
      { name: "Gabriel Bortoleto", age: 22, nationality: "Brazilian", number: 5, photo: "/drivers/bortoleto.jpeg", wins: 0, podiums: 0, poles: 0, championships: 0 },
    ],
  },
  {
    name: "Cadillac",
    color: "#2C2C2C",
    logo: "/logos/cadillac.png",
    drivers: [
      { name: "Sergio Perez", age: 36, nationality: "Mexican", number: 11, photo: "/drivers/perez.webp", wins: 6, podiums: 39, poles: 3, championships: 0 },
      { name: "Valtteri Bottas", age: 37, nationality: "Finnish", number: 77, photo: "/drivers/bottas.jpeg", wins: 10, podiums: 67, poles: 20, championships: 0 },
    ],
  },
];

export default teams;