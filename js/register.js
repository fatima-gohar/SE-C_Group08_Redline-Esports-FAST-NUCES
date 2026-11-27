const STORAGE_KEY = "redline_registered_teams";

// Load all previously registered teams from localStorage.
function getRegisteredTeams() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        return [];
    }
}

// Save a new team entry into localStorage.
function saveRegisteredTeam(team) {
    const teams = getRegisteredTeams();
    teams.push(team);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
}

// Check whether a team name already exists (case-insensitive).
function isDuplicateTeamName(teamName) {
    const normalized = teamName.trim().toLowerCase();
    const teams = getRegisteredTeams();
    return teams.some(function (team) {
        return team.teamName && team.teamName.trim().toLowerCase() === normalized;
    });
}

// Validate that an email string matches a standard email format.
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Display an error message under a specific form field.
function showFieldError(inputEl, errorEl, message) {
    inputEl.classList.add("is-invalid");
    errorEl.textContent = message;
    errorEl.classList.add("is-visible");
}

// Clear the error message and invalid state from a specific form field.
function clearFieldError(inputEl, errorEl) {
    inputEl.classList.remove("is-invalid");
    errorEl.textContent = "";
    errorEl.classList.remove("is-visible");
}

// Display a message inside the form-level error box below the form.
function showFormErrorBox(boxEl, message) {
    boxEl.textContent = message;
    boxEl.classList.remove("d-none");
}

// Hide and clear the form-level error box below the form.
function clearFormErrorBox(boxEl) {
    boxEl.textContent = "";
    boxEl.classList.add("d-none");
}

// Replace the form with the registration success state.
function showSuccessState(formEl, errorBoxEl, successEl, successMsgEl, teamName, game) {
    formEl.classList.add("d-none");
    clearFormErrorBox(errorBoxEl);
    successMsgEl.textContent = "Welcome " + teamName + "! Your team is registered for " + game;
    successEl.classList.remove("d-none");
}

// Validate form inputs, check duplicates, save to localStorage, and show success on submit.
function handleRegisterSubmit(event) {
    event.preventDefault();

    const formEl = document.getElementById("registerForm");
    const errorBoxEl = document.getElementById("formErrorBox");
    const successEl = document.getElementById("registerSuccess");
    const successMsgEl = document.getElementById("successMessage");

    const fields = [
        {
            input: document.getElementById("teamName"),
            error: document.getElementById("teamNameError"),
            emptyMessage: "Please enter a team name."
        },
        {
            input: document.getElementById("university"),
            error: document.getElementById("universityError"),
            emptyMessage: "Please enter your university."
        },
        {
            input: document.getElementById("captainName"),
            error: document.getElementById("captainNameError"),
            emptyMessage: "Please enter the captain's name."
        },
        {
            input: document.getElementById("email"),
            error: document.getElementById("emailError"),
            emptyMessage: "Please enter an email address."
        },
        {
            input: document.getElementById("game"),
            error: document.getElementById("gameError"),
            emptyMessage: "Please select a game."
        }
    ];

    let hasErrors = false;
    clearFormErrorBox(errorBoxEl);

    fields.forEach(function (field) {
        clearFieldError(field.input, field.error);
        if (!field.input.value.trim()) {
            showFieldError(field.input, field.error, field.emptyMessage);
            hasErrors = true;
        }
    });

    const emailInput = fields[3].input;
    const emailError = fields[3].error;
    const emailValue = emailInput.value.trim();

    if (emailValue && !isValidEmail(emailValue)) {
        const invalidEmailMsg = "ERROR: Please enter a valid email id.";
        emailInput.classList.add("is-invalid");
        showFormErrorBox(errorBoxEl, invalidEmailMsg);
        hasErrors = true;
    }

    const teamInput = fields[0].input;
    const teamError = fields[0].error;
    const teamNameValue = teamInput.value.trim();

    if (teamNameValue && isDuplicateTeamName(teamNameValue)) {
        const duplicateMsg = "A team with this name is already registered.";
        showFieldError(teamInput, teamError, duplicateMsg);
        if (errorBoxEl.classList.contains("d-none")) {
            showFormErrorBox(errorBoxEl, duplicateMsg);
        }
        hasErrors = true;
    }

    if (hasErrors) {
        return;
    }

    const newTeam = {
        teamName: teamNameValue,
        university: fields[1].input.value.trim(),
        captainName: fields[2].input.value.trim(),
        email: emailValue,
        game: fields[4].input.value.trim()
    };

    saveRegisteredTeam(newTeam);
    showSuccessState(formEl, errorBoxEl, successEl, successMsgEl, newTeam.teamName, newTeam.game);
}

// Attach the submit event listener once the DOM is ready.
function initRegisterPage() {
    const formEl = document.getElementById("registerForm");
    if (formEl) {
        formEl.addEventListener("submit", handleRegisterSubmit);
    }
}

document.addEventListener("DOMContentLoaded", initRegisterPage);
