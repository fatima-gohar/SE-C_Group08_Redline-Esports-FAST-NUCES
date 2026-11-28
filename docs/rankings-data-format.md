<!-- Pages 10-12 | Author: 26I-3152 | Redline Esports | FAST NUCES -->
# Redline Esports — Shared Rankings & Match Data Format

This document defines the shared `localStorage` contract used by **Page 10: University Rankings** (`pages/university-rankings.html`) and teammate pages such as **Match Results** (`pages/match-results.html`).

---

## 1. Shared `localStorage` Keys

| Key | Owner / Writers | Readers | Purpose |
| --- | --- | --- | --- |
| `redline_universities` | University Rankings (Page 10) | University Rankings, Match Results | Array of participating universities and their per-game baseline points. |
| `redline_match_records` | Match Results, University Rankings | University Rankings, Match Results | Array of recorded match results used to derive live university standings. |

> **Important Rule:** Derived totals (`points`, `wins`, `losses`, `draws`, `winRate`, `rank`, `rankMovement`) are **never stored** in `localStorage`. They are always computed dynamically by `calculateStandings()`.

### Page-Specific `localStorage` Keys (Page 10)

| Key | Purpose |
| --- | --- |
| `redline_rankings_prefs` | Stores `{ gameFilter, sortBy, searchQuery, favOnly }`. |
| `redline_rankings_favourites` | Stores an array of starred university `id` strings (e.g. `["nuces", "fast"]`). |

---

## 2. Schema: `redline_universities`

Stored as a JSON array of university objects:

```json
[
  {
    "id": "nuces",
    "name": "FAST-NUCES Islamabad",
    "shortCode": "NUCES",
    "city": "Islamabad",
    "baselinePoints": {
      "Valorant": 920,
      "BGMI": 780,
      "CS2": 744
    }
  }
]
```

### Field Validation Rules
- `id`: Non-empty unique string slug (lowercase alphanumeric/hyphens).
- `name`: Non-empty unique string (case-insensitive uniqueness enforced).
- `shortCode`: Non-empty unique short code (e.g. `"NUCES"`, `"LUMS"`).
- `city`: Non-empty city name string.
- `baselinePoints`: Object containing non-negative finite numbers for `"Valorant"`, `"BGMI"`, and `"CS2"`.

---

## 3. Schema: `redline_match_records`

Stored as a JSON array of match record objects:

```json
[
  {
    "id": "match-101",
    "date": "2026-11-24",
    "game": "Valorant",
    "universityA": "nuces",
    "universityB": "fast",
    "result": "A",
    "isTournamentFinal": true
  }
]
```

### Field Validation Rules
- `id`: Non-empty unique string identifier.
- `date`: ISO date string `"YYYY-MM-DD"`, not in the future.
- `game`: One of `"Valorant"`, `"BGMI"`, `"CS2"`.
- `universityA`: University `id` referencing an entry in `redline_universities`.
- `universityB`: University `id` referencing an entry in `redline_universities` (`universityA !== universityB`).
- `result`: One of `"A"`, `"B"`, `"draw"`.
- `isTournamentFinal`: Boolean (`true` if the match is a tournament final, `false` otherwise).

---

## 4. Points & Tie-Breaker Rules (`calculateStandings`)

For a selected `gameFilter` (`"All"`, `"Valorant"`, `"BGMI"`, or `"CS2"`):

1. **Baseline Points:**
   - If `"All"`: `Valorant + BGMI + CS2` baseline points.
   - Otherwise: `baselinePoints[gameFilter]`.
2. **Match Points (per valid record where both `universityA` and `universityB` exist):**
   - Win: `+3` points (`+50` bonus if `isTournamentFinal === true`)
   - Draw: `+1` point to each university
   - Loss: `+0` points
   - Records referencing unknown university IDs are safely ignored.
3. **Sorting & Tie-Breakers:**
   1. Total derived `points` (descending)
   2. Derived `wins` (descending)
   3. University `shortCode` / `name` (ascending, A–Z)
4. **Cross-Tab Sync:**
   - Listening to `window.addEventListener("storage", ...)` automatically reloads and re-renders standings when another tab (such as Match Results) pushes a record into `redline_match_records` or updates `redline_universities`.
