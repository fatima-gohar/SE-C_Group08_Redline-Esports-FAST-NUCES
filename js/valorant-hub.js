/* ==========================================================================
   Redline Esports - Game Hub Page (Matches / Teams / Rankings tabs)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const gameParam = params.get("game");
  const category = getGameCategory(gameParam);

  // Update page headings
  const hubTitle = document.getElementById("hubTitle");
  const hubSubtitle = document.getElementById("hubSubtitle");
  if (hubTitle) {
    hubTitle.innerHTML = `${category.name} <span>Hub</span>`;
  }
  if (hubSubtitle) {
    hubSubtitle.textContent = `Matches, teams and rankings for ${category.name}.`;
  }

  // Update leaderboard link
  const hubLeaderboardLink = document.getElementById("hubLeaderboardLink");
  if (hubLeaderboardLink) {
    hubLeaderboardLink.href = `leaderboard.html?game=${encodeURIComponent(category.id)}`;
  }

  // Tab switching
  const tabs = document.querySelectorAll(".hub-tab[data-tab]");
  const panels = {
    matches: document.getElementById("tabMatches"),
    teams: document.getElementById("tabTeams"),
    rankings: document.getElementById("tabRankings"),
  };

  function showTab(tabId) {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.tab === tabId;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });
    Object.entries(panels).forEach(([id, panel]) => {
      if (panel) panel.hidden = id !== tabId;
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => showTab(tab.dataset.tab));
  });

  // Render Matches tab
  function renderMatches() {
    const tbody = document.getElementById("hubMatchesBody");
    if (!tbody) return;

    // Filter MATCHES from matches-data.js by current game
    const gameMatches = (typeof MATCHES !== "undefined" ? MATCHES : []).filter(
      (m) => m.game === category.id
    );

    if (gameMatches.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="padding:1.5rem;text-align:center;color:var(--text-muted)">No matches found for ${category.name}.</td></tr>`;
      return;
    }

    tbody.replaceChildren(
      ...gameMatches.map((match) => {
        const tr = document.createElement("tr");

        const dateTd = document.createElement("td");
        dateTd.setAttribute("data-label", "Date");
        dateTd.className = "date-cell";
        dateTd.textContent = match.date;

        const teamsTd = document.createElement("td");
        teamsTd.setAttribute("data-label", "Teams");
        teamsTd.innerHTML = `<span class="team-line">${match.teamA}</span><span class="vs-line">vs</span><span class="team-line">${match.teamB}</span>`;

        const scoreTd = document.createElement("td");
        scoreTd.setAttribute("data-label", "Score");
        scoreTd.className = "score-cell";
        scoreTd.textContent = match.score;

        const winnerTd = document.createElement("td");
        winnerTd.setAttribute("data-label", "Winner");
        winnerTd.className = "winner-cell";
        winnerTd.textContent = match.winner;

        const actionTd = document.createElement("td");
        actionTd.setAttribute("data-label", "Action");
        const btn = document.createElement("a");
        btn.href = `match-results.html?match=${match.id}&from=valorant-hub`;
        btn.className = "btn-row-action";
        btn.textContent = "View Details";
        actionTd.appendChild(btn);

        tr.append(dateTd, teamsTd, scoreTd, winnerTd, actionTd);
        return tr;
      })
    );
  }

  // Render Teams tab
  function renderTeams() {
    const tbody = document.getElementById("hubTeamsBody");
    if (!tbody) return;

    tbody.replaceChildren(
      ...category.teams.map((team) => {
        const tr = document.createElement("tr");

        const nameTd = document.createElement("td");
        nameTd.setAttribute("data-label", "Team");
        nameTd.className = "team-name-cell";
        nameTd.textContent = team.name;

        const captainTd = document.createElement("td");
        captainTd.setAttribute("data-label", "Captain");
        captainTd.textContent = team.captain;

        const recordTd = document.createElement("td");
        recordTd.setAttribute("data-label", "Record");
        recordTd.textContent = team.record;

        tr.append(nameTd, captainTd, recordTd);
        return tr;
      })
    );
  }

  // Render Rankings tab
  function renderRankings() {
    const contentEl = document.getElementById("hubRankingsContent");
    if (!contentEl) return;
    contentEl.replaceChildren(buildRankingsLayout(category.rankings));
  }

  renderMatches();
  renderTeams();
  renderRankings();
  showTab("matches");
});
