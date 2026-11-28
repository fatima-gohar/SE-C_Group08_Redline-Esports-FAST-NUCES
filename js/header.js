// Toggle the 3-bar all-pages dropdown menu and close it on outside click or Escape.
function initHeaderMenu() {
    const menuBtn = document.getElementById("menuBtn");
    const allPagesMenu = document.getElementById("allPagesMenu");

    if (!menuBtn || !allPagesMenu) {
        return;
    }

    // Open or close the dropdown menu when the hamburger button is clicked.
    menuBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        allPagesMenu.classList.toggle("open");
    });

    // Close the dropdown menu when clicking anywhere outside it.
    document.addEventListener("click", function (event) {
        if (!allPagesMenu.contains(event.target) && event.target !== menuBtn) {
            allPagesMenu.classList.remove("open");
        }
    });

    // Close the dropdown menu when pressing the Escape key.
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            allPagesMenu.classList.remove("open");
        }
    });
}

document.addEventListener("DOMContentLoaded", initHeaderMenu);
