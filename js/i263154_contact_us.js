/* ==========================================================================
   REDLINE ESPORTS | FAST NUCES - Contact Us JavaScript
   Simple, readable vanilla JS for:
   1. 3-Bar All-Pages Menu Toggle (Top-Right Corner)
   2. Contact Form Validation & Email Delivery via FormSubmit
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
  // 2. Contact Us Form Validation & Email Submission (FormSubmit)
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById("contactForm");
  const formNotice = document.getElementById("formNotice");
  const formEndpoint = "https://formsubmit.co/ajax/sudaisk721@gmail.com";

  if (contactForm && formNotice) {
    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const nameInput = document.getElementById("contactName");
      const emailInput = document.getElementById("contactEmail");
      const subjectInput = document.getElementById("contactSubject");
      const messageInput = document.getElementById("contactMessage");
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const subject = subjectInput ? subjectInput.value.trim() : "";
      const message = messageInput ? messageInput.value.trim() : "";

      if (name === "" || email === "" || message === "") {
        formNotice.textContent = "Please fill in your name, email, and message before sending.";
        formNotice.className = "notice show error";
        return;
      }

      if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        formNotice.textContent = "Please enter a valid email address.";
        formNotice.className = "notice show error";
        return;
      }

      // Show sending state on button
      const originalBtnText = submitBtn ? submitBtn.innerHTML : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      try {
        const response = await fetch(formEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            name: name,
            email: email,
            subject: subject || "General Inquiry",
            message: message,
            _subject: "Redline Esports Contact: " + (subject || "New Message"),
            _template: "table"
          })
        });

        const result = await response.json();

        if (response.ok && (result.success === "true" || result.success === true)) {
          formNotice.textContent =
            "Message sent! Thanks, " + name + " — our Redline Esports team will get back to you soon.";
          formNotice.className = "notice show";
          contactForm.reset();
        } else {
          formNotice.textContent =
            result.message || "Could not send message right now. Please try again shortly.";
          formNotice.className = "notice show error";
        }
      } catch (error) {
        formNotice.textContent =
          "Could not reach the mail service. Please open this page from a live server (such as GitHub Pages or localhost) and try again.";
        formNotice.className = "notice show error";
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    });
  }
});
