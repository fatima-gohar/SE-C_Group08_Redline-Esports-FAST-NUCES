/* ==========================================================================
   Redline Esports - Match Results Table Filtering & Inline Match Details View
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const resultsView = document.getElementById("resultsView");
  const detailsView = document.getElementById("detailsView");
  const backToResultsBtn = document.getElementById("backToResultsBtn");
  const tableBody = document.getElementById("matchesTableBody");
  const filterButtons = document.querySelectorAll(".filter-pill");

  const matchImageEl = document.getElementById("matchImage");
  const leaderboardLinkEl = document.getElementById("leaderboardLink");
  const matchTeamsEl = document.getElementById("matchTeams");
  const matchScoreEl = document.getElementById("matchScore");
  const matchDateEl = document.getElementById("matchDate");
  const matchMapEl = document.getElementById("matchMap");
  const matchTopPlayerEl = document.getElementById("matchTopPlayer");

  let activeGame = "all";

  function showMatchDetails(match) {
    matchImageEl.src = match.image;
    matchImageEl.alt = `${match.game} - ${match.teamA} vs ${match.teamB}`;

    leaderboardLinkEl.textContent = `See ${match.game} Leaderboard`;
    leaderboardLinkEl.href = `leaderboard.html?game=${encodeURIComponent(match.game)}`;

    const teamASpan = document.createElement("span");
    teamASpan.textContent = match.teamA;

    const vsSpan = document.createElement("span");
    vsSpan.className = "matchup-vs";
    vsSpan.textContent = "VS";

    const teamBSpan = document.createElement("span");
    teamBSpan.textContent = match.teamB;

    matchTeamsEl.replaceChildren(teamASpan, vsSpan, teamBSpan);
    matchScoreEl.textContent = match.score;
    matchDateEl.textContent = match.date;
    matchMapEl.textContent = match.map;
    matchTopPlayerEl.textContent = match.topPlayer;

    resultsView.hidden = true;
    detailsView.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showMatchResults() {
    detailsView.hidden = true;
    resultsView.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function createMatchRow(match) {
    const tr = document.createElement("tr");

    const dateTd = document.createElement("td");
    dateTd.className = "date-cell";
    dateTd.setAttribute("data-label", "Date");
    dateTd.textContent = match.date;

    const teamsTd = document.createElement("td");
    teamsTd.className = "teams-cell";
    teamsTd.setAttribute("data-label", "Teams");

    const teamAEl = document.createElement("span");
    teamAEl.className = "team-line";
    teamAEl.textContent = match.teamA;

    const vsEl = document.createElement("span");
    vsEl.className = "vs-line";
    vsEl.textContent = "vs";

    const teamBEl = document.createElement("span");
    teamBEl.className = "team-line";
    teamBEl.textContent = match.teamB;

    teamsTd.append(teamAEl, vsEl, teamBEl);

    const scoreTd = document.createElement("td");
    scoreTd.className = "score-cell";
    scoreTd.setAttribute("data-label", "Score");
    scoreTd.textContent = match.score;

    const winnerTd = document.createElement("td");
    winnerTd.className = "winner-cell";
    winnerTd.setAttribute("data-label", "Winner");
    winnerTd.textContent = match.winner;

    const actionTd = document.createElement("td");
    actionTd.setAttribute("data-label", "Action");

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn-details";
    btn.textContent = "View Details";
    btn.addEventListener("click", () => showMatchDetails(match));

    actionTd.appendChild(btn);
    tr.append(dateTd, teamsTd, scoreTd, winnerTd, actionTd);
    return tr;
  }

  function renderTable() {
    const filtered =
      activeGame === "all"
        ? MATCHES
        : MATCHES.filter((match) => match.game === activeGame);

    tableBody.replaceChildren(...filtered.map(createMatchRow));
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("is-active"));
      button.classList.add("is-active");
      activeGame = button.dataset.game;
      renderTable();
    });
  });

  backToResultsBtn.addEventListener("click", showMatchResults);

  renderTable();
});
