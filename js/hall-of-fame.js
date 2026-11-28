/* Pages 10-12 | Author: 26I-3152 | Redline Esports | FAST NUCES */

// VIVA: change here — localStorage keys (all prefixed with redline_halloffame_)
const HOF_KEYS = {
  INDUCTEES: "redline_halloffame_inductees",
  NOMINEES: "redline_halloffame_nominees",
  VOTES: "redline_halloffame_votes",
  FAVS: "redline_halloffame_favs",
  PREFS: "redline_halloffame_prefs",
};

// VIVA: change here — Legend Score formula weights (derived, never stored)
const SCORE_WEIGHTS = {
  kills: 1,
  wins: 5,
  mvpAwards: 25,
  championships: 50,
};

// VIVA: change here — auto-induction vote threshold and score eligibility benchmark
const INDUCTION_THRESHOLD = 10;
const LEGEND_ELIGIBLE_SCORE = 500;

// VIVA: change here — seeded Hall of Fame inductees
const DEFAULT_INDUCTEES = [
  {
    id: "ayaan-khan",
    name: "Ayaan Khan",
    title: "Most Kills",
    university: "FAST-NUCES",
    game: "Valorant",
    category: "Most Kills",
    year: 2026,
    stats: { kills: 642, wins: 48, mvpAwards: 4, championships: 3 },
    bio: "Aggressive duelist who broke the Redline inter-university kill record on Ascent and Haven across three consecutive seasons.",
    quote: "First contact wins the round; discipline wins the trophy.",
    avatar: "../images/hof-ayaan-khan.jpg",
  },
  {
    id: "sara-ahmed",
    name: "Sara Ahmed",
    title: "MVP",
    university: "LUMS",
    game: "Valorant",
    category: "MVP",
    year: 2026,
    stats: { kills: 518, wins: 44, mvpAwards: 6, championships: 2 },
    bio: "Clutch controller specialist celebrated for game-turning mid-round reads and back-to-back Grand Final MVP honours.",
    quote: "Every utility piece buys space for your team to shine.",
    avatar: "../images/hof-sara-ahmed.jpg",
  },
  {
    id: "zain-malik",
    name: "Zain Malik",
    title: "Best Player",
    university: "NUST",
    game: "CS2",
    category: "Best Player",
    year: 2025,
    stats: { kills: 589, wins: 52, mvpAwards: 5, championships: 3 },
    bio: "All-around CS2 rifler and AWP hybrid known for dominant LAN composure and highest ADR in the 2025 Redline circuit.",
    quote: "Pressure is just noise until the bomb timer ticks down.",
    avatar: "../images/hof-zain-malik.jpg",
  },
  {
    id: "bilal-qureshi",
    name: "Bilal Qureshi",
    title: "Clutch King",
    university: "FAST-NUCES",
    game: "CS2",
    category: "Clutch King",
    year: 2025,
    stats: { kills: 475, wins: 39, mvpAwards: 3, championships: 2 },
    bio: "Converted nine 1v3 situations during the 2025 Playoffs, earning legendary status among FAST NUCES Counter-Strike fans.",
    quote: "Stay calm, check every angle, trust your crosshair.",
    avatar: "../images/hof-bilal-qureshi.jpg",
  },
  {
    id: "maham-tariq",
    name: "Maham Tariq",
    title: "IGL",
    university: "COMSATS",
    game: "BGMI",
    category: "IGL",
    year: 2026,
    stats: { kills: 410, wins: 46, mvpAwards: 4, championships: 2 },
    bio: "Mastermind zone-rotator who guided COMSATS to two BGMI Chicken Dinner sweeps through relentless late-circle positioning.",
    quote: "Smart rotations beat raw aim in the final circle.",
    avatar: "../images/hof-maham-tariq.jpg",
  },
  {
    id: "omar-farooq",
    name: "Omar Farooq",
    title: "Most Kills",
    university: "GIKI",
    game: "BGMI",
    category: "Most Kills",
    year: 2024,
    stats: { kills: 530, wins: 35, mvpAwards: 3, championships: 1 },
    bio: "Top fragger of the 2024 Redline BGMI Invitational, averaging 5.4 finishes per lobby across twelve tournament maps.",
    quote: "Commit to the push and never leave a squadmate behind.",
    avatar: "../images/hof-omar-farooq.jpg",
  },
  {
    id: "hira-javed",
    name: "Hira Javed",
    title: "Best Player",
    university: "IBA",
    game: "Valorant",
    category: "Best Player",
    year: 2024,
    stats: { kills: 462, wins: 38, mvpAwards: 4, championships: 2 },
    bio: "Sentinel anchor who held B-site locks across Karachi and Islamabad qualifiers with unmatched consistency.",
    quote: "Defense builds the confidence that fuels every comeback.",
    avatar: "../images/hof-hira-javed.jpg",
  },
  {
    id: "daniyal-raza",
    name: "Daniyal Raza",
    title: "IGL",
    university: "UET",
    game: "CS2",
    category: "IGL",
    year: 2025,
    stats: { kills: 398, wins: 41, mvpAwards: 3, championships: 2 },
    bio: "Tactical caller behind UET's famed Mirage execute playbook and unbeaten 2025 group stage run.",
    quote: "Preparation turns an underdog roster into champions.",
    avatar: "../images/hof-daniyal-raza.jpg",
  },
  {
    id: "taha-siddiqui",
    name: "Taha Siddiqui",
    title: "MVP",
    university: "FAST-NUCES",
    game: "BGMI",
    category: "MVP",
    year: 2026,
    stats: { kills: 495, wins: 43, mvpAwards: 5, championships: 2 },
    bio: "Explosive assaulter and DMR sharpshooter who carried FAST-NUCES to the Autumn BGMI Finals crown.",
    quote: "Every drop is a chance to rewrite the leaderboard.",
    avatar: "../images/hof-taha-siddiqui.jpg",
  },
];

// VIVA: change here — seeded community nominees awaiting votes
const DEFAULT_NOMINEES = [
  {
    id: "nom-usman-ali",
    name: "Usman Ali",
    university: "FAST-NUCES",
    game: "Valorant",
    category: "Clutch King",
    year: 2026,
    stats: { kills: 365, wins: 31, mvpAwards: 2, championships: 1 },
    bio: "Delivered back-to-back 1v4 clutches during the Islamabad Qualifier Semifinals.",
    votes: 9,
  },
  {
    id: "nom-aliza-noor",
    name: "Aliza Noor",
    university: "LUMS",
    game: "CS2",
    category: "MVP",
    year: 2026,
    stats: { kills: 340, wins: 29, mvpAwards: 3, championships: 1 },
    bio: "Top-rated Mirage AWPer with a 1.38 HLTV-style impact rating in Fall 2026.",
    votes: 7,
  },
  {
    id: "nom-saad-hassan",
    name: "Saad Hassan",
    university: "NUST",
    game: "BGMI",
    category: "IGL",
    year: 2026,
    stats: { kills: 310, wins: 34, mvpAwards: 2, championships: 1 },
    bio: "Led NUST Eagles to four straight top-three finishes in Erangel finals.",
    votes: 5,
  },
  {
    id: "nom-raheel-akram",
    name: "Raheel Akram",
    university: "Air University",
    game: "Valorant",
    category: "Most Kills",
    year: 2026,
    stats: { kills: 405, wins: 24, mvpAwards: 2, championships: 0 },
    bio: "Breakout rookie entry fragger leading Air University into their first quarterfinal.",
    votes: 3,
  },
];

const DEFAULT_HOF_PREFS = {
  activeTab: "legends",
  search: "",
  category: "All",
  game: "All",
  university: "All",
  sortBy: "score",
  favOnly: false,
};

const hofState = {
  inductees: [],
  nominees: [],
  votedIds: [],
  favs: [],
  prefs: { ...DEFAULT_HOF_PREFS },
  storageAvailable: true,
};

/** Clones plain JSON objects safely. */
function cloneHofData(data) {
  return JSON.parse(JSON.stringify(data));
}

/** Escapes HTML special characters to keep rendered templates safe. */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Creates an inline SVG data-URI fallback avatar when an image file is missing. */
function getFallbackAvatarUrl(name) {
  const initials = String(name || "RL")
    .split(/\s+/)
    .map((p) => p[0] || "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="#161924"/><circle cx="60" cy="60" r="56" fill="none" stroke="#ffd700" stroke-width="4"/><text x="60" y="70" fill="#ffffff" font-family="Arial,sans-serif" font-size="38" font-weight="bold" text-anchor="middle">${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/** Tests whether browser localStorage works. */
function checkHofStorage() {
  try {
    const key = "__hof_probe__";
    window.localStorage.setItem(key, "1");
    window.localStorage.removeItem(key);
    return true;
  } catch (err) {
    return false;
  }
}

/** Validates an inductee object structure. */
function isValidInductee(item) {
  return (
    item &&
    typeof item === "object" &&
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.university === "string" &&
    typeof item.game === "string" &&
    typeof item.category === "string" &&
    typeof item.year === "number" &&
    item.stats &&
    typeof item.stats.kills === "number"
  );
}

/** Validates a nominee object structure. */
function isValidNominee(item) {
  return (
    item &&
    typeof item === "object" &&
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.university === "string" &&
    typeof item.game === "string" &&
    typeof item.category === "string" &&
    typeof item.votes === "number"
  );
}

/** Reads and validates an array from localStorage, falling back to seeds on corruption. */
function readHofArray(key, validator, fallback) {
  if (!hofState.storageAvailable) return cloneHofData(fallback);
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      window.localStorage.setItem(key, JSON.stringify(fallback));
      return cloneHofData(fallback);
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error("Corrupted array");
    const valid = parsed.filter(validator);
    if (parsed.length > 0 && valid.length === 0) throw new Error("No valid items");
    return valid;
  } catch (err) {
    try {
      window.localStorage.setItem(key, JSON.stringify(fallback));
    } catch (writeErr) {
      hofState.storageAvailable = false;
    }
    return cloneHofData(fallback);
  }
}

/** Writes data to localStorage safely. */
function writeHofStorage(key, value) {
  if (!hofState.storageAvailable) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    hofState.storageAvailable = false;
    document.getElementById("hofStorageBanner")?.classList.remove("d-none");
  }
}

/** Loads string arrays (votes or favourites) safely from localStorage. */
function readHofStringList(key) {
  if (!hofState.storageAvailable) return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch (err) {
    return [];
  }
}

/** Loads saved Hall of Fame filter and active tab preferences. */
function loadHofPrefs() {
  if (!hofState.storageAvailable) return { ...DEFAULT_HOF_PREFS };
  try {
    const raw = window.localStorage.getItem(HOF_KEYS.PREFS);
    if (!raw) return { ...DEFAULT_HOF_PREFS };
    const parsed = JSON.parse(raw);
    return {
      activeTab: ["legends", "nominees", "awards"].includes(parsed.activeTab) ? parsed.activeTab : "legends",
      search: typeof parsed.search === "string" ? parsed.search : "",
      category: typeof parsed.category === "string" ? parsed.category : "All",
      game: typeof parsed.game === "string" ? parsed.game : "All",
      university: typeof parsed.university === "string" ? parsed.university : "All",
      sortBy: ["score", "name", "year"].includes(parsed.sortBy) ? parsed.sortBy : "score",
      favOnly: Boolean(parsed.favOnly),
    };
  } catch (err) {
    return { ...DEFAULT_HOF_PREFS };
  }
}

/**
 * Derives Legend Score dynamically from player stats using SCORE_WEIGHTS.
 * Never stored on the object.
 */
function calculateLegendScore(stats) {
  const s = stats || {};
  return (
    (Number(s.kills) || 0) * SCORE_WEIGHTS.kills +
    (Number(s.wins) || 0) * SCORE_WEIGHTS.wins +
    (Number(s.mvpAwards) || 0) * SCORE_WEIGHTS.mvpAwards +
    (Number(s.championships) || 0) * SCORE_WEIGHTS.championships
  );
}

/** Populates the University filter dropdown from current inductees. */
function populateUniversityFilter() {
  const select = document.getElementById("hofUniFilter");
  if (!select) return;
  const universities = Array.from(new Set(hofState.inductees.map((i) => i.university))).sort();
  select.innerHTML =
    `<option value="All">All Universities</option>` +
    universities.map((u) => `<option value="${escapeHtml(u)}">${escapeHtml(u)}</option>`).join("");
  select.value = universities.includes(hofState.prefs.university) ? hofState.prefs.university : "All";
}

/** Renders the filtered and sorted Hall of Fame inductee cards. */
function renderLegendsGrid() {
  const grid = document.getElementById("legendsGrid");
  const emptyBox = document.getElementById("hofEmptyState");
  const emptyMsg = document.getElementById("hofEmptyMsg");
  const liveCount = document.getElementById("hofLiveCount");
  if (!grid || !emptyBox || !emptyMsg) return;

  const query = hofState.prefs.search.trim().toLowerCase();
  const enriched = hofState.inductees.map((item) => ({
    ...item,
    legendScore: calculateLegendScore(item.stats),
  }));

  const filtered = enriched.filter((item) => {
    if (hofState.prefs.favOnly && !hofState.favs.includes(item.id)) return false;
    if (hofState.prefs.category !== "All" && item.category !== hofState.prefs.category) return false;
    if (hofState.prefs.game !== "All" && item.game !== hofState.prefs.game) return false;
    if (hofState.prefs.university !== "All" && item.university !== hofState.prefs.university) return false;
    if (!query) return true;
    return (
      item.name.toLowerCase().includes(query) ||
      item.title.toLowerCase().includes(query) ||
      item.university.toLowerCase().includes(query) ||
      item.bio.toLowerCase().includes(query)
    );
  });

  filtered.sort((a, b) => {
    if (hofState.prefs.sortBy === "name") return a.name.localeCompare(b.name);
    if (hofState.prefs.sortBy === "year") return b.year - a.year || b.legendScore - a.legendScore;
    return b.legendScore - a.legendScore;
  });

  if (liveCount) {
    liveCount.textContent = `Showing ${filtered.length} of ${enriched.length} Hall of Fame legends`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = "";
    emptyBox.classList.remove("d-none");
    emptyMsg.textContent =
      hofState.prefs.favOnly && hofState.favs.length === 0
        ? "You haven't starred any legends yet."
        : "No legends match the selected filters.";
    return;
  }

  emptyBox.classList.add("d-none");
  grid.innerHTML = filtered
    .map((item) => {
      const isFav = hofState.favs.includes(item.id);
      const fallbackUrl = getFallbackAvatarUrl(item.name);
      return `
        <div class="col-12 col-md-6 col-lg-4">
          <article class="legend-card h-100 d-flex flex-column" tabindex="0" data-legend-id="${escapeHtml(item.id)}" aria-label="${escapeHtml(item.name)}, ${escapeHtml(item.title)}, Legend Score ${item.legendScore}">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <span class="crown-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm0 2h14v2H5v-2z"/></svg>
                ${escapeHtml(item.title)}
              </span>
              <button
                type="button"
                class="fav-star-btn ${isFav ? "is-fav" : ""}"
                data-hof-fav="${escapeHtml(item.id)}"
                aria-pressed="${isFav ? "true" : "false"}"
                aria-label="${isFav ? "Remove" : "Add"} ${escapeHtml(item.name)} from favourites"
              >${isFav ? "★" : "☆"}</button>
            </div>
            <div class="d-flex align-items-center gap-3 mb-3">
              <div class="legend-avatar-wrap">
                <svg class="legend-crown-icon" width="26" height="20" viewBox="0 0 24 24" fill="#ffd700" aria-hidden="true"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5z"/></svg>
                <img
                  src="${escapeHtml(item.avatar)}"
                  alt="${escapeHtml(item.name)} — ${escapeHtml(item.title)} portrait"
                  class="legend-avatar"
                  onerror="this.onerror=null;this.src='${fallbackUrl}';"
                />
              </div>
              <div>
                <h2 class="h5 mb-0">${escapeHtml(item.name)}</h2>
                <div class="small" style="color: var(--rl-text-muted);">${escapeHtml(item.university)} • ${escapeHtml(item.game)}</div>
                <div class="small" style="color: var(--rl-gold);">Inducted ${item.year}</div>
              </div>
            </div>
            <p class="small flex-grow-1 mb-3" style="color: var(--rl-text-muted);">${escapeHtml(item.bio)}</p>
            <div class="d-flex justify-content-between align-items-center pt-2 border-top" style="border-color: var(--rl-border-subtle) !important;">
              <span class="hof-score-pill">Score: ${item.legendScore}</span>
              <span class="small fw-semibold" style="color: var(--rl-red);">View Profile →</span>
            </div>
          </article>
        </div>
      `;
    })
    .join("");
}

/** Renders the Awards History table sorted by year descending. */
function renderAwardsHistory() {
  const tbody = document.getElementById("awardsHistoryBody");
  if (!tbody) return;
  const rows = [...hofState.inductees]
    .map((item) => ({ ...item, legendScore: calculateLegendScore(item.stats) }))
    .sort((a, b) => b.year - a.year || b.legendScore - a.legendScore);

  tbody.innerHTML = rows
    .map(
      (item) => `
      <tr>
        <td class="fw-bold" style="color: var(--rl-gold);">${item.year}</td>
        <td class="fw-semibold">${escapeHtml(item.name)}</td>
        <td><span class="badge bg-danger">${escapeHtml(item.title)}</span></td>
        <td>${escapeHtml(item.game)}</td>
        <td>${escapeHtml(item.university)}</td>
        <td class="text-end fw-bold">${item.legendScore}</td>
      </tr>
    `
    )
    .join("");
}

/** Switches between Legends, Nominees, and Awards History tabs accessibly. */
function activateHofTab(tabKey) {
  hofState.prefs.activeTab = tabKey;
  writeHofStorage(HOF_KEYS.PREFS, hofState.prefs);

  const tabMap = {
    legends: { btn: "tabBtnLegends", panel: "panelLegends" },
    nominees: { btn: "tabBtnNominees", panel: "panelNominees" },
    awards: { btn: "tabBtnAwards", panel: "panelAwards" },
  };

  Object.entries(tabMap).forEach(([key, ids]) => {
    const btn = document.getElementById(ids.btn);
    const panel = document.getElementById(ids.panel);
    const isActive = key === tabKey;
    if (btn) {
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
      btn.tabIndex = isActive ? 0 : -1;
    }
    if (panel) {
      panel.classList.toggle("d-none", !isActive);
    }
  });
}

/** Opens the Bootstrap modal displaying the full profile of a Hall of Fame legend. */
function openLegendModal(legendId) {
  const legend = hofState.inductees.find((i) => i.id === legendId);
  if (!legend) return;

  const score = calculateLegendScore(legend.stats);
  const fallbackUrl = getFallbackAvatarUrl(legend.name);
  const titleEl = document.getElementById("legendModalLabel");
  const bodyEl = document.getElementById("legendModalBody");
  if (!titleEl || !bodyEl) return;

  titleEl.textContent = `${legend.name} — ${legend.title}`;
  bodyEl.innerHTML = `
    <div class="d-flex flex-column flex-sm-row align-items-center gap-3 mb-4">
      <img src="${escapeHtml(legend.avatar)}" alt="${escapeHtml(legend.name)} portrait" class="legend-avatar" onerror="this.onerror=null;this.src='${fallbackUrl}';" />
      <div>
        <span class="crown-badge mb-1">${escapeHtml(legend.category)} • ${legend.year}</span>
        <h3 class="h4 mb-1">${escapeHtml(legend.name)}</h3>
        <p class="mb-0 small" style="color: var(--rl-text-muted);">${escapeHtml(legend.university)} &nbsp;|&nbsp; ${escapeHtml(legend.game)} &nbsp;|&nbsp; Derived Legend Score: <strong style="color: var(--rl-gold);">${score}</strong></p>
      </div>
    </div>
    <div class="row g-2 mb-3 text-center">
      <div class="col-6 col-sm-3"><div class="p-2 rounded rl-card-muted"><div class="small" style="color: var(--rl-text-muted);">Kills</div><div class="fs-5 fw-bold">${legend.stats.kills}</div></div></div>
      <div class="col-6 col-sm-3"><div class="p-2 rounded rl-card-muted"><div class="small" style="color: var(--rl-text-muted);">Wins</div><div class="fs-5 fw-bold">${legend.stats.wins}</div></div></div>
      <div class="col-6 col-sm-3"><div class="p-2 rounded rl-card-muted"><div class="small" style="color: var(--rl-text-muted);">MVPs</div><div class="fs-5 fw-bold">${legend.stats.mvpAwards}</div></div></div>
      <div class="col-6 col-sm-3"><div class="p-2 rounded rl-card-muted"><div class="small" style="color: var(--rl-text-muted);">Titles</div><div class="fs-5 fw-bold" style="color: var(--rl-gold);">${legend.stats.championships}</div></div></div>
    </div>
    <p class="mb-2">${escapeHtml(legend.bio)}</p>
    <blockquote class="p-3 rounded mb-0 fst-italic" style="background-color: #0e1018; border-left: 3px solid var(--rl-gold);">
      “${escapeHtml(legend.quote || "Legends never fade.")}”
    </blockquote>
  `;

  const modalEl = document.getElementById("legendProfileModal");
  if (modalEl && window.bootstrap) {
    window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

/** Toggles an inductee ID in favourites and re-renders cards. */
function toggleHofFavourite(legendId) {
  const idx = hofState.favs.indexOf(legendId);
  if (idx === -1) hofState.favs.push(legendId);
  else hofState.favs.splice(idx, 1);
  writeHofStorage(HOF_KEYS.FAVS, hofState.favs);
  renderLegendsGrid();
}

/** Syncs filter controls to stored preferences. */
function syncHofControlsFromPrefs() {
  document.getElementById("hofSearch").value = hofState.prefs.search;
  document.getElementById("hofCategoryFilter").value = hofState.prefs.category;
  document.getElementById("hofGameFilter").value = hofState.prefs.game;
  document.getElementById("hofSort").value = hofState.prefs.sortBy;
  document.getElementById("hofFavOnly").checked = hofState.prefs.favOnly;
  populateUniversityFilter();
}

/** Binds tabs (including Left/Right arrow keyboard navigation), filters, and card events. */
function bindHofCoreEvents() {
  const tabButtons = Array.from(document.querySelectorAll(".hof-tab-btn"));
  tabButtons.forEach((btn, idx) => {
    btn.addEventListener("click", () => activateHofTab(btn.dataset.tab));
    btn.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const nextIdx = e.key === "ArrowRight" ? (idx + 1) % tabButtons.length : (idx - 1 + tabButtons.length) % tabButtons.length;
        tabButtons[nextIdx].focus();
        activateHofTab(tabButtons[nextIdx].dataset.tab);
      }
    });
  });

  const bindFilterChange = (id, key, eventName = "change", isCheckbox = false) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener(eventName, (e) => {
      hofState.prefs[key] = isCheckbox ? e.target.checked : e.target.value;
      writeHofStorage(HOF_KEYS.PREFS, hofState.prefs);
      renderLegendsGrid();
    });
  };

  bindFilterChange("hofSearch", "search", "input");
  bindFilterChange("hofCategoryFilter", "category");
  bindFilterChange("hofGameFilter", "game");
  bindFilterChange("hofUniFilter", "university");
  bindFilterChange("hofSort", "sortBy");
  bindFilterChange("hofFavOnly", "favOnly", "change", true);

  document.getElementById("hofClearFiltersBtn")?.addEventListener("click", () => {
    hofState.prefs = { ...DEFAULT_HOF_PREFS, activeTab: hofState.prefs.activeTab };
    writeHofStorage(HOF_KEYS.PREFS, hofState.prefs);
    syncHofControlsFromPrefs();
    renderLegendsGrid();
  });

  const grid = document.getElementById("legendsGrid");
  if (grid) {
    grid.addEventListener("click", (e) => {
      const favBtn = e.target.closest("[data-hof-fav]");
      if (favBtn) {
        e.stopPropagation();
        toggleHofFavourite(favBtn.dataset.hofFav);
        return;
      }
      const card = e.target.closest("[data-legend-id]");
      if (card) openLegendModal(card.dataset.legendId);
    });

    grid.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        if (e.target.closest("[data-hof-fav]")) return;
        const card = e.target.closest("[data-legend-id]");
        if (card) {
          e.preventDefault();
          openLegendModal(card.dataset.legendId);
        }
      }
    });
  }
}

/** Initializes Hall of Fame state and UI. */
function initHallOfFame() {
  hofState.storageAvailable = checkHofStorage();
  if (!hofState.storageAvailable) {
    document.getElementById("hofStorageBanner")?.classList.remove("d-none");
  }
  hofState.inductees = readHofArray(HOF_KEYS.INDUCTEES, isValidInductee, DEFAULT_INDUCTEES);
  hofState.nominees = readHofArray(HOF_KEYS.NOMINEES, isValidNominee, DEFAULT_NOMINEES);
  hofState.votedIds = readHofStringList(HOF_KEYS.VOTES);
  hofState.favs = readHofStringList(HOF_KEYS.FAVS);
  hofState.prefs = loadHofPrefs();

  syncHofControlsFromPrefs();
  activateHofTab(hofState.prefs.activeTab);
  bindHofCoreEvents();
  renderLegendsGrid();
  renderAwardsHistory();
}

document.addEventListener("DOMContentLoaded", initHallOfFame);
