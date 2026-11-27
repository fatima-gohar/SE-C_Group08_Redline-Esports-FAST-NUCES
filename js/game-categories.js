/* ==========================================================================
   Redline Esports - Game Categories Page (Search & Navigation to Game Hub)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const categoryGrid = document.getElementById("categoryGrid");
  const searchInput = document.getElementById("gameSearchInput");
  const emptySearchState = document.getElementById("emptySearchState");

  function getHubHref(categoryId) {
    if (categoryId === "Valorant") {
      return "valorant-hub.html";
    }
    return `valorant-hub.html?game=${encodeURIComponent(categoryId)}`;
  }

  function renderCategoryCards(filterText = "") {
    const query = filterText.trim().toLowerCase();
    const filtered = GAME_CATEGORIES.filter((category) => {
      if (!query) return true;
      return (
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query)
      );
    });

    const cards = filtered.map((category) => {
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

      const link = document.createElement("a");
      link.href = getHubHref(category.id);
      link.className = "btn-view-game";
      link.textContent = "View Game";

      body.append(title, desc, link);
      card.append(thumb, body);
      return card;
    });

    categoryGrid.replaceChildren(...cards);
    emptySearchState.hidden = filtered.length > 0;
  }

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      renderCategoryCards(event.target.value);
    });
  }

  renderCategoryCards();
});
