/* ==========================================================================
   Redline Esports - Game Categories 4-State Interactive Flow
   ========================================================================== */

const GAME_CATEGORIES = [
  {
    id: "Valorant",
    name: "Valorant",
    description: "Tactical 5v5 Shooter",
    image: "../images/matches/valorant-match.jpg",
    teams: [
      { name: "Nuces Raptors", captain: "Ayan Khan", record: "8W - 1L" },
      { name: "FAST Legends", captain: "Bilal Ahmed", record: "7W - 2L" },
      { name: "Campus Dragons", captain: "Saad Malik", record: "6W - 3L" },
      { name: "Redline Stars", captain: "Omar Raza", record: "5W - 4L" },
    ],
    rankings: [
      { rank: 1, team: "Nuces Raptors", wins: 8, losses: 1, points: 1200 },
      { rank: 2, team: "FAST Legends", wins: 7, losses: 2, points: 1100 },
      { rank: 3, team: "Campus Dragons", wins: 6, losses: 3, points: 980 },
      { rank: 4, team: "Redline Stars", wins: 5, losses: 4, points: 960 },
    ],
  },
  {
    id: "BGMI",
    name: "BGMI",
    description: "Battle Royale Squads",
    image: "../images/matches/bgmi-match.jpg",
    teams: [
      { name: "FAST Legends", captain: "Hamza Tariq", record: "9W - 2L" },
      { name: "BGMI Fighters", captain: "Usman Shah", record: "7W - 4L" },
      { name: "Nuces Raptors", captain: "Daniyal Mirza", record: "6W - 5L" },
      { name: "Campus Dragons", captain: "Fahad Noor", record: "5W - 6L" },
    ],
    rankings: [
      { rank: 1, team: "FAST Legends", wins: 9, losses: 2, points: 1240 },
      { rank: 2, team: "BGMI Fighters", wins: 7, losses: 4, points: 1080 },
      { rank: 3, team: "Nuces Raptors", wins: 6, losses: 5, points: 940 },
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
      { name: "Campus Dragons", captain: "Taha Siddiqui", record: "6W - 4L" },
      { name: "Nuces Raptors", captain: "Hammad Qureshi", record: "5W - 5L" },
      { name: "FAST Legends", captain: "Adeel Khan", record: "4W - 6L" },
    ],
    rankings: [
      { rank: 1, team: "Redline Stars", wins: 8, losses: 2, points: 1180 },
      { rank: 2, team: "Campus Dragons", wins: 6, losses: 4, points: 1020 },
      { rank: 3, team: "Nuces Raptors", wins: 5, losses: 5, points: 910 },
      { rank: 4, team: "FAST Legends", wins: 4, losses: 6, points: 830 },
    ],
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const categoriesView = document.getElementById("categoriesView");
  const hubView = document.getElementById("hubView");
  const catDetailsView = document.getElementById("catDetailsView");
  const catLeaderboardView = document.getElementById("catLeaderboardView");

  const categoryGrid = document.getElementById("categoryGrid");
  const hubTitle = document.getElementById("hubTitle");
  const hubContent = document.getElementById("hubContent");
  const hubTabs = document.querySelectorAll(".hub-tab");

  const catMatchImage = document.getElementById("catMatchImage");
  const seeLeaderboardBtn = document.getElementById("seeLeaderboardBtn");
  const catMatchTeams = document.getElementById("catMatchTeams");
  const catMatchScore = document.getElementById("catMatchScore");
  const catMatchDate = document.getElementById("catMatchDate");
  const catMatchMap = document.getElementById("catMatchMap");
  const catMatchTopPlayer = document.getElementById("catMatchTopPlayer");

  const catLeaderboardTitle = document.getElementById("catLeaderboardTitle");
  const catLeaderboardSubtitle = document.getElementById("catLeaderboardSubtitle");
  const catLeaderboardContent = document.getElementById("catLeaderboardContent");

  let selectedCategory = GAME_CATEGORIES[0];
  let activeTab = "matches";

  function switchView(targetView) {
    [categoriesView, hubView, catDetailsView, catLeaderboardView].forEach((section) => {
      section.hidden = section !== targetView;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderCategoryCards() {
    const cards = GAME_CATEGORIES.map((category) => {
      const card = document.createElement("article");
      card.className = "category-card";

      const thumb = document.createElement("div");
      thumb.className = "category-thumb";

      const img = document.createElement("img");
      img.src = category.image;
      img.alt = `${category.name} Esports`;
      thumb.appendChild(img);

      const body = document.createElement("div");
      body.className = "category-body";

      const title = document.createElement("h2");
      title.className = "category-title";
      title.textContent = category.name;

      const desc = document.createElement("p");
      desc.className = "category-desc";
      desc.textContent = category.description;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn-view-game";
      btn.textContent = "View Game";
      btn.addEventListener("click", () => openGameHub(category.id));

      body.append(title, desc, btn);
      card.append(thumb, body);
      return card;
    });

    categoryGrid.replaceChildren(...cards);
  }

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
    trophyImg.alt = "Redline Esports Trophy";
    trophyImg.className = "trophy-image";

    const trophyCaption = document.createElement("span");
    trophyCaption.className = "trophy-caption";
    trophyCaption.textContent = "Trophy";

    trophyCard.append(trophyImg, trophyCaption);
    layout.append(tableCard, trophyCard);
    return layout;
  }

  function renderHubContent() {
    if (activeTab === "matches") {
      const matches = MATCHES.filter((m) => m.game === selectedCategory.id);
      const card = document.createElement("div");
      card.className = "hub-table-card";

      const table = document.createElement("table");
      table.className = "hub-table";

      const thead = document.createElement("thead");
      const headRow = document.createElement("tr");
      ["Matchup", "Score", "Date", "Action"].forEach((col) => {
        const th = document.createElement("th");
        th.scope = "col";
        th.textContent = col;
        headRow.appendChild(th);
      });
      thead.appendChild(headRow);

      const tbody = document.createElement("tbody");
      matches.forEach((match) => {
        const tr = document.createElement("tr");

        const matchupTd = document.createElement("td");
        matchupTd.setAttribute("data-label", "Matchup");
        matchupTd.textContent = `${match.teamA} vs ${match.teamB}`;

        const scoreTd = document.createElement("td");
        scoreTd.setAttribute("data-label", "Score");
        scoreTd.textContent = match.score;

        const dateTd = document.createElement("td");
        dateTd.setAttribute("data-label", "Date");
        dateTd.textContent = match.date;

        const actionTd = document.createElement("td");
        actionTd.setAttribute("data-label", "Action");
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn-row-action";
        btn.textContent = "View Details";
        btn.addEventListener("click", () => openMatchDetails(match));
        actionTd.appendChild(btn);

        tr.append(matchupTd, scoreTd, dateTd, actionTd);
        tbody.appendChild(tr);
      });

      table.append(thead, tbody);
      card.appendChild(table);
      hubContent.replaceChildren(card);
      return;
    }

    if (activeTab === "teams") {
      const card = document.createElement("div");
      card.className = "hub-table-card";

      const table = document.createElement("table");
      table.className = "hub-table";

      const thead = document.createElement("thead");
      const headRow = document.createElement("tr");
      ["Team", "Captain", "Record"].forEach((col) => {
        const th = document.createElement("th");
        th.scope = "col";
        th.textContent = col;
        headRow.appendChild(th);
      });
      thead.appendChild(headRow);

      const tbody = document.createElement("tbody");
      selectedCategory.teams.forEach((team) => {
        const tr = document.createElement("tr");

        const nameTd = document.createElement("td");
        nameTd.setAttribute("data-label", "Team");
        nameTd.textContent = team.name;

        const captainTd = document.createElement("td");
        captainTd.setAttribute("data-label", "Captain");
        captainTd.textContent = team.captain;

        const recordTd = document.createElement("td");
        recordTd.setAttribute("data-label", "Record");
        recordTd.textContent = team.record;

        tr.append(nameTd, captainTd, recordTd);
        tbody.appendChild(tr);
      });

      table.append(thead, tbody);
      card.appendChild(table);
      hubContent.replaceChildren(card);
      return;
    }

    hubContent.replaceChildren(buildRankingsLayout(selectedCategory.rankings));
  }

  function openGameHub(gameId) {
    selectedCategory = GAME_CATEGORIES.find((c) => c.id === gameId) || GAME_CATEGORIES[0];
    activeTab = "matches";

    hubTitle.innerHTML = `${selectedCategory.name} <span>Hub</span>`;

    hubTabs.forEach((tab) => {
      const isMatches = tab.dataset.tab === "matches";
      tab.classList.toggle("is-active", isMatches);
      tab.setAttribute("aria-selected", String(isMatches));
    });

    renderHubContent();
    switchView(hubView);
  }

  function openMatchDetails(match) {
    catMatchImage.src = match.image;
    catMatchImage.alt = `${match.game} - ${match.teamA} vs ${match.teamB}`;
    seeLeaderboardBtn.textContent = `See ${match.game} Leaderboard`;

    const teamASpan = document.createElement("span");
    teamASpan.textContent = match.teamA;

    const vsSpan = document.createElement("span");
    vsSpan.className = "matchup-vs";
    vsSpan.textContent = "VS";

    const teamBSpan = document.createElement("span");
    teamBSpan.textContent = match.teamB;

    catMatchTeams.replaceChildren(teamASpan, vsSpan, teamBSpan);
    catMatchScore.textContent = match.score;
    catMatchDate.textContent = match.date;
    catMatchMap.textContent = match.map;
    catMatchTopPlayer.textContent = match.topPlayer;

    switchView(catDetailsView);
  }

  function openGameLeaderboard() {
    catLeaderboardTitle.innerHTML = `${selectedCategory.name} <span>Leaderboard</span>`;
    catLeaderboardSubtitle.textContent = `Top teams in ${selectedCategory.name}.`;
    catLeaderboardContent.replaceChildren(buildRankingsLayout(selectedCategory.rankings));
    switchView(catLeaderboardView);
  }

  hubTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activeTab = tab.dataset.tab;
      hubTabs.forEach((btn) => {
        const active = btn === tab;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-selected", String(active));
      });
      renderHubContent();
    });
  });

  document.getElementById("backToCategoriesBtn").addEventListener("click", () => {
    switchView(categoriesView);
  });

  document.getElementById("backToHubBtn").addEventListener("click", () => {
    switchView(hubView);
  });

  seeLeaderboardBtn.addEventListener("click", openGameLeaderboard);

  document.getElementById("backFromLeaderboardBtn").addEventListener("click", () => {
    activeTab = "matches";
    openGameHub(selectedCategory.id);
  });

  renderCategoryCards();
});
