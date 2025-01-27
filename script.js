// toggle functionality
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-btn");
  const navLinks = document.getElementById("nav-links");

  // Toggle navigation menu on button click
  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show"); // Show/Hide menu
    if (navLinks.classList.contains("show")) {
      toggleBtn.innerHTML = "✕"; // Change to close icon
    } else {
      toggleBtn.innerHTML = "☰"; // Change to menu icon
    }
  });

  // Close navigation menu when clicking outside of it
  document.addEventListener("click", (event) => {
    if (!navLinks.contains(event.target) && event.target !== toggleBtn) {
      navLinks.classList.remove("show");
      toggleBtn.innerHTML = "☰"; // Reset to menu icon
    }
  });
});
