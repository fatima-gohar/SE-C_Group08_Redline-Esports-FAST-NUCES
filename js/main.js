/* ==========================================================================
   Redline Esports - Shared All-Pages Dropdown & Join Modal
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const pagesDropdown = document.getElementById("pagesDropdown");
  const joinModal = document.getElementById("joinModal");
  const openJoinBtn = document.getElementById("openJoinModal");
  const joinForm = document.getElementById("joinForm");
  const joinFeedback = document.getElementById("joinFeedback");

  function closeDropdown() {
    if (!pagesDropdown || !menuToggle) return;
    pagesDropdown.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
  }

  function closeAllModals() {
    document.querySelectorAll(".modal-overlay").forEach((modal) => {
      modal.hidden = true;
    });
  }

  if (menuToggle && pagesDropdown) {
    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const willOpen = pagesDropdown.hidden;
      pagesDropdown.hidden = !willOpen;
      menuToggle.setAttribute("aria-expanded", String(willOpen));
    });

    document.addEventListener("click", (event) => {
      if (!pagesDropdown.hidden && !pagesDropdown.contains(event.target) && event.target !== menuToggle) {
        closeDropdown();
      }
    });
  }

  if (openJoinBtn && joinModal) {
    openJoinBtn.addEventListener("click", () => {
      closeDropdown();
      joinModal.hidden = false;
      const nameInput = document.getElementById("joinName");
      if (nameInput) nameInput.focus();
    });
  }

  document.querySelectorAll("[data-close-modal]").forEach((btn) => {
    btn.addEventListener("click", closeAllModals);
  });

  document.querySelectorAll(".modal-overlay").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.hidden = true;
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDropdown();
      closeAllModals();
    }
  });

  if (joinForm && joinFeedback) {
    joinForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("joinName").value.trim();
      const game = document.getElementById("joinGame").value;
      joinFeedback.textContent = `Thanks, ${name}! Your ${game} registration request has been recorded.`;
      joinFeedback.hidden = false;
      joinForm.reset();
    });
  }
});
