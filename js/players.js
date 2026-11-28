const PLAYERS = [
    { name: "Muhammad Abdullah", university: "NUCES", avatarColor: "#e11d2e" },
    { name: "Sara Ahmed", university: "NUST", avatarColor: "#b91c1c" },
    { name: "Zain Malik", university: "COMSATS", avatarColor: "#991b1b" },
    { name: "Ayesha Khan", university: "LUMS", avatarColor: "#dc2626" },
    { name: "Hamza Tariq", university: "GIKI", avatarColor: "#7f1d1d" },
    { name: "Fatima Noor", university: "UET Lahore", avatarColor: "#be123c" },
    { name: "Bilal Siddiqui", university: "IBA Karachi", avatarColor: "#9f1239" },
    { name: "Usman Farooq", university: "Bahria University", avatarColor: "#c51626" }
];

// Extract up to two uppercase initials from a player's full name.
function getInitials(name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Create the three small social icon links for a player card.
function createSocialLinks() {
    const socialData = [
        {
            label: "Discord",
            path: "M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.029ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z"
        },
        {
            label: "Instagram",
            path: "M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm9.15 1.35a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z"
        },
        {
            label: "LinkedIn",
            path: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"
        }
    ];

    const socialsWrap = document.createElement("div");
    socialsWrap.className = "player-socials";

    socialData.forEach(function (item) {
        const link = document.createElement("a");
        link.href = "#";
        link.className = "player-social-link";
        link.setAttribute("aria-label", item.label);

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "currentColor");
        svg.setAttribute("aria-hidden", "true");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", item.path);

        svg.appendChild(path);
        link.appendChild(svg);
        socialsWrap.appendChild(link);
    });

    return socialsWrap;
}

// Build and return a DOM card element for a single player object.
function createPlayerCard(player) {
    const card = document.createElement("article");
    card.className = "player-card";

    const avatar = document.createElement("div");
    avatar.className = "player-avatar";
    avatar.style.backgroundColor = player.avatarColor;
    avatar.textContent = getInitials(player.name);

    const nameEl = document.createElement("h2");
    nameEl.className = "player-name";
    nameEl.textContent = player.name;

    const universityEl = document.createElement("p");
    universityEl.className = "player-university";
    universityEl.textContent = player.university;

    card.appendChild(avatar);
    card.appendChild(nameEl);
    card.appendChild(universityEl);
    card.appendChild(createSocialLinks());

    return card;
}

// Render the given array of players into the grid or show the empty-state message.
function renderPlayers(playerList) {
    const gridEl = document.getElementById("playersGrid");
    const emptyEl = document.getElementById("noPlayersMessage");

    gridEl.innerHTML = "";

    if (playerList.length === 0) {
        emptyEl.classList.remove("d-none");
        return;
    }

    emptyEl.classList.add("d-none");

    playerList.forEach(function (player) {
        gridEl.appendChild(createPlayerCard(player));
    });
}

// Filter players by name or university (case-insensitive) as the user types.
function filterPlayers() {
    const searchEl = document.getElementById("playerSearch");
    const query = searchEl.value.trim().toLowerCase();

    const filtered = PLAYERS.filter(function (player) {
        return (
            player.name.toLowerCase().includes(query) ||
            player.university.toLowerCase().includes(query)
        );
    });

    renderPlayers(filtered);
}

// Initialize the page by rendering all players and binding the live search listener.
function initPlayersPage() {
    const searchEl = document.getElementById("playerSearch");
    renderPlayers(PLAYERS);

    if (searchEl) {
        searchEl.addEventListener("input", filterPlayers);
    }
}

document.addEventListener("DOMContentLoaded", initPlayersPage);
