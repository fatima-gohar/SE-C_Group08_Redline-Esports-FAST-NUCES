/* Pages 10-12 | Author: 26I-3152 | Redline Esports | FAST NUCES */

/*
 * SHARED LOCALSTORAGE CONTRACT (Page 10 <-> Match Results & other pages)
 * - "redline_universities": Array of { id, name, shortCode, city, baselinePoints: { Valorant, BGMI, CS2 } }
 * - "redline_match_records": Array of { id, date, game, universityA, universityB, result: "A"|"B"|"draw", isTournamentFinal }
 * - Derived standings (points, wins, losses, draws, winRate, rank, rankMovement) are NEVER stored;
 *   they are always computed dynamically by calculateStandings().
 */

// VIVA: change here — scoring rules and localStorage keys
const STORAGE_KEYS = {
  UNIVERSITIES: "redline_universities",
  MATCH_RECORDS: "redline_match_records",
  PREFS: "redline_rankings_prefs",
  FAVOURITES: "redline_rankings_favourites",
};

// VIVA: change here — points awarded per match outcome
const POINTS_RULES = {
  WIN: 3,
  DRAW: 1,
  LOSS: 0,
  TOURNAMENT_FINAL_WIN_BONUS: 50,
};

const VALID_GAMES = ["Valorant", "BGMI", "CS2"];

// VIVA: change here — default seed universities (totals are NEVER stored)
const DEFAULT_UNIVERSITIES = [
  { id: "nuces", name: "FAST-NUCES Islamabad", shortCode: "NUCES", city: "Islamabad", baselinePoints: { Valorant: 920, BGMI: 780, CS2: 744 } },
  { id: "fast", name: "FAST-NUCES Lahore", shortCode: "FAST", city: "Lahore", baselinePoints: { Valorant: 760, BGMI: 790, CS2: 694 } },
  { id: "lums", name: "Lahore University of Management Sciences", shortCode: "LUMS", city: "Lahore", baselinePoints: { Valorant: 720, BGMI: 660, CS2: 714 } },
  { id: "comsats", name: "COMSATS University Islamabad", shortCode: "COMSATS", city: "Islamabad", baselinePoints: { Valorant: 680, BGMI: 640, CS2: 620 } },
  { id: "nust", name: "National University of Sciences & Technology", shortCode: "NUST", city: "Islamabad", baselinePoints: { Valorant: 640, BGMI: 615, CS2: 610 } },
  { id: "giki", name: "Ghulam Ishaq Khan Institute", shortCode: "GIKI", city: "Topi", baselinePoints: { Valorant: 590, BGMI: 580, CS2: 579 } },
  { id: "iba", name: "Institute of Business Administration", shortCode: "IBA", city: "Karachi", baselinePoints: { Valorant: 560, BGMI: 540, CS2: 529 } },
  { id: "uet", name: "University of Engineering & Technology", shortCode: "UET", city: "Lahore", baselinePoints: { Valorant: 510, BGMI: 505, CS2: 495 } },
  { id: "air", name: "Air University", shortCode: "Air University", city: "Islamabad", baselinePoints: { Valorant: 480, BGMI: 460, CS2: 450 } },
];

// VIVA: change here — default seed match records
const DEFAULT_MATCH_RECORDS = [
  { id: "m-101", date: "2026-11-12", game: "Valorant", universityA: "nuces", universityB: "lums", result: "A", isTournamentFinal: false },
  { id: "m-102", date: "2026-11-15", game: "BGMI", universityA: "fast", universityB: "comsats", result: "A", isTournamentFinal: false },
  { id: "m-103", date: "2026-11-18", game: "CS2", universityA: "lums", universityB: "nust", result: "A", isTournamentFinal: false },
  { id: "m-104", date: "2026-11-20", game: "Valorant", universityA: "giki", universityB: "iba", result: "draw", isTournamentFinal: false },
  { id: "m-105", date: "2026-11-22", game: "CS2", universityA: "nuces", universityB: "fast", result: "A", isTournamentFinal: true },
  { id: "m-106", date: "2026-11-24", game: "BGMI", universityA: "fast", universityB: "uet", result: "A", isTournamentFinal: true },
  { id: "m-107", date: "2026-11-26", game: "Valorant", universityA: "lums", universityB: "air", result: "A", isTournamentFinal: false },
];

const DEFAULT_PREFS = {
  gameFilter: "All",
  sortBy: "points",
  searchQuery: "",
  favOnly: false,
};

const appState = {
  universities: [],
  matchRecords: [],
  favourites: [],
  prefs: { ...DEFAULT_PREFS },
  storageAvailable: true,
  highlightedUniIds: new Set(),
  previousRanks: null,
  actionHistory: [],
};

/** Deep-clones plain JSON structures to prevent accidental seed mutation. */
function cloneData(data) {
  return JSON.parse(JSON.stringify(data));
}

/** Escapes HTML special characters before inserting user strings into DOM templates. */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Tests whether browser localStorage can be read and written safely. */
function checkStorageAvailability() {
  try {
    const probeKey = "__redline_storage_probe__";
    window.localStorage.setItem(probeKey, "1");
    window.localStorage.removeItem(probeKey);
    return true;
  } catch (err) {
    return false;
  }
}

/** Validates that a loaded university object matches the shared schema. */
function isValidUniversity(u) {
  if (!u || typeof u !== "object") return false;
  if (typeof u.id !== "string" || !u.id.trim()) return false;
  if (typeof u.name !== "string" || !u.name.trim()) return false;
  if (typeof u.shortCode !== "string" || !u.shortCode.trim()) return false;
  if (typeof u.city !== "string" || !u.city.trim()) return false;
  if (!u.baselinePoints || typeof u.baselinePoints !== "object") return false;
  return VALID_GAMES.every(
    (g) => typeof u.baselinePoints[g] === "number" && Number.isFinite(u.baselinePoints[g]) && u.baselinePoints[g] >= 0
  );
}

/** Validates that a loaded match record object matches the shared schema. */
function isValidMatchRecord(m) {
  if (!m || typeof m !== "object") return false;
  if (typeof m.id !== "string" || !m.id.trim()) return false;
  if (typeof m.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(m.date)) return false;
  if (!VALID_GAMES.includes(m.game)) return false;
  if (typeof m.universityA !== "string" || typeof m.universityB !== "string") return false;
  if (!["A", "B", "draw"].includes(m.result)) return false;
  return typeof m.isTournamentFinal === "boolean";
}

/** Safely reads and validates JSON from localStorage with fallback to defaults. */
function readValidatedStorage(key, validator, fallbackValue) {
  if (!appState.storageAvailable) {
    return cloneData(fallbackValue);
  }
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      window.localStorage.setItem(key, JSON.stringify(fallbackValue));
      return cloneData(fallbackValue);
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      throw new Error("Expected array in storage");
    }
    const validItems = parsed.filter(validator);
    if (parsed.length > 0 && validItems.length === 0) {
      throw new Error("All stored entries failed validation");
    }
    return validItems;
  } catch (err) {
    try {
      window.localStorage.setItem(key, JSON.stringify(fallbackValue));
    } catch (writeErr) {
      appState.storageAvailable = false;
    }
    return cloneData(fallbackValue);
  }
}

/** Safely writes a JSON value to localStorage, falling back to memory if blocked. */
function writeStorage(key, value) {
  if (!appState.storageAvailable) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    appState.storageAvailable = false;
    toggleStorageWarningBanner();
  }
}

/** Loads saved user preferences (filter, sort, search, favourites-only). */
function loadPrefs() {
  if (!appState.storageAvailable) return { ...DEFAULT_PREFS };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.PREFS);
    if (!raw) return { ...DEFAULT_PREFS };
    const parsed = JSON.parse(raw);
    return {
      gameFilter: ["All", ...VALID_GAMES].includes(parsed.gameFilter) ? parsed.gameFilter : "All",
      sortBy: ["points", "name"].includes(parsed.sortBy) ? parsed.sortBy : "points",
      searchQuery: typeof parsed.searchQuery === "string" ? parsed.searchQuery : "",
      favOnly: Boolean(parsed.favOnly),
    };
  } catch (err) {
    return { ...DEFAULT_PREFS };
  }
}

/** Loads starred university IDs from localStorage. */
function loadFavourites() {
  if (!appState.storageAvailable) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.FAVOURITES);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch (err) {
    return [];
  }
}

/** Shows or hides the warning banner when localStorage is unavailable. */
function toggleStorageWarningBanner() {
  const banner = document.getElementById("storageWarningBanner");
  if (banner) {
    banner.classList.toggle("d-none", appState.storageAvailable);
  }
}

/**
 * Derives complete university standings from universities[] and matchRecords[].
 * Never stores totals; records referencing unknown universities are ignored.
 */
function calculateStandings(universities, matchRecords, gameFilter = "All", previousRankSnapshot = null) {
  const uniMap = new Map();
  universities.forEach((uni) => {
    const baseline =
      gameFilter === "All"
        ? VALID_GAMES.reduce((sum, g) => sum + Number(uni.baselinePoints[g] || 0), 0)
        : Number(uni.baselinePoints[gameFilter] || 0);

    uniMap.set(uni.id, {
      ...uni,
      baseline,
      points: baseline,
      wins: 0,
      losses: 0,
      draws: 0,
      finalWins: 0,
      matchesPlayed: 0,
      winRate: 0,
      rank: 0,
      rankMovement: 0,
    });
  });

  const relevantRecords = matchRecords.filter((rec) => {
    if (gameFilter !== "All" && rec.game !== gameFilter) return false;
    return uniMap.has(rec.universityA) && uniMap.has(rec.universityB) && rec.universityA !== rec.universityB;
  });

  relevantRecords.forEach((rec) => {
    const entryA = uniMap.get(rec.universityA);
    const entryB = uniMap.get(rec.universityB);
    entryA.matchesPlayed += 1;
    entryB.matchesPlayed += 1;

    if (rec.result === "draw") {
      entryA.draws += 1;
      entryB.draws += 1;
      entryA.points += POINTS_RULES.DRAW;
      entryB.points += POINTS_RULES.DRAW;
    } else if (rec.result === "A") {
      entryA.wins += 1;
      entryB.losses += 1;
      entryA.points += POINTS_RULES.WIN;
      if (rec.isTournamentFinal) {
        entryA.finalWins += 1;
        entryA.points += POINTS_RULES.TOURNAMENT_FINAL_WIN_BONUS;
      }
    } else if (rec.result === "B") {
      entryB.wins += 1;
      entryA.losses += 1;
      entryB.points += POINTS_RULES.WIN;
      if (rec.isTournamentFinal) {
        entryB.finalWins += 1;
        entryB.points += POINTS_RULES.TOURNAMENT_FINAL_WIN_BONUS;
      }
    }
  });

  const standings = Array.from(uniMap.values()).map((entry) => ({
    ...entry,
    winRate: entry.matchesPlayed > 0 ? Math.round((entry.wins / entry.matchesPlayed) * 100) : 0,
  }));

  // Tie-breaker: points descending -> wins descending -> name A-Z
  standings.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.wins !== a.wins) return b.wins - a.wins;
    return a.shortCode.localeCompare(b.shortCode);
  });

  standings.forEach((entry, index) => {
    entry.rank = index + 1;
  });

  // Compute rank movement compared to previous snapshot or standings prior to latest match
  let baselineRanks = previousRankSnapshot;
  if (!baselineRanks && relevantRecords.length > 0) {
    const withoutLatest = relevantRecords.slice(0, -1);
    const prevStandings = calculateRanksOnly(universities, withoutLatest, gameFilter);
    baselineRanks = prevStandings;
  }

  if (baselineRanks) {
    standings.forEach((entry) => {
      const oldRank = baselineRanks.get(entry.id);
      entry.rankMovement = typeof oldRank === "number" ? oldRank - entry.rank : 0;
    });
  }

  return standings;
}

/** Helper used internally to compute rank positions without recursion. */
function calculateRanksOnly(universities, matchRecords, gameFilter) {
  const tempMap = new Map();
  universities.forEach((uni) => {
    const baseline =
      gameFilter === "All"
        ? VALID_GAMES.reduce((sum, g) => sum + Number(uni.baselinePoints[g] || 0), 0)
        : Number(uni.baselinePoints[gameFilter] || 0);
    tempMap.set(uni.id, { id: uni.id, shortCode: uni.shortCode, points: baseline, wins: 0 });
  });

  matchRecords.forEach((rec) => {
    if (gameFilter !== "All" && rec.game !== gameFilter) return;
    if (!tempMap.has(rec.universityA) || !tempMap.has(rec.universityB)) return;
    const a = tempMap.get(rec.universityA);
    const b = tempMap.get(rec.universityB);
    if (rec.result === "draw") {
      a.points += POINTS_RULES.DRAW;
      b.points += POINTS_RULES.DRAW;
    } else if (rec.result === "A") {
      a.wins += 1;
      a.points += POINTS_RULES.WIN + (rec.isTournamentFinal ? POINTS_RULES.TOURNAMENT_FINAL_WIN_BONUS : 0);
    } else if (rec.result === "B") {
      b.wins += 1;
      b.points += POINTS_RULES.WIN + (rec.isTournamentFinal ? POINTS_RULES.TOURNAMENT_FINAL_WIN_BONUS : 0);
    }
  });

  const sorted = Array.from(tempMap.values()).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.wins !== a.wins) return b.wins - a.wins;
    return a.shortCode.localeCompare(b.shortCode);
  });

  const rankMap = new Map();
  sorted.forEach((item, idx) => rankMap.set(item.id, idx + 1));
  return rankMap;
}

/** Returns HTML for gold/silver/bronze rank badge. */
function getRankBadgeHtml(rank) {
  let badgeClass = "";
  if (rank === 1) badgeClass = "rank-gold";
  else if (rank === 2) badgeClass = "rank-silver";
  else if (rank === 3) badgeClass = "rank-bronze";
  return `<span class="rank-badge ${badgeClass}">#${rank}</span>`;
}

/** Returns HTML for rank movement indicator arrow. */
function getMovementHtml(movement) {
  if (movement > 0) {
    return `<span class="rank-move rank-move-up" title="Up ${movement}" aria-label="Up ${movement} rank">▲${movement}</span>`;
  }
  if (movement < 0) {
    return `<span class="rank-move rank-move-down" title="Down ${Math.abs(movement)}" aria-label="Down ${Math.abs(movement)} rank">▼${Math.abs(movement)}</span>`;
  }
  return `<span class="rank-move rank-move-same" title="No rank change" aria-label="No rank change">—</span>`;
}

/** Renders the filtered and sorted rankings table and handles empty states. */
function renderStandingsTable() {
  const tbody = document.getElementById("standingsTableBody");
  const emptyBox = document.getElementById("rankingsEmptyState");
  const emptyMsg = document.getElementById("rankingsEmptyMessage");
  const liveStatus = document.getElementById("rankingsLiveStatus");
  if (!tbody || !emptyBox || !emptyMsg) return;

  const standings = calculateStandings(
    appState.universities,
    appState.matchRecords,
    appState.prefs.gameFilter,
    appState.previousRanks
  );

  const query = appState.prefs.searchQuery.trim().toLowerCase();
  let visible = standings.filter((row) => {
    if (appState.prefs.favOnly && !appState.favourites.includes(row.id)) return false;
    if (!query) return true;
    return (
      row.name.toLowerCase().includes(query) ||
      row.shortCode.toLowerCase().includes(query) ||
      row.city.toLowerCase().includes(query)
    );
  });

  if (appState.prefs.sortBy === "name") {
    visible = [...visible].sort((a, b) => a.shortCode.localeCompare(b.shortCode));
  }

  if (visible.length === 0) {
    tbody.innerHTML = "";
    emptyBox.classList.remove("d-none");
    if (appState.prefs.favOnly && appState.favourites.length === 0) {
      emptyMsg.textContent = "You haven't starred any universities yet.";
    } else {
      emptyMsg.textContent = "No universities found. Try a different search.";
    }
    if (liveStatus) {
      liveStatus.textContent = `Showing 0 of ${standings.length} universities (${appState.prefs.gameFilter}).`;
    }
    return;
  }

  emptyBox.classList.add("d-none");
  tbody.innerHTML = visible
    .map((row) => {
      const isFav = appState.favourites.includes(row.id);
      const isGlowing = appState.highlightedUniIds.has(row.id) ? "row-updated-glow" : "";
      return `
        <tr class="rankings-row ${isGlowing}" tabindex="0" data-uni-id="${escapeHtml(row.id)}" aria-label="${escapeHtml(row.shortCode)} ranked number ${row.rank} with ${row.points} points">
          <td>
            <div class="d-flex align-items-center">
              ${getRankBadgeHtml(row.rank)}
              ${getMovementHtml(row.rankMovement)}
            </div>
          </td>
          <td>
            <div class="fw-bold">${escapeHtml(row.shortCode)}</div>
            <div class="small" style="color: var(--rl-text-muted);">${escapeHtml(row.name)} • ${escapeHtml(row.city)}</div>
          </td>
          <td class="d-none d-sm-table-cell small">
            <span class="fw-semibold">${row.wins}-${row.draws}-${row.losses}</span>
            <span class="d-block" style="color: var(--rl-text-muted);">${row.winRate}% win rate</span>
          </td>
          <td class="text-end fw-bold fs-5" style="color: #ffffff;">${row.points.toLocaleString()}</td>
          <td class="text-center">
            <button
              type="button"
              class="fav-star-btn ${isFav ? "is-fav" : ""}"
              data-fav-id="${escapeHtml(row.id)}"
              aria-pressed="${isFav ? "true" : "false"}"
              aria-label="${isFav ? "Remove" : "Add"} ${escapeHtml(row.shortCode)} from favourites"
            >${isFav ? "★" : "☆"}</button>
          </td>
        </tr>
      `;
    })
    .join("");

  if (liveStatus) {
    liveStatus.textContent = `Showing ${visible.length} of ${standings.length} universities • Filter: ${appState.prefs.gameFilter}`;
  }
}

/** Toggles a university ID in the favourites list and saves to storage. */
function toggleFavourite(uniId) {
  const idx = appState.favourites.indexOf(uniId);
  if (idx === -1) {
    appState.favourites.push(uniId);
  } else {
    appState.favourites.splice(idx, 1);
  }
  writeStorage(STORAGE_KEYS.FAVOURITES, appState.favourites);
  renderStandingsTable();
}

/** Opens the Bootstrap modal with full derived stats and match history for a university. */
function openUniversityModal(uniId) {
  const standings = calculateStandings(appState.universities, appState.matchRecords, appState.prefs.gameFilter);
  const uni = standings.find((u) => u.id === uniId);
  if (!uni) return;

  const modalTitle = document.getElementById("uniModalLabel");
  const modalBody = document.getElementById("uniModalBody");
  if (!modalTitle || !modalBody) return;

  const uniLookup = new Map(appState.universities.map((u) => [u.id, u]));
  const recentMatches = appState.matchRecords
    .filter((m) => (m.universityA === uniId || m.universityB === uniId) && (appState.prefs.gameFilter === "All" || m.game === appState.prefs.gameFilter))
    .slice(-5)
    .reverse();

  modalTitle.textContent = `${uni.shortCode} — ${uni.name}`;
  modalBody.innerHTML = `
    <div class="row g-3 mb-3">
      <div class="col-6 col-md-3">
        <div class="p-2 rounded rl-card-muted text-center">
          <div class="small" style="color: var(--rl-text-muted);">Current Rank</div>
          <div class="fs-4 fw-bold" style="color: var(--rl-gold);">#${uni.rank}</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="p-2 rounded rl-card-muted text-center">
          <div class="small" style="color: var(--rl-text-muted);">Total Points</div>
          <div class="fs-4 fw-bold" style="color: var(--rl-red);">${uni.points}</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="p-2 rounded rl-card-muted text-center">
          <div class="small" style="color: var(--rl-text-muted);">Record (W-D-L)</div>
          <div class="fs-5 fw-bold">${uni.wins}-${uni.draws}-${uni.losses}</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="p-2 rounded rl-card-muted text-center">
          <div class="small" style="color: var(--rl-text-muted);">Win Rate</div>
          <div class="fs-5 fw-bold">${uni.winRate}%</div>
        </div>
      </div>
    </div>
    <p class="small mb-3" style="color: var(--rl-text-muted);">
      <strong>City:</strong> ${escapeHtml(uni.city)} &nbsp;|&nbsp;
      <strong>Baseline Breakdown:</strong> Valorant ${uni.baselinePoints.Valorant}, BGMI ${uni.baselinePoints.BGMI}, CS2 ${uni.baselinePoints.CS2} &nbsp;|&nbsp;
      <strong>Tournament Final Wins:</strong> ${uni.finalWins}
    </p>
    <h3 class="h6 text-uppercase mb-2">Recent Matches (${escapeHtml(appState.prefs.gameFilter)})</h3>
    ${
      recentMatches.length === 0
        ? `<p class="small mb-0" style="color: var(--rl-text-muted);">No recorded matches for this filter yet.</p>`
        : `<ul class="list-group list-group-flush">
            ${recentMatches
              .map((m) => {
                const oppId = m.universityA === uniId ? m.universityB : m.universityA;
                const opp = uniLookup.get(oppId);
                const oppName = opp ? opp.shortCode : oppId;
                const won = (m.result === "A" && m.universityA === uniId) || (m.result === "B" && m.universityB === uniId);
                const outcome = m.result === "draw" ? "Draw" : won ? "Win" : "Loss";
                return `<li class="list-group-item bg-transparent text-light d-flex justify-content-between align-items-center px-0 border-secondary">
                  <span>${escapeHtml(m.date)} • ${escapeHtml(m.game)} vs <strong>${escapeHtml(oppName)}</strong> ${m.isTournamentFinal ? '<span class="badge bg-danger ms-1">Final</span>' : ""}</span>
                  <span class="badge ${outcome === "Win" ? "bg-success" : outcome === "Draw" ? "bg-warning text-dark" : "bg-secondary"}">${outcome}</span>
                </li>`;
              })
              .join("")}
          </ul>`
    }
  `;

  const modalEl = document.getElementById("universityDetailModal");
  if (modalEl && window.bootstrap) {
    window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

/** Syncs control UI elements to match stored preferences. */
function syncFilterControlsFromPrefs() {
  document.querySelectorAll(".game-filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.game === appState.prefs.gameFilter);
  });
  const searchInput = document.getElementById("rankingsSearch");
  if (searchInput) searchInput.value = appState.prefs.searchQuery;
  const sortSelect = document.getElementById("rankingsSort");
  if (sortSelect) sortSelect.value = appState.prefs.sortBy;
  const favToggle = document.getElementById("favOnlyToggle");
  if (favToggle) favToggle.checked = appState.prefs.favOnly;
}

/** Binds event listeners for filters, search, sort, favourites, table clicks, and keyboard Enter. */
function bindCoreEvents() {
  document.querySelectorAll(".game-filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      appState.prefs.gameFilter = btn.dataset.game;
      appState.previousRanks = null;
      writeStorage(STORAGE_KEYS.PREFS, appState.prefs);
      syncFilterControlsFromPrefs();
      renderStandingsTable();
    });
  });

  const searchInput = document.getElementById("rankingsSearch");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      appState.prefs.searchQuery = e.target.value;
      writeStorage(STORAGE_KEYS.PREFS, appState.prefs);
      renderStandingsTable();
    });
  }

  const sortSelect = document.getElementById("rankingsSort");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      appState.prefs.sortBy = e.target.value;
      writeStorage(STORAGE_KEYS.PREFS, appState.prefs);
      renderStandingsTable();
    });
  }

  const favToggle = document.getElementById("favOnlyToggle");
  if (favToggle) {
    favToggle.addEventListener("change", (e) => {
      appState.prefs.favOnly = e.target.checked;
      writeStorage(STORAGE_KEYS.PREFS, appState.prefs);
      renderStandingsTable();
    });
  }

  const clearBtn = document.getElementById("clearFiltersBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      appState.prefs = { ...DEFAULT_PREFS };
      writeStorage(STORAGE_KEYS.PREFS, appState.prefs);
      syncFilterControlsFromPrefs();
      renderStandingsTable();
    });
  }

  const tbody = document.getElementById("standingsTableBody");
  if (tbody) {
    tbody.addEventListener("click", (e) => {
      const favBtn = e.target.closest("[data-fav-id]");
      if (favBtn) {
        e.stopPropagation();
        toggleFavourite(favBtn.dataset.favId);
        return;
      }
      const row = e.target.closest("tr[data-uni-id]");
      if (row) {
        openUniversityModal(row.dataset.uniId);
      }
    });

    tbody.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        const favBtn = e.target.closest("[data-fav-id]");
        if (favBtn) return;
        const row = e.target.closest("tr[data-uni-id]");
        if (row) {
          e.preventDefault();
          openUniversityModal(row.dataset.uniId);
        }
      }
    });
  }
}

/** Shows a Bootstrap toast notification with a status message. */
function showRankingsToast(message) {
  const toastEl = document.getElementById("rankingsToast");
  const toastBody = document.getElementById("rankingsToastBody");
  if (!toastEl || !toastBody) return;
  toastBody.textContent = message;
  if (window.bootstrap) {
    window.bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3200 }).show();
  }
}

/** Populates University A and University B dropdowns in the match form. */
function populateUniversitySelects() {
  const selA = document.getElementById("matchUniA");
  const selB = document.getElementById("matchUniB");
  if (!selA || !selB) return;

  const sorted = [...appState.universities].sort((a, b) => a.shortCode.localeCompare(b.shortCode));
  const buildOptions = (placeholder) =>
    `<option value="">${placeholder}</option>` +
    sorted.map((u) => `<option value="${escapeHtml(u.id)}">${escapeHtml(u.shortCode)} (${escapeHtml(u.name)})</option>`).join("");

  const prevA = selA.value;
  const prevB = selB.value;
  selA.innerHTML = buildOptions("Select University A");
  selB.innerHTML = buildOptions("Select University B");
  if (sorted.some((u) => u.id === prevA)) selA.value = prevA;
  if (sorted.some((u) => u.id === prevB)) selB.value = prevB;
}

/** Computes estimated points and projected rank in the Points Calculator widget. */
function updatePointsCalculator() {
  const wins = Math.max(0, parseInt(document.getElementById("calcWins")?.value || "0", 10) || 0);
  const draws = Math.max(0, parseInt(document.getElementById("calcDraws")?.value || "0", 10) || 0);
  const losses = Math.max(0, parseInt(document.getElementById("calcLosses")?.value || "0", 10) || 0);
  const bonus = Math.max(0, parseInt(document.getElementById("calcBonus")?.value || "0", 10) || 0);
  const output = document.getElementById("calcOutput");
  if (!output) return;

  const totalPoints = wins * POINTS_RULES.WIN + draws * POINTS_RULES.DRAW + losses * POINTS_RULES.LOSS + bonus;
  const standings = calculateStandings(appState.universities, appState.matchRecords, appState.prefs.gameFilter);
  const higherCount = standings.filter((u) => u.points > totalPoints).length;
  const estimatedRank = higherCount + 1;

  output.innerHTML = `
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <div class="small" style="color: var(--rl-text-muted);">Calculated Score</div>
        <div class="fs-4 fw-bold" style="color: var(--rl-red);">${totalPoints.toLocaleString()} pts</div>
      </div>
      <div class="text-end">
        <div class="small" style="color: var(--rl-text-muted);">Estimated Rank (${escapeHtml(appState.prefs.gameFilter)})</div>
        <div class="fs-4 fw-bold" style="color: var(--rl-gold);">#${estimatedRank} of ${standings.length + 1}</div>
      </div>
    </div>
    <div class="small mt-1" style="color: var(--rl-text-muted);">${wins}W (${wins * 3}) + ${draws}D (${draws}) + ${losses}L (0) + Bonus (${bonus})</div>
  `;
}

/** Returns today's local date as YYYY-MM-DD for date input validation. */
function getTodayIsoDate() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Validates the Record a Match Result form live and toggles Submit availability. */
function validateMatchForm() {
  const dateEl = document.getElementById("matchDate");
  const gameEl = document.getElementById("matchGame");
  const uniAEl = document.getElementById("matchUniA");
  const uniBEl = document.getElementById("matchUniB");
  const resultEl = document.getElementById("matchResult");
  const submitBtn = document.getElementById("submitMatchBtn");
  if (!dateEl || !gameEl || !uniAEl || !uniBEl || !resultEl || !submitBtn) return false;

  const errors = { date: "", game: "", uniA: "", uniB: "", result: "" };
  const today = getTodayIsoDate();

  if (!dateEl.value) {
    errors.date = "Match date is required.";
  } else if (dateEl.value > today) {
    errors.date = "Match date cannot be in the future.";
  }

  if (!VALID_GAMES.includes(gameEl.value)) {
    errors.game = "Please choose a game.";
  }
  if (!uniAEl.value) {
    errors.uniA = "Select University A.";
  }
  if (!uniBEl.value) {
    errors.uniB = "Select University B.";
  } else if (uniAEl.value && uniAEl.value === uniBEl.value) {
    errors.uniB = "University A and B must be different.";
  }
  if (!["A", "B", "draw"].includes(resultEl.value)) {
    errors.result = "Select a match outcome.";
  }

  document.getElementById("matchDateError").textContent = errors.date;
  document.getElementById("matchGameError").textContent = errors.game;
  document.getElementById("matchUniAError").textContent = errors.uniA;
  document.getElementById("matchUniBError").textContent = errors.uniB;
  document.getElementById("matchResultError").textContent = errors.result;

  const isValid = Object.values(errors).every((msg) => msg === "");
  submitBtn.disabled = !isValid;
  return isValid;
}

/** Validates the Add University form live (required, unique names/codes, valid numbers). */
function validateAddUniversityForm() {
  const nameEl = document.getElementById("uniName");
  const codeEl = document.getElementById("uniShortCode");
  const cityEl = document.getElementById("uniCity");
  const valEl = document.getElementById("uniBaseVal");
  const bgmiEl = document.getElementById("uniBaseBgmi");
  const cs2El = document.getElementById("uniBaseCs2");
  const submitBtn = document.getElementById("submitUniBtn");
  if (!nameEl || !codeEl || !cityEl || !valEl || !bgmiEl || !cs2El || !submitBtn) return false;

  const name = nameEl.value.trim();
  const code = codeEl.value.trim();
  const city = cityEl.value.trim();
  const errors = { name: "", code: "", city: "", base: "" };

  if (name.length < 2) {
    errors.name = "University name is required (min 2 characters).";
  } else if (appState.universities.some((u) => u.name.toLowerCase() === name.toLowerCase())) {
    errors.name = "A university with this name already exists.";
  }

  if (code.length < 2) {
    errors.code = "Short code is required (min 2 characters).";
  } else if (appState.universities.some((u) => u.shortCode.toLowerCase() === code.toLowerCase())) {
    errors.code = "Short code must be unique.";
  }

  if (city.length < 2) {
    errors.city = "City is required.";
  }

  const bases = [Number(valEl.value), Number(bgmiEl.value), Number(cs2El.value)];
  if (bases.some((n) => !Number.isFinite(n) || n < 0)) {
    errors.base = "Baseline points must be 0 or higher.";
  }

  document.getElementById("uniNameError").textContent = errors.name;
  document.getElementById("uniShortCodeError").textContent = errors.code;
  document.getElementById("uniCityError").textContent = errors.city;
  document.getElementById("uniBaseError").textContent = errors.base;

  const isValid = Object.values(errors).every((msg) => msg === "");
  submitBtn.disabled = !isValid;
  return isValid;
}

/** Captures current rank positions before a standings mutation for movement arrows. */
function captureRankSnapshot() {
  const current = calculateStandings(appState.universities, appState.matchRecords, appState.prefs.gameFilter);
  return new Map(current.map((u) => [u.id, u.rank]));
}

/** Clears temporary glow highlight classes after animation completes. */
function triggerRowGlow(uniIds) {
  appState.highlightedUniIds = new Set(uniIds);
  renderStandingsTable();
  window.setTimeout(() => {
    appState.highlightedUniIds.clear();
  }, 1900);
}

/** Handles Record a Match Result submission, updates storage, and refreshes UI. */
function handleRecordMatchSubmit(e) {
  e.preventDefault();
  if (!validateMatchForm()) return;

  const previousRanks = captureRankSnapshot();
  const newRecord = {
    id: `m-${Date.now()}`,
    date: document.getElementById("matchDate").value,
    game: document.getElementById("matchGame").value,
    universityA: document.getElementById("matchUniA").value,
    universityB: document.getElementById("matchUniB").value,
    result: document.getElementById("matchResult").value,
    isTournamentFinal: document.getElementById("matchIsFinal").checked,
  };

  appState.actionHistory.push({ type: "add_match", record: cloneData(newRecord) });
  appState.matchRecords.push(newRecord);
  appState.previousRanks = previousRanks;
  writeStorage(STORAGE_KEYS.MATCH_RECORDS, appState.matchRecords);

  triggerRowGlow([newRecord.universityA, newRecord.universityB]);
  renderRecentResultsLog();
  updatePointsCalculator();
  updateUndoButtonState();

  e.target.reset();
  document.getElementById("matchDate").value = getTodayIsoDate();
  validateMatchForm();
  showRankingsToast("Match result recorded and standings updated!");
}

/** Handles Add University form submission and persists to shared storage. */
function handleAddUniversitySubmit(e) {
  e.preventDefault();
  if (!validateAddUniversityForm()) return;

  const name = document.getElementById("uniName").value.trim();
  const shortCode = document.getElementById("uniShortCode").value.trim();
  const city = document.getElementById("uniCity").value.trim();
  const slugBase = shortCode.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "uni";
  const uniqueId = appState.universities.some((u) => u.id === slugBase) ? `${slugBase}-${Date.now()}` : slugBase;

  const newUni = {
    id: uniqueId,
    name,
    shortCode,
    city,
    baselinePoints: {
      Valorant: Math.max(0, Number(document.getElementById("uniBaseVal").value) || 0),
      BGMI: Math.max(0, Number(document.getElementById("uniBaseBgmi").value) || 0),
      CS2: Math.max(0, Number(document.getElementById("uniBaseCs2").value) || 0),
    },
  };

  appState.previousRanks = captureRankSnapshot();
  appState.universities.push(newUni);
  writeStorage(STORAGE_KEYS.UNIVERSITIES, appState.universities);

  populateUniversitySelects();
  triggerRowGlow([newUni.id]);
  updatePointsCalculator();

  e.target.reset();
  document.getElementById("uniBaseVal").value = "300";
  document.getElementById("uniBaseBgmi").value = "300";
  document.getElementById("uniBaseCs2").value = "300";
  validateAddUniversityForm();
  showRankingsToast(`${shortCode} added to University Rankings!`);
}

/** Renders the Recent Results log with Delete buttons. */
function renderRecentResultsLog() {
  const container = document.getElementById("recentResultsLog");
  if (!container) return;

  const uniMap = new Map(appState.universities.map((u) => [u.id, u]));
  const recent = [...appState.matchRecords].reverse();

  if (recent.length === 0) {
    container.innerHTML = `<div class="col-12 small" style="color: var(--rl-text-muted);">No match results recorded yet.</div>`;
    return;
  }

  container.innerHTML = recent
    .map((m) => {
      const aName = uniMap.get(m.universityA)?.shortCode || m.universityA;
      const bName = uniMap.get(m.universityB)?.shortCode || m.universityB;
      const outcomeText = m.result === "draw" ? "Draw" : m.result === "A" ? `${aName} won` : `${bName} won`;
      return `
        <div class="col-12 col-md-6">
          <div class="p-3 rounded rl-card-muted d-flex justify-content-between align-items-center gap-2">
            <div>
              <div class="fw-bold">${escapeHtml(aName)} vs ${escapeHtml(bName)} ${m.isTournamentFinal ? '<span class="badge bg-danger ms-1">Final +50</span>' : ""}</div>
              <div class="small" style="color: var(--rl-text-muted);">${escapeHtml(m.date)} • ${escapeHtml(m.game)} • ${escapeHtml(outcomeText)}</div>
            </div>
            <button type="button" class="btn btn-sm btn-outline-danger delete-match-btn" data-delete-match-id="${escapeHtml(m.id)}" aria-label="Delete match ${escapeHtml(aName)} vs ${escapeHtml(bName)}">Delete</button>
          </div>
        </div>
      `;
    })
    .join("");
}

/** Deletes a match record after user confirmation and stores it for Undo. */
function deleteMatchRecord(matchId) {
  const idx = appState.matchRecords.findIndex((m) => m.id === matchId);
  if (idx === -1) return;
  if (!window.confirm("Delete this match result and recalculate standings?")) return;

  const previousRanks = captureRankSnapshot();
  const [removed] = appState.matchRecords.splice(idx, 1);
  appState.actionHistory.push({ type: "delete_match", record: cloneData(removed), index: idx });
  appState.previousRanks = previousRanks;
  writeStorage(STORAGE_KEYS.MATCH_RECORDS, appState.matchRecords);

  triggerRowGlow([removed.universityA, removed.universityB]);
  renderRecentResultsLog();
  updatePointsCalculator();
  updateUndoButtonState();
  showRankingsToast("Match result deleted.");
}

/** Reverts the most recent add or delete match action. */
function undoLastMatchAction() {
  const lastAction = appState.actionHistory.pop();
  if (!lastAction) return;

  const previousRanks = captureRankSnapshot();
  if (lastAction.type === "add_match") {
    appState.matchRecords = appState.matchRecords.filter((m) => m.id !== lastAction.record.id);
  } else if (lastAction.type === "delete_match") {
    const insertIdx = Math.min(lastAction.index, appState.matchRecords.length);
    appState.matchRecords.splice(insertIdx, 0, lastAction.record);
  }

  appState.previousRanks = previousRanks;
  writeStorage(STORAGE_KEYS.MATCH_RECORDS, appState.matchRecords);
  triggerRowGlow([lastAction.record.universityA, lastAction.record.universityB]);
  renderRecentResultsLog();
  updatePointsCalculator();
  updateUndoButtonState();
  showRankingsToast("Last match action undone.");
}

/** Updates the disabled state of the Undo button. */
function updateUndoButtonState() {
  const undoBtn = document.getElementById("undoLastBtn");
  if (undoBtn) {
    undoBtn.disabled = appState.actionHistory.length === 0;
  }
}

/** Resets universities, match records, favourites, and preferences back to defaults. */
function resetRankingsToDefaults() {
  if (!window.confirm("Reset all universities, match records, filters, and favourites to defaults?")) return;

  appState.universities = cloneData(DEFAULT_UNIVERSITIES);
  appState.matchRecords = cloneData(DEFAULT_MATCH_RECORDS);
  appState.favourites = [];
  appState.prefs = { ...DEFAULT_PREFS };
  appState.previousRanks = null;
  appState.actionHistory = [];
  appState.highlightedUniIds.clear();

  writeStorage(STORAGE_KEYS.UNIVERSITIES, appState.universities);
  writeStorage(STORAGE_KEYS.MATCH_RECORDS, appState.matchRecords);
  writeStorage(STORAGE_KEYS.FAVOURITES, appState.favourites);
  writeStorage(STORAGE_KEYS.PREFS, appState.prefs);

  syncFilterControlsFromPrefs();
  populateUniversitySelects();
  renderStandingsTable();
  renderRecentResultsLog();
  updatePointsCalculator();
  updateUndoButtonState();
  showRankingsToast("All rankings data reset to defaults.");
}

/** Binds calculator, forms, results log, reset, and cross-tab storage listeners. */
function bindExtendedEvents() {
  ["calcWins", "calcDraws", "calcLosses", "calcBonus"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", updatePointsCalculator);
  });

  const matchForm = document.getElementById("recordMatchForm");
  if (matchForm) {
    matchForm.addEventListener("submit", handleRecordMatchSubmit);
    ["matchDate", "matchGame", "matchUniA", "matchUniB", "matchResult", "matchIsFinal"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", validateMatchForm);
        el.addEventListener("change", validateMatchForm);
      }
    });
  }

  const uniForm = document.getElementById("addUniversityForm");
  if (uniForm) {
    uniForm.addEventListener("submit", handleAddUniversitySubmit);
    ["uniName", "uniShortCode", "uniCity", "uniBaseVal", "uniBaseBgmi", "uniBaseCs2"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", validateAddUniversityForm);
    });
  }

  const logContainer = document.getElementById("recentResultsLog");
  if (logContainer) {
    logContainer.addEventListener("click", (e) => {
      const delBtn = e.target.closest("[data-delete-match-id]");
      if (delBtn) deleteMatchRecord(delBtn.dataset.deleteMatchId);
    });
  }

  const undoBtn = document.getElementById("undoLastBtn");
  if (undoBtn) undoBtn.addEventListener("click", undoLastMatchAction);

  const resetBtn = document.getElementById("resetDataBtn");
  if (resetBtn) resetBtn.addEventListener("click", resetRankingsToDefaults);

  // Cross-tab synchronization when another tab (e.g. Match Results) updates shared storage
  window.addEventListener("storage", (e) => {
    if ([STORAGE_KEYS.UNIVERSITIES, STORAGE_KEYS.MATCH_RECORDS, STORAGE_KEYS.FAVOURITES, STORAGE_KEYS.PREFS].includes(e.key)) {
      appState.universities = readValidatedStorage(STORAGE_KEYS.UNIVERSITIES, isValidUniversity, DEFAULT_UNIVERSITIES);
      appState.matchRecords = readValidatedStorage(STORAGE_KEYS.MATCH_RECORDS, isValidMatchRecord, DEFAULT_MATCH_RECORDS);
      appState.favourites = loadFavourites();
      appState.prefs = loadPrefs();
      syncFilterControlsFromPrefs();
      populateUniversitySelects();
      renderStandingsTable();
      renderRecentResultsLog();
      updatePointsCalculator();
      showRankingsToast("Standings synced from another browser tab.");
    }
  });
}

/** Loads persisted data from localStorage and renders initial UI. */
function initUniversityRankings() {
  appState.storageAvailable = checkStorageAvailability();
  toggleStorageWarningBanner();
  appState.universities = readValidatedStorage(STORAGE_KEYS.UNIVERSITIES, isValidUniversity, DEFAULT_UNIVERSITIES);
  appState.matchRecords = readValidatedStorage(STORAGE_KEYS.MATCH_RECORDS, isValidMatchRecord, DEFAULT_MATCH_RECORDS);
  appState.favourites = loadFavourites();
  appState.prefs = loadPrefs();

  const matchDateInput = document.getElementById("matchDate");
  if (matchDateInput) {
    const today = getTodayIsoDate();
    matchDateInput.max = today;
    matchDateInput.value = today;
  }

  syncFilterControlsFromPrefs();
  populateUniversitySelects();
  bindCoreEvents();
  bindExtendedEvents();
  renderStandingsTable();
  renderRecentResultsLog();
  updatePointsCalculator();
  updateUndoButtonState();
  validateMatchForm();
  validateAddUniversityForm();
}

document.addEventListener("DOMContentLoaded", initUniversityRankings);
