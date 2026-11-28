/* ==========================================================================
   REDLINE ESPORTS | FAST NUCES - Media Gallery JavaScript
   Simple, readable vanilla JS for:
   1. Mobile Menu Toggle
   2. Media Gallery Filter (All / Photos / Videos)
   3. Load More Button
   4. Lightbox Image Preview Modal
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // ------------------------------------------------------------------------
  // 1. 3-Bar All-Pages Menu Toggle (Top-Right Corner)
  // ------------------------------------------------------------------------
  const menuBtn = document.getElementById("menuBtn");
  const allPagesMenu = document.getElementById("allPagesMenu");

  if (menuBtn && allPagesMenu) {
    menuBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      allPagesMenu.classList.toggle("open");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (!allPagesMenu.contains(event.target) && event.target !== menuBtn) {
        allPagesMenu.classList.remove("open");
      }
    });

    // Close menu on Escape key
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        allPagesMenu.classList.remove("open");
      }
    });
  }

  // ------------------------------------------------------------------------
  // 2. Media Gallery: Filter Chips & Load More Button
  // ------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll(".chip[data-filter]");
  const galleryCards = document.querySelectorAll(".gallery-card");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  let activeFilter = "all";
  let showAllItems = false;
  const initialVisibleCount = 6; // Shows 3x2 grid first (matches prototype)

  function updateGallery() {
    let visibleMatches = 0;
    let totalMatches = 0;

    galleryCards.forEach(function (card) {
      const category = card.getAttribute("data-category");
      const matchesFilter = activeFilter === "all" || category === activeFilter;

      if (matchesFilter) {
        totalMatches++;
        if (showAllItems || visibleMatches < initialVisibleCount) {
          card.classList.remove("is-hidden");
          visibleMatches++;
        } else {
          card.classList.add("is-hidden");
        }
      } else {
        card.classList.add("is-hidden");
      }
    });

    // Hide "Load More" button once all matching items are visible
    if (loadMoreBtn) {
      if (showAllItems || totalMatches <= initialVisibleCount) {
        loadMoreBtn.style.display = "none";
      } else {
        loadMoreBtn.style.display = "inline-flex";
      }
    }
  }

  // Filter button click handling (All / Photos / Videos)
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      filterButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });
      button.classList.add("active");

      activeFilter = button.getAttribute("data-filter");
      updateGallery();
    });
  });

  // Load More button click handling
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      showAllItems = true;
      updateGallery();
    });
  }

  // Run once on page load to set initial 6-card grid
  updateGallery();

  // ------------------------------------------------------------------------
  // 3. Lightbox Modal for Clicking Any Gallery Card (Images & Videos)
  // ------------------------------------------------------------------------
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxVideo = document.getElementById("lightboxVideo");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxDesc = document.getElementById("lightboxDesc");
  const lightboxTag = document.getElementById("lightboxTag");
  const lightboxClose = document.getElementById("lightboxClose");

  if (lightbox && galleryCards.length > 0) {
    galleryCards.forEach(function (card) {
      card.addEventListener("click", function () {
        const img = card.querySelector("img");
        const video = card.querySelector("video");
        const title = card.querySelector("h3");
        const desc = card.querySelector("p");
        const tag = card.querySelector(".media-tag");

        // FIXED: Handle <video> cards as well as <img> cards in the lightbox
        if (video && lightboxVideo) {
          if (lightboxImg) {
            lightboxImg.style.display = "none";
            lightboxImg.removeAttribute("src");
          }
          lightboxVideo.style.display = "block";
          lightboxVideo.src = video.currentSrc || video.getAttribute("src");
          lightboxVideo.poster = video.getAttribute("poster") || "";
          lightboxVideo.play().catch(function () {});
        } else if (img && lightboxImg) {
          if (lightboxVideo) {
            lightboxVideo.pause();
            lightboxVideo.style.display = "none";
            lightboxVideo.removeAttribute("src");
            lightboxVideo.load();
          }
          lightboxImg.style.display = "block";
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
        }
        if (title) lightboxTitle.textContent = title.textContent;
        if (desc) lightboxDesc.textContent = desc.textContent;
        if (tag) lightboxTag.textContent = tag.textContent;

        lightbox.classList.add("open");
      });
    });

    function closeLightbox() {
      lightbox.classList.remove("open");
      if (lightboxVideo) {
        lightboxVideo.pause();
        lightboxVideo.currentTime = 0;
        lightboxVideo.style.display = "none";
        lightboxVideo.removeAttribute("src");
        lightboxVideo.load();
      }
    }

    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightbox);
    }

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeLightbox();
      }
    });
  }
});
