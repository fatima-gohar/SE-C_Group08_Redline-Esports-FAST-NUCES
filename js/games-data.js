/* ==========================================================================
   Redline Esports - Shared Game Categories, Teams, Rankings & Hub Matches
   ========================================================================== */

const GAME_CATEGORIES = [
  {
    id: "Valorant",
    name: "Valorant",
    description: "Tactical 5v5 Shooter",
    image: "../images/matches/valorant-match.jpg",
    teams: [
      { name: "NUCES Raptors", captain: "Ayan Khan", record: "8W - 1L" },
      { name: "FAST Legends", captain: "Bilal Ahmed", record: "7W - 2L" },
      { name: "Campus Dragons", captain: "Saad Malik", record: "6W - 3L" },
      { name: "Redline Stars", captain: "Omar Raza", record: "5W - 4L" },
      { name: "NUST Titans", captain: "Hassan Raza", record: "5W - 4L" },
      { name: "FAST Phoenix", captain: "Talha Mehmood", record: "4W - 5L" },
    ],
    rankings: [
      { rank: 1, team: "NUCES Raptors", wins: 8, losses: 1, points: 1200 },
      { rank: 2, team: "FAST Legends", wins: 7, losses: 2, points: 1100 },
      { rank: 3, team: "Campus Dragons", wins: 6, losses: 3, points: 980 },
      { rank: 4, team: "Redline Stars", wins: 5, losses: 4, points: 860 },
      { rank: 5, team: "NUST Titans", wins: 5, losses: 4, points: 820 },
      { rank: 6, team: "FAST Phoenix", wins: 4, losses: 5, points: 720 },
    ],
  },
  {
    id: "COD",
    name: "COD",
    description: "Tactical Arena Shooter",
    image: "../images/matches/cs2-match.jpg",
    teams: [
      { name: "AIR Hawks", captain: "Bilal Nawaz", record: "8W - 1L" },
      { name: "NED Cobras", captain: "Farhan Javed", record: "6W - 3L" },
      { name: "Bahria Knights", captain: "Shahzaib Khan", record: "5W - 4L" },
      { name: "COMSATS Wolves", captain: "Zeeshan Malik", record: "4W - 5L" },
    ],
    rankings: [
      { rank: 1, team: "AIR Hawks", wins: 8, losses: 1, points: 1190 },
      { rank: 2, team: "NED Cobras", wins: 6, losses: 3, points: 1010 },
      { rank: 3, team: "Bahria Knights", wins: 5, losses: 4, points: 890 },
      { rank: 4, team: "COMSATS Wolves", wins: 4, losses: 5, points: 760 },
    ],
  },
  {
    id: "Fortnite",
    name: "Fortnite",
    description: "Battle Royale Building",
    image: "../images/matches/bgmi-match.jpg",
    teams: [
      { name: "LUMS Strikers", captain: "Omar Siddiqui", record: "7W - 2L" },
      { name: "NUCES Raptors", captain: "Daniyal Mirza", record: "6W - 3L" },
      { name: "IBA Falcons", captain: "Haris Qureshi", record: "5W - 4L" },
      { name: "Bahria Knights", captain: "Arsalan Tariq", record: "4W - 5L" },
    ],
    rankings: [
      { rank: 1, team: "LUMS Strikers", wins: 7, losses: 2, points: 1120 },
      { rank: 2, team: "NUCES Raptors", wins: 6, losses: 3, points: 990 },
      { rank: 3, team: "IBA Falcons", wins: 5, losses: 4, points: 870 },
      { rank: 4, team: "Bahria Knights", wins: 4, losses: 5, points: 740 },
    ],
  },
  {
    id: "BGMI",
    name: "BGMI",
    description: "Battle Royale Squads",
    image: "../images/matches/bgmi-match.jpg",
    teams: [
      { name: "FAST Legends", captain: "Hamza Tariq", record: "9W - 2L" },
      { name: "COMSATS Wolves", captain: "Usman Shah", record: "7W - 4L" },
      { name: "NUCES Raptors", captain: "Daniyal Mirza", record: "6W - 5L" },
      { name: "Campus Dragons", captain: "Fahad Noor", record: "5W - 6L" },
    ],
    rankings: [
      { rank: 1, team: "FAST Legends", wins: 9, losses: 2, points: 1240 },
      { rank: 2, team: "COMSATS Wolves", wins: 7, losses: 4, points: 1080 },
      { rank: 3, team: "NUCES Raptors", wins: 6, losses: 5, points: 940 },
      { rank: 4, team: "Campus Dragons", wins: 5, losses: 6, points: 860 },
    ],
  },
  {
    id: "CS2",
    name: "CS2",
    description: "Classic Bomb Defusal",
    image: "../images/matches/cs2-match.jpg",
    teams: [
      { name: "Redline Stars", captain: "Zain Ali", record: "8W - 2L" },
      { name: "GIKI Phantoms", captain: "Saad Tariq", record: "7W - 3L" },
      { name: "Campus Dragons", captain: "Taha Siddiqui", record: "6W - 4L" },
      { name: "UET Blazers", captain: "Adeel Khan", record: "4W - 6L" },
    ],
    rankings: [
      { rank: 1, team: "Redline Stars", wins: 8, losses: 2, points: 1180 },
      { rank: 2, team: "GIKI Phantoms", wins: 7, losses: 3, points: 1090 },
      { rank: 3, team: "Campus Dragons", wins: 6, losses: 4, points: 1020 },
      { rank: 4, team: "UET Blazers", wins: 4, losses: 6, points: 830 },
    ],
  },
];

const GENERAL_LEADERBOARD = [
  { rank: 1, team: "NUCES Raptors", wins: 8, losses: 1, points: 1200 },
  { rank: 2, team: "FAST Legends", wins: 7, losses: 2, points: 1100 },
  { rank: 3, team: "Campus Dragons", wins: 6, losses: 3, points: 980 },
  { rank: 4, team: "Redline Stars", wins: 5, losses: 4, points: 860 },
  { rank: 5, team: "NUST Titans", wins: 5, losses: 4, points: 840 },
  { rank: 6, team: "GIKI Phantoms", wins: 5, losses: 4, points: 820 },
  { rank: 7, team: "AIR Hawks", wins: 5, losses: 4, points: 800 },
  { rank: 8, team: "LUMS Strikers", wins: 4, losses: 5, points: 770 },
  { rank: 9, team: "COMSATS Wolves", wins: 4, losses: 5, points: 740 },
  { rank: 10, team: "NED Cobras", wins: 4, losses: 5, points: 710 },
  { rank: 11, team: "IBA Falcons", wins: 3, losses: 6, points: 670 },
  { rank: 12, team: "UET Blazers", wins: 3, losses: 6, points: 640 },
  { rank: 13, team: "Bahria Knights", wins: 2, losses: 7, points: 590 },
  { rank: 14, team: "FAST Phoenix", wins: 2, losses: 7, points: 550 },
];

/**
 * Resolves a game category object from a query parameter or defaults to Valorant.
 * @param {string|null} gameParam
 * @returns {object}
 */
function getGameCategory(gameParam) {
  if (!gameParam) return GAME_CATEGORIES[0];
  const normalized = gameParam.trim().toLowerCase();
  return (
    GAME_CATEGORIES.find((cat) => cat.id.toLowerCase() === normalized) ||
    GAME_CATEGORIES[0]
  );
}

/**
 * Builds the shared two-column Rankings table + Trophy panel layout.
 * @param {Array<object>} rankings
 * @returns {HTMLElement}
 */
function buildRankingsLayout(rankings) {
  const layout = document.createElement("div");
  layout.className = "leaderboard-layout";

  const tableCard = document.createElement("div");
  tableCard.className = "hub-table-card";

  const table = document.createElement("table");
  table.className = "hub-table";

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  ["#", "Teams", "Wins", "Losses", "Points"].forEach((heading) => {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = heading;
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);

  const tbody = document.createElement("tbody");
  rankings.forEach((entry) => {
    const tr = document.createElement("tr");

    const rankTd = document.createElement("td");
    rankTd.setAttribute("data-label", "#");
    const rankSpan = document.createElement("span");
    rankSpan.className = entry.rank === 1 ? "rank-badge rank-top" : "rank-badge";
    rankSpan.textContent = entry.rank;
    rankTd.appendChild(rankSpan);

    const teamTd = document.createElement("td");
    teamTd.className = "team-name-cell";
    teamTd.setAttribute("data-label", "Teams");
    teamTd.textContent = entry.team;

    const winsTd = document.createElement("td");
    winsTd.setAttribute("data-label", "Wins");
    winsTd.textContent = entry.wins;

    const lossesTd = document.createElement("td");
    lossesTd.setAttribute("data-label", "Losses");
    lossesTd.textContent = entry.losses;

    const pointsTd = document.createElement("td");
    pointsTd.className = "points-cell";
    pointsTd.setAttribute("data-label", "Points");
    pointsTd.textContent = entry.points;

    tr.append(rankTd, teamTd, winsTd, lossesTd, pointsTd);
    tbody.appendChild(tr);
  });

  table.append(thead, tbody);
  tableCard.appendChild(table);

  const trophyCard = document.createElement("aside");
  trophyCard.className = "trophy-card";
  trophyCard.setAttribute("aria-label", "Division Trophy");

  const trophyImg = document.createElement("img");
  trophyImg.src = "../images/trophy.jpg";
  trophyImg.alt = "Redline Esports Championship Trophy";
  trophyImg.className = "trophy-image";

  const trophyCaption = document.createElement("span");
  trophyCaption.className = "trophy-caption";
  trophyCaption.textContent = "Trophy";

  trophyCard.append(trophyImg, trophyCaption);
  layout.append(tableCard, trophyCard);
  return layout;
}
