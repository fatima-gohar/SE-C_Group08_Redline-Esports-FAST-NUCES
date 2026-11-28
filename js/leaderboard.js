/* ==========================================================================
   Redline Esports - Ranked Leaderboard Page (Prototype-Faithful)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const gameParam = params.get("game");
  const contentEl = document.getElementById("leaderboardContent");
  const subtitleEl = document.querySelector(".page-subtitle");
  const filterButtons = document.querySelectorAll(".filter-pill[data-game]");

  if (!contentEl) return;

  function renderLeaderboard(gameKey) {
    const isAll = !gameKey || gameKey.toLowerCase() === "all";

    filterButtons.forEach((btn) => {
      const matches = btn.dataset.game.toLowerCase() === (isAll ? "all" : gameKey.toLowerCase());
      btn.classList.toggle("is-active", matches);
    });

    if (isAll) {
      document.title = "Leaderboard | Redline Esports";
      if (subtitleEl) {
        subtitleEl.textContent = "Top performers this season — All Games.";
      }
      contentEl.replaceChildren(buildRankingsLayout(GENERAL_LEADERBOARD));
    } else {
      const activeCategory = getGameCategory(gameKey);
      document.title = `${activeCategory.name} Ranked Leaderboard | Redline Esports`;
      if (subtitleEl) {
        subtitleEl.textContent = `Top performers this season — ${activeCategory.name}.`;
      }
      contentEl.replaceChildren(buildRankingsLayout(activeCategory.rankings));
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedGame = button.dataset.game;
      renderLeaderboard(selectedGame);

      const url = new URL(window.location.href);
      if (selectedGame === "all") {
        url.searchParams.delete("game");
      } else {
        url.searchParams.set("game", selectedGame);
      }
      window.history.replaceState({}, "", url);
    });
  });

  renderLeaderboard(gameParam || "all");
});
