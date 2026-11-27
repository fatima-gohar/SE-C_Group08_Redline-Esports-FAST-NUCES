/* ==========================================================================
   Redline Esports - Ranked Leaderboard Page (Valorant Default + Game Switcher)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  let activeCategory = getGameCategory(params.get("game"));

  const titleEl = document.getElementById("leaderboardTitle");
  const subtitleEl = document.getElementById("leaderboardSubtitle");
  const contentEl = document.getElementById("leaderboardContent");
  const backToHubLink = document.getElementById("backToHubLink");
  const filterButtons = document.querySelectorAll(".leaderboard-filters .filter-pill");

  function renderLeaderboard(category) {
    activeCategory = category;
    document.title = `${category.name} Ranked Leaderboard | Redline Esports`;
    titleEl.innerHTML = `${category.name} Ranked <span>Leaderboard</span>`;
    subtitleEl.textContent = `Top teams in ${category.name}.`;

    if (backToHubLink) {
      backToHubLink.textContent = `\u2190 Back to ${category.name} Hub`;
      backToHubLink.href =
        category.id === "Valorant"
          ? "valorant-hub.html"
          : `valorant-hub.html?game=${encodeURIComponent(category.id)}`;
    }

    filterButtons.forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.game === category.id);
    });

    contentEl.replaceChildren(buildRankingsLayout(category.rankings));
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      renderLeaderboard(getGameCategory(btn.dataset.game));
    });
  });

  renderLeaderboard(activeCategory);
});
