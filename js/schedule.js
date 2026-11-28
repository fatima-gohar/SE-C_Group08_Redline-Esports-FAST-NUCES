// Match entries sorted chronologically (all in Dec 2026):
// teamA: first team name, teamB: opponent team name, game: game title, date: ISO Date string.
const MATCHES = [
    { teamA: "NUST Titans", teamB: "COMSATS Wolves", game: "Fortnite", date: "2026-12-06T17:00:00" },
    { teamA: "LUMS Strikers", teamB: "GIKI Phantoms", game: "Valorant", date: "2026-12-11T19:00:00" },
    { teamA: "IBA Falcons", teamB: "UET Blazers", game: "COD", date: "2026-12-15T20:00:00" },
    { teamA: "NUCES Raptors", teamB: "Fast Legends", game: "Valorant", date: "2026-12-20T18:00:00" },
    { teamA: "Campus Dragons", teamB: "Redline Stars", game: "COD", date: "2026-12-21T19:00:00" },
    { teamA: "Bahria Knights", teamB: "NUST Titans", game: "Fortnite", date: "2026-12-24T18:30:00" },
    { teamA: "FAST Phoenix", teamB: "LUMS Strikers", game: "Valorant", date: "2026-12-27T20:00:00" },
    { teamA: "Redline Stars", teamB: "GIKI Phantoms", game: "Fortnite", date: "2026-12-30T21:00:00" }
];

// Format an ISO date string into a readable schedule string such as "20 Dec, 6:00 PM".
function formatMatchDate(dateStr) {
    const matchDate = new Date(dateStr);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = matchDate.getDate();
    const month = months[matchDate.getMonth()];

    let hours = matchDate.getHours();
    const minutes = String(matchDate.getMinutes()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return day + " " + month + ", " + hours + ":" + minutes + " " + period;
}

// Create and return a DOM row element displaying Team A, VS, Team B, the game badge, and date/time.
function createMatchRow(match) {
    const row = document.createElement("article");
    row.className = "match-row";

    const teamsWrap = document.createElement("div");
    teamsWrap.className = "match-teams";

    const teamAEl = document.createElement("span");
    teamAEl.className = "team-name";
    teamAEl.textContent = match.teamA;

    const vsEl = document.createElement("span");
    vsEl.className = "vs-badge";
    vsEl.textContent = "VS";

    const teamBEl = document.createElement("span");
    teamBEl.className = "team-name";
    teamBEl.textContent = match.teamB;

    teamsWrap.appendChild(teamAEl);
    teamsWrap.appendChild(vsEl);
    teamsWrap.appendChild(teamBEl);

    // Group the game badge pill and match date/time together so mobile stacks them under the teams.
    const metaWrap = document.createElement("div");
    metaWrap.className = "match-meta";

    // Build the game badge pill with a lowercase modifier class and neutral grey fallback.
    const badgeEl = document.createElement("span");
    const gameKey = String(match.game || "unknown").trim().toLowerCase().replace(/\s+/g, "-");
    badgeEl.className = "game-badge game-badge--" + gameKey;
    badgeEl.textContent = match.game;

    const dateEl = document.createElement("div");
    dateEl.className = "match-datetime";
    dateEl.textContent = formatMatchDate(match.date);

    metaWrap.appendChild(badgeEl);
    metaWrap.appendChild(dateEl);

    row.appendChild(teamsWrap);
    row.appendChild(metaWrap);

    return row;
}

// Filter matches by the selected game and render rows into the schedule container.
function renderMatches(gameFilter) {
    const listEl = document.getElementById("scheduleList");
    const emptyEl = document.getElementById("noMatchesMessage");

    const filtered = gameFilter === "All"
        ? MATCHES
        : MATCHES.filter(function (match) {
            return match.game === gameFilter;
        });

    listEl.innerHTML = "";

    if (filtered.length === 0) {
        emptyEl.classList.remove("d-none");
        return;
    }

    emptyEl.classList.add("d-none");

    filtered.forEach(function (match) {
        listEl.appendChild(createMatchRow(match));
    });
}

// Highlight the selected filter button and update its aria-pressed state.
function setActiveFilter(selectedBtn) {
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(function (btn) {
        const isSelected = btn === selectedBtn;
        btn.classList.toggle("active", isSelected);
        btn.setAttribute("aria-pressed", String(isSelected));
    });
}

// Find and return the earliest match whose scheduled time is in the future.
function getNextUpcomingMatch() {
    const now = Date.now();
    const upcoming = MATCHES
        .filter(function (match) {
            return new Date(match.date).getTime() > now;
        })
        .sort(function (a, b) {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

    return upcoming.length > 0 ? upcoming[0] : null;
}

// Update the countdown numbers every second or show "No upcoming matches" when none remain.
function updateCountdown() {
    const timerEl = document.getElementById("countdownTimer");
    const noUpcomingEl = document.getElementById("noUpcomingMessage");
    const nextMatch = getNextUpcomingMatch();

    if (!nextMatch) {
        timerEl.classList.add("d-none");
        noUpcomingEl.classList.remove("d-none");
        return;
    }

    timerEl.classList.remove("d-none");
    noUpcomingEl.classList.add("d-none");

    const diffMs = new Date(nextMatch.date).getTime() - Date.now();
    const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    document.getElementById("countDays").textContent = String(days).padStart(2, "0");
    document.getElementById("countHours").textContent = String(hours).padStart(2, "0");
    document.getElementById("countMinutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("countSeconds").textContent = String(seconds).padStart(2, "0");
}

// Initialize the match list, filter button click handlers, and 1-second countdown interval.
function initSchedulePage() {
    const filterButtons = document.querySelectorAll(".filter-btn");

    renderMatches("All");
    updateCountdown();
    setInterval(updateCountdown, 1000);

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            setActiveFilter(button);
            renderMatches(button.getAttribute("data-game"));
        });
    });
}

document.addEventListener("DOMContentLoaded", initSchedulePage);
