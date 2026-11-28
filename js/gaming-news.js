/* Pages 10-12 | Author: 26I-3152 | Redline Esports | FAST NUCES */

// VIVA: change here — localStorage keys (all prefixed with redline_news_)
const NEWS_KEYS = {
  ARTICLES: "redline_news_articles",
  BOOKMARKS: "redline_news_bookmarks",
  RECENT: "redline_news_recent",
  NEWSLETTER: "redline_news_newsletter",
  PREFS: "redline_news_prefs",
};

// VIVA: change here — reading speed (words per minute) and pagination step
const WORDS_PER_MINUTE = 200;
const ARTICLES_PER_PAGE = 6;

const NEWS_CATEGORIES = ["All", "Tournaments", "Teams", "Updates", "Community"];

// VIVA: change here — seeded realistic esports news articles (newest first)
const DEFAULT_ARTICLES = [
  {
    id: "news-championship-2026",
    title: "Redline Esports Championship 2026 Announced!",
    summary: "FAST NUCES Islamabad will host Pakistan's premier inter-university LAN finals across Valorant, BGMI, and CS2 with a record prize pool.",
    body: "FAST-NUCES Islamabad has officially unveiled the Redline Esports Championship 2026, bringing together sixteen top university rosters from Islamabad, Lahore, Karachi, and Topi for a three-day LAN spectacle.\n\nRegional online qualifiers open next week across Valorant, BGMI, and Counter-Strike 2. Every tournament final victory will award a +50 championship bonus on the University Rankings leaderboard.\n\nSpectator passes for the Main Auditorium stage will open free of charge to verified university students with campus ID cards, alongside live multi-stream coverage on Redline YouTube and Discord.",
    category: "Tournaments",
    game: "All Games",
    author: "Redline Editorial Desk",
    date: "2026-11-15",
    image: "../images/news-championship-2026.jpg",
  },
  {
    id: "news-nuces-val-streak",
    title: "FAST-NUCES Raptors Extend Unbeaten Valorant Run Against LUMS",
    summary: "Ayaan Khan dropped 28 eliminations on Ascent as NUCES locked down first place in the Valorant standings.",
    body: "FAST-NUCES Raptors continued their dominant autumn campaign with a crisp 2-0 victory over LUMS Sentinels in Friday's marquee Valorant clash.\n\nLeading from the front, duelist Ayaan Khan set the pace with aggressive A-main entries, while mid-round caller Hamza Tariq shut down LUMS's late retakes on Bind.\n\nWith the win, NUCES widens its lead on the University Rankings table ahead of next weekend's inter-campus playoffs.",
    category: "Tournaments",
    game: "Valorant",
    author: "Zoya Kamran",
    date: "2026-11-13",
    image: "../images/news-valorant-raptors.jpg",
  },
  {
    id: "news-fast-lahore-bgmi",
    title: "FAST Lahore Claims BGMI Autumn Crown With Final-Circle Masterclass",
    summary: "Taha Siddiqui's four-finish Erangel clutch sealed +53 ranking points for FAST-NUCES Lahore in the BGMI finale.",
    body: "In a nail-biting final circle near Pochinki, FAST-NUCES Lahore outlasted UET and COMSATS to lift the Autumn BGMI Invitational trophy.\n\nFacing two full squads in the seventh zone, IGL calls kept Lahore on high ground before Taha Siddiqui wiped the remaining flankers with precise DMR bursts.\n\nThe tournament final triumph adds a +50 bonus on top of match points, propelling FAST Lahore firmly into the top two overall.",
    category: "Tournaments",
    game: "BGMI",
    author: "Bilal Masood",
    date: "2026-11-11",
    image: "../images/news-bgmi-finals.jpg",
  },
  {
    id: "news-cs2-patch-notes",
    title: "Redline CS2 Rulebook Updated: MR12 Overtime and Server Tick Rules",
    summary: "Tournament admins publish updated competitive guidelines for map vetoes, tactical pauses, and anti-cheat verification.",
    body: "The Redline Technical Committee has released the Season 4 CS2 competitive rulebook ahead of the knockout stage.\n\nAll official bracket matches will use MR12 regulation with MR3 overtime at $12,500 starting money. Each university roster receives four 30-second tactical timeouts per map.\n\nTeam captains must complete anti-cheat client checks twenty minutes prior to scheduled server launch.",
    category: "Updates",
    game: "CS2",
    author: "Admin Operations",
    date: "2026-11-09",
    image: "../images/news-cs2-rules.jpg",
  },
  {
    id: "news-lums-roster-rebuild",
    title: "LUMS Sentinels Sign Two Rising CS2 Riflers Ahead of Winter Split",
    summary: "Fresh sophomore talent joins the Lahore squad following open campus tryouts featuring over ninety applicants.",
    body: "LUMS Sentinels have bolstered their Counter-Strike 2 starting five by promoting two standout players from their internal campus league.\n\nCoach Haris Mahmood emphasized utility coordination and Mirage executes during the two-week tryout bootcamp.\n\nThe refreshed roster debuts against NUST Eagles in next Friday's streamed Group B opener.",
    category: "Teams",
    game: "CS2",
    author: "Saad Rehman",
    date: "2026-11-06",
    image: "../images/news-lums-roster.jpg",
  },
  {
    id: "news-comsats-bootcamp",
    title: "Inside COMSATS Islamabad's Campus Esports Practice Lab",
    summary: "How student organizers built a 144Hz scrimmage room to prepare rosters for Redline qualifiers.",
    body: "What started as a weekend student club has evolved into one of Islamabad's sharpest collegiate practice hubs.\n\nCOMSATS esports coordinators outfitted twelve high-refresh stations for coordinated Valorant and BGMI VOD review sessions every Tuesday and Thursday.\n\nCaptain Maham Tariq credits the shared LAN environment for their improved late-round communication.",
    category: "Community",
    game: "All Games",
    author: "Amina Farooq",
    date: "2026-11-03",
    image: "../images/news-comsats-lab.jpg",
  },
  {
    id: "news-hall-of-fame-voting",
    title: "Community Voting Opens for 2026 Hall of Fame Induction Class",
    summary: "Students can now cast one vote per nominee on the Hall of Fame portal before the ten-vote induction cutoff.",
    body: "Redline Esports has opened community voting for the 2026 Hall of Fame class, spotlighting breakout stars from FAST-NUCES, LUMS, NUST, and Air University.\n\nAny nominee reaching ten community votes is automatically inducted alongside legends such as Ayaan Khan, Sara Ahmed, and Zain Malik.\n\nVisit the Hall of Fame page to review career stats, compute Legend Scores, and nominate overlooked campus heroes.",
    category: "Community",
    game: "All Games",
    author: "Redline Editorial Desk",
    date: "2026-10-30",
    image: "../images/news-hof-vote.jpg",
  },
  {
    id: "news-nust-valorant-bootcamp",
    title: "NUST Eagles Unveil New Ascent & Lotus Defensive Setups",
    summary: "Analyst breakdown shows how NUST improved their pistol round win rate by 22 percent in October scrims.",
    body: "After a narrow group-stage exit in Spring, NUST Eagles spent October overhauling their Valorant defensive protocols.\n\nBy pairing aggressive initiator recon with double-controller post-plant setups, the squad climbed into contention for a top-four university seed.\n\nAnalysts highlight their disciplined economy management as a major threat in best-of-three series.",
    category: "Teams",
    game: "Valorant",
    author: "Zoya Kamran",
    date: "2026-10-26",
    image: "../images/news-nust-val.jpg",
  },
  {
    id: "news-bgmi-map-rotation",
    title: "BGMI Tournament Pool Adds Miramar & Sanhok Point Multipliers",
    summary: "Placement points adjusted to reward aggressive mid-game rotations and survival consistency across four-map lobbies.",
    body: "League organizers have tuned the BGMI scoring matrix for the remainder of the 2026 collegiate season.\n\nEach elimination remains worth one point, while Victory Royale placement now awards ten points to encourage decisive final-circle engagements.\n\nSquads competing on Erangel, Miramar, and Sanhok must submit lobby screenshots immediately after match end.",
    category: "Updates",
    game: "BGMI",
    author: "Admin Operations",
    date: "2026-10-22",
    image: "../images/news-bgmi-update.jpg",
  },
  {
    id: "news-giki-iba-draw",
    title: "GIKI and IBA Split Points in Historic Valorant Overtime Thriller",
    summary: "Twenty-six rounds on Split ended deadlocked as both campuses earned crucial standings points.",
    body: "Fans watching Friday's inter-university broadcast witnessed one of the closest series of the semester between GIKI and IBA Karachi.\n\nAfter trading 13-11 maps, overtime regulations declared a rare official draw under round-robin split rules, awarding one standings point apiece.\n\nBoth captains praised the sportsmanship and razor-thin tactical margins shown throughout the match.",
    category: "Tournaments",
    game: "Valorant",
    author: "Bilal Masood",
    date: "2026-10-18",
    image: "../images/news-giki-iba.jpg",
  },
  {
    id: "news-casters-program",
    title: "Student Caster & Broadcast Crew Applications Open at FAST NUCES",
    summary: "Aspiring shoutcasters, observers, and graphic operators can join the live production booth for Finals weekend.",
    body: "Redline Esports is inviting FAST NUCES students passionate about broadcast production to apply for the Championship 2026 commentary and observer team.\n\nSelected volunteers will shadow experienced collegiate casters, manage instant replay clips, and run live tournament overlays.\n\nTraining workshops begin two weeks prior to the Main Auditorium LAN kickoff.",
    category: "Community",
    game: "All Games",
    author: "Amina Farooq",
    date: "2026-10-14",
    image: "../images/news-casters.jpg",
  },
];

const DEFAULT_NEWS_PREFS = {
  category: "All",
  game: "All",
  search: "",
  sortBy: "newest",
  bookmarksOnly: false,
};

const newsState = {
  articles: [],
  bookmarks: [],
  recentlyViewed: [],
  subscribers: [],
  prefs: { ...DEFAULT_NEWS_PREFS },
  visibleLimit: ARTICLES_PER_PAGE,
  activeModalArticleId: null,
  storageAvailable: true,
};

/** Clones plain JSON data safely. */
function cloneNewsData(data) {
  return JSON.parse(JSON.stringify(data));
}

/** Escapes HTML special characters safely. */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Builds an SVG data-URI fallback image for missing news thumbnails. */
function getNewsFallbackImage(title) {
  const safeLabel = String(title || "REDLINE NEWS").slice(0, 28);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><rect width="800" height="450" fill="#12141d"/><rect x="20" y="20" width="760" height="410" fill="none" stroke="#e10600" stroke-width="4"/><text x="400" y="210" fill="#e10600" font-family="Arial,sans-serif" font-size="24" font-weight="bold" text-anchor="middle">REDLINE ESPORTS WIRE</text><text x="400" y="255" fill="#ffffff" font-family="Arial,sans-serif" font-size="22" font-weight="bold" text-anchor="middle">${escapeHtml(safeLabel)}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/** Tests browser localStorage availability. */
function checkNewsStorage() {
  try {
    const k = "__news_probe__";
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    return true;
  } catch (err) {
    return false;
  }
}

/** Validates an article object structure. */
function isValidArticle(a) {
  return (
    a &&
    typeof a === "object" &&
    typeof a.id === "string" &&
    typeof a.title === "string" &&
    typeof a.summary === "string" &&
    typeof a.body === "string" &&
    typeof a.category === "string" &&
    typeof a.game === "string" &&
    typeof a.author === "string" &&
    typeof a.date === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(a.date)
  );
}

/** Reads and validates an array from localStorage, falling back to seeds if corrupted. */
function readNewsArray(key, validator, fallback) {
  if (!newsState.storageAvailable) return cloneNewsData(fallback);
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      window.localStorage.setItem(key, JSON.stringify(fallback));
      return cloneNewsData(fallback);
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error("Expected array");
    const valid = parsed.filter(validator);
    if (parsed.length > 0 && valid.length === 0) throw new Error("No valid articles");
    return valid;
  } catch (err) {
    try {
      window.localStorage.setItem(key, JSON.stringify(fallback));
    } catch (writeErr) {
      newsState.storageAvailable = false;
    }
    return cloneNewsData(fallback);
  }
}

/** Reads a simple array of strings from localStorage. */
function readNewsStringList(key) {
  if (!newsState.storageAvailable) return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch (err) {
    return [];
  }
}

/** Writes data to localStorage safely. */
function writeNewsStorage(key, value) {
  if (!newsState.storageAvailable) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    newsState.storageAvailable = false;
    document.getElementById("newsStorageBanner")?.classList.remove("d-none");
  }
}

/** Loads saved Gaming News preferences. */
function loadNewsPrefs() {
  if (!newsState.storageAvailable) return { ...DEFAULT_NEWS_PREFS };
  try {
    const raw = window.localStorage.getItem(NEWS_KEYS.PREFS);
    if (!raw) return { ...DEFAULT_NEWS_PREFS };
    const parsed = JSON.parse(raw);
    return {
      category: NEWS_CATEGORIES.includes(parsed.category) ? parsed.category : "All",
      game: typeof parsed.game === "string" ? parsed.game : "All",
      search: typeof parsed.search === "string" ? parsed.search : "",
      sortBy: ["newest", "oldest"].includes(parsed.sortBy) ? parsed.sortBy : "newest",
      bookmarksOnly: Boolean(parsed.bookmarksOnly),
    };
  } catch (err) {
    return { ...DEFAULT_NEWS_PREFS };
  }
}

/** Computes derived reading time in minutes (words / 200 rounded up). */
function computeReadingTime(article) {
  const text = `${article.title} ${article.summary} ${article.body}`;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/** Computes a human-readable relative "days ago" label from YYYY-MM-DD. */
function computeDaysAgoLabel(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const articleDate = new Date(y, m - 1, d);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.round((today - articleDate) / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
}

/** Formats ISO date string into readable format (e.g., Nov 15, 2026). */
function formatDisplayDate(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Computes category counts dynamically from current articles[]. */
function getCategoryCounts() {
  const counts = { All: newsState.articles.length, Tournaments: 0, Teams: 0, Updates: 0, Community: 0 };
  newsState.articles.forEach((a) => {
    if (typeof counts[a.category] === "number") {
      counts[a.category] += 1;
    }
  });
  return counts;
}

/** Computes the newest (featured) article dynamically from data. */
function getFeaturedArticle() {
  if (newsState.articles.length === 0) return null;
  const sorted = [...newsState.articles].sort((a, b) => b.date.localeCompare(a.date));
  return sorted[0];
}

/** Renders the featured article banner at the top of the page. */
function renderFeaturedArticle() {
  const container = document.getElementById("featuredArticleSection");
  if (!container) return;
  const featured = getFeaturedArticle();
  if (!featured) {
    container.innerHTML = "";
    return;
  }

  const readMins = computeReadingTime(featured);
  const daysAgo = computeDaysAgoLabel(featured.date);
  const fallback = getNewsFallbackImage(featured.title);

  container.innerHTML = `
    <article class="featured-news-card">
      <div class="row g-0 align-items-stretch">
        <div class="col-12 col-lg-5">
          <img
            src="${escapeHtml(featured.image || "")}"
            alt="${escapeHtml(featured.title)}"
            class="featured-news-img"
            onerror="this.onerror=null;this.src='${fallback}';"
          />
        </div>
        <div class="col-12 col-lg-7 p-4 d-flex flex-column justify-content-between">
          <div>
            <div class="d-flex flex-wrap align-items-center gap-2 mb-2">
              <span class="badge bg-danger">Featured</span>
              <span class="badge bg-dark border border-secondary">${escapeHtml(featured.category)}</span>
              <span class="small" style="color: var(--rl-text-muted);">${escapeHtml(formatDisplayDate(featured.date))} • ${escapeHtml(daysAgo)} • ${readMins} min read</span>
            </div>
            <h2 class="h3 mb-2">${escapeHtml(featured.title)}</h2>
            <p class="mb-3" style="color: var(--rl-text-muted);">${escapeHtml(featured.summary)}</p>
          </div>
          <div class="d-flex flex-wrap align-items-center justify-content-between gap-2">
            <span class="small" style="color: var(--rl-text-muted);">By ${escapeHtml(featured.author)}</span>
            <button type="button" class="btn btn-redline btn-sm px-3 read-more-btn" data-read-id="${escapeHtml(featured.id)}">Read More</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

/** Renders category filter buttons with derived article counts. */
function renderCategoryTabs() {
  const container = document.getElementById("newsCategoryTabs");
  if (!container) return;
  const counts = getCategoryCounts();
  container.innerHTML = NEWS_CATEGORIES.map((cat) => {
    const active = newsState.prefs.category === cat ? "active" : "";
    return `<button type="button" class="btn btn-redline-outline btn-sm news-cat-btn ${active}" data-cat="${escapeHtml(cat)}">${escapeHtml(cat)} (${counts[cat] || 0})</button>`;
  }).join("");
}

/** Filters and sorts articles according to user preferences. */
function getFilteredSortedArticles() {
  const query = newsState.prefs.search.trim().toLowerCase();
  const filtered = newsState.articles.filter((a) => {
    if (newsState.prefs.bookmarksOnly && !newsState.bookmarks.includes(a.id)) return false;
    if (newsState.prefs.category !== "All" && a.category !== newsState.prefs.category) return false;
    if (newsState.prefs.game !== "All" && a.game !== newsState.prefs.game) return false;
    if (!query) return true;
    return (
      a.title.toLowerCase().includes(query) ||
      a.summary.toLowerCase().includes(query) ||
      a.author.toLowerCase().includes(query) ||
      a.category.toLowerCase().includes(query)
    );
  });

  filtered.sort((a, b) => {
    if (newsState.prefs.sortBy === "oldest") return a.date.localeCompare(b.date);
    return b.date.localeCompare(a.date);
  });
  return filtered;
}

/** Renders the paginated card grid and Load More button. */
function renderNewsGrid() {
  const grid = document.getElementById("newsGrid");
  const emptyBox = document.getElementById("newsEmptyState");
  const emptyMsg = document.getElementById("newsEmptyMsg");
  const loadMoreBtn = document.getElementById("loadMoreNewsBtn");
  const statusEl = document.getElementById("newsLiveStatus");
  if (!grid || !emptyBox || !emptyMsg || !loadMoreBtn) return;

  const matched = getFilteredSortedArticles();
  const visible = matched.slice(0, newsState.visibleLimit);

  if (statusEl) {
    statusEl.textContent = `Showing ${visible.length} of ${matched.length} matching articles`;
  }

  if (matched.length === 0) {
    grid.innerHTML = "";
    emptyBox.classList.remove("d-none");
    loadMoreBtn.classList.add("d-none");
    emptyMsg.textContent =
      newsState.prefs.bookmarksOnly && newsState.bookmarks.length === 0
        ? "No bookmarked articles yet."
        : "No articles match your filters.";
    return;
  }

  emptyBox.classList.add("d-none");
  loadMoreBtn.classList.toggle("d-none", visible.length >= matched.length);

  grid.innerHTML = visible
    .map((art) => {
      const isBookmarked = newsState.bookmarks.includes(art.id);
      const readMins = computeReadingTime(art);
      const daysAgo = computeDaysAgoLabel(art.date);
      const fallback = getNewsFallbackImage(art.title);
      return `
        <div class="col-12 col-md-6 col-lg-4">
          <article class="news-card h-100 d-flex flex-column">
            <img
              src="${escapeHtml(art.image || "")}"
              alt="${escapeHtml(art.title)}"
              class="news-card-img"
              onerror="this.onerror=null;this.src='${fallback}';"
            />
            <div class="p-3 d-flex flex-column flex-grow-1">
              <div class="d-flex justify-content-between align-items-center mb-2 gap-2">
                <span class="badge bg-danger">${escapeHtml(art.category)}</span>
                <span class="small" style="color: var(--rl-text-muted);">${escapeHtml(art.game)} • ${readMins} min read</span>
              </div>
              <h3 class="h5 mb-2">${escapeHtml(art.title)}</h3>
              <p class="small flex-grow-1 mb-3" style="color: var(--rl-text-muted);">${escapeHtml(art.summary)}</p>
              <div class="small mb-3" style="color: var(--rl-text-muted);">
                ${escapeHtml(formatDisplayDate(art.date))} (${escapeHtml(daysAgo)}) • ${escapeHtml(art.author)}
              </div>
              <div class="d-flex justify-content-between align-items-center pt-2 border-top" style="border-color: var(--rl-border-subtle) !important;">
                <button type="button" class="btn btn-redline btn-sm px-3 read-more-btn" data-read-id="${escapeHtml(art.id)}">Read More</button>
                <button
                  type="button"
                  class="bookmark-btn ${isBookmarked ? "is-bookmarked" : ""}"
                  data-bookmark-id="${escapeHtml(art.id)}"
                  aria-pressed="${isBookmarked ? "true" : "false"}"
                  aria-label="${isBookmarked ? "Remove bookmark for" : "Bookmark"} ${escapeHtml(art.title)}"
                >${isBookmarked ? "★ Saved" : "☆ Save"}</button>
              </div>
            </div>
          </article>
        </div>
      `;
    })
    .join("");
}

/** Opens the Bootstrap reader modal with the full multi-paragraph article. */
function openArticleModal(articleId) {
  const art = newsState.articles.find((a) => a.id === articleId);
  if (!art) return;

  newsState.activeModalArticleId = articleId;
  if (typeof recordRecentlyViewed === "function") {
    recordRecentlyViewed(articleId);
  }

  const modalTitle = document.getElementById("newsModalLabel");
  const modalBody = document.getElementById("newsModalBody");
  const modalBookmarkBtn = document.getElementById("modalBookmarkBtn");
  if (!modalTitle || !modalBody) return;

  const readMins = computeReadingTime(art);
  const daysAgo = computeDaysAgoLabel(art.date);
  const fallback = getNewsFallbackImage(art.title);
  const paragraphs = art.body
    .split(/\n\s*\n/)
    .map((p) => `<p>${escapeHtml(p.trim())}</p>`)
    .join("");

  modalTitle.textContent = art.title;
  modalBody.innerHTML = `
    <img src="${escapeHtml(art.image || "")}" alt="${escapeHtml(art.title)}" class="img-fluid rounded mb-3 w-100" style="max-height: 280px; object-fit: cover;" onerror="this.onerror=null;this.src='${fallback}';" />
    <div class="d-flex flex-wrap gap-2 align-items-center mb-3">
      <span class="badge bg-danger">${escapeHtml(art.category)}</span>
      <span class="badge bg-dark border border-secondary">${escapeHtml(art.game)}</span>
      <span class="small" style="color: var(--rl-text-muted);">By ${escapeHtml(art.author)} • ${escapeHtml(formatDisplayDate(art.date))} (${escapeHtml(daysAgo)}) • ${readMins} min read</span>
    </div>
    <p class="lead">${escapeHtml(art.summary)}</p>
    ${paragraphs}
  `;

  if (modalBookmarkBtn) {
    const saved = newsState.bookmarks.includes(articleId);
    modalBookmarkBtn.textContent = saved ? "★ Bookmarked" : "☆ Bookmark Article";
    modalBookmarkBtn.dataset.bookmarkId = articleId;
  }

  const modalEl = document.getElementById("newsReaderModal");
  if (modalEl && window.bootstrap) {
    window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

/** Syncs filter inputs with stored preferences. */
function syncNewsControlsFromPrefs() {
  document.getElementById("newsSearch").value = newsState.prefs.search;
  document.getElementById("newsGameFilter").value = newsState.prefs.game;
  document.getElementById("newsSort").value = newsState.prefs.sortBy;
  document.getElementById("newsBookmarksOnly").checked = newsState.prefs.bookmarksOnly;
  renderCategoryTabs();
}

/** Binds core filter, search, sort, pagination, and Read More listeners. */
function bindNewsCoreEvents() {
  document.getElementById("newsCategoryTabs")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cat]");
    if (!btn) return;
    newsState.prefs.category = btn.dataset.cat;
    newsState.visibleLimit = ARTICLES_PER_PAGE;
    writeNewsStorage(NEWS_KEYS.PREFS, newsState.prefs);
    renderCategoryTabs();
    renderNewsGrid();
  });

  document.getElementById("newsSearch")?.addEventListener("input", (e) => {
    newsState.prefs.search = e.target.value;
    newsState.visibleLimit = ARTICLES_PER_PAGE;
    writeNewsStorage(NEWS_KEYS.PREFS, newsState.prefs);
    renderNewsGrid();
  });

  document.getElementById("newsGameFilter")?.addEventListener("change", (e) => {
    newsState.prefs.game = e.target.value;
    newsState.visibleLimit = ARTICLES_PER_PAGE;
    writeNewsStorage(NEWS_KEYS.PREFS, newsState.prefs);
    renderNewsGrid();
  });

  document.getElementById("newsSort")?.addEventListener("change", (e) => {
    newsState.prefs.sortBy = e.target.value;
    writeNewsStorage(NEWS_KEYS.PREFS, newsState.prefs);
    renderNewsGrid();
  });

  document.getElementById("newsBookmarksOnly")?.addEventListener("change", (e) => {
    newsState.prefs.bookmarksOnly = e.target.checked;
    newsState.visibleLimit = ARTICLES_PER_PAGE;
    writeNewsStorage(NEWS_KEYS.PREFS, newsState.prefs);
    renderNewsGrid();
  });

  document.getElementById("loadMoreNewsBtn")?.addEventListener("click", () => {
    newsState.visibleLimit += ARTICLES_PER_PAGE;
    renderNewsGrid();
  });

  const resetFiltersToAll = () => {
    newsState.prefs = { ...DEFAULT_NEWS_PREFS };
    newsState.visibleLimit = ARTICLES_PER_PAGE;
    writeNewsStorage(NEWS_KEYS.PREFS, newsState.prefs);
    syncNewsControlsFromPrefs();
    renderNewsGrid();
  };

  document.getElementById("newsClearFiltersBtn")?.addEventListener("click", resetFiltersToAll);
  document.getElementById("viewAllNewsBtn")?.addEventListener("click", () => {
    resetFiltersToAll();
    document.getElementById("newsGridSection")?.scrollIntoView({ behavior: "smooth" });
  });

  document.addEventListener("click", (e) => {
    const readBtn = e.target.closest("[data-read-id]");
    if (readBtn) {
      openArticleModal(readBtn.dataset.readId);
    }
  });
}

/** Initializes Gaming News state and renders initial content. */
function initGamingNews() {
  newsState.storageAvailable = checkNewsStorage();
  if (!newsState.storageAvailable) {
    document.getElementById("newsStorageBanner")?.classList.remove("d-none");
  }
  newsState.articles = readNewsArray(NEWS_KEYS.ARTICLES, isValidArticle, DEFAULT_ARTICLES);
  newsState.bookmarks = readNewsStringList(NEWS_KEYS.BOOKMARKS);
  newsState.recentlyViewed = readNewsStringList(NEWS_KEYS.RECENT);
  newsState.subscribers = readNewsStringList(NEWS_KEYS.NEWSLETTER);
  newsState.prefs = loadNewsPrefs();

  syncNewsControlsFromPrefs();
  bindNewsCoreEvents();
  renderFeaturedArticle();
  renderNewsGrid();
}

document.addEventListener("DOMContentLoaded", initGamingNews);
