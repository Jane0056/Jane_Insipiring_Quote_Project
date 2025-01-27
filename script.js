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

// Quote functionality
document.addEventListener("DOMContentLoaded", () => {
  // Function to display the default quote
  function displayDefaultQuoteInfo() {
    let defaultQuote = `"The only limit to our realization of tomorrow is our doubts of today." — Franklin D. Roosevelt. <br />
                                                    A reminder that fear holds us back, but the future belongs to those who believe in the power of possibility.`;

    let outputDiv = document.querySelector("#output");
    new Typewriter(outputDiv, {
      strings: [defaultQuote],
      autoStart: true,
      delay: 50,
    });
  }

  // Function to display generated quote
  function displayQuote(response) {
    let quote = response.data.answer;
    let outputDiv = document.querySelector("#output");

    // Validate if the response includes an author
    if (quote.includes("—")) {
      new Typewriter(outputDiv, {
        strings: [quote],
        autoStart: true,
        cursor: "",
        delay: 50,
        deleteSpeed: 100,
      });
    } else {
      outputDiv.innerHTML = `<div class="error">❌ Failed to retrieve a verified quote. Please try again.</div>`;
    }
  }

  // Function to handle form submission and generate a new quote
  function generateQuote(event) {
    event.preventDefault();

    let apiKey = "boc9a5a07045b413df4e1ab63536ctf0";
    let context = `You are an AI Quote Generator that only provides real, inspiring, motivating, real, orginal,verified quotes with accurate author attribution. Do not generate fabricated quotes. Always include the correct author's name after the quote, separated by "—".`;

    let userInput = document.querySelector("#user-input").value.trim();
    if (!userInput) {
      alert("Please enter a topic to generate a quote.");
      return;
    }

    let prompt = `User instructions: Provide a real, verified, inspiring quote about ${userInput}, including the correct author's name.`;
    let apiUrl = `https://api.shecodes.io/ai/v1/generate?context=${encodeURIComponent(
      context
    )}&prompt=${encodeURIComponent(prompt)}&key=${apiKey}`;

    let submitButton = document.querySelector("#submit-btn");
    submitButton.setAttribute("disabled", "disabled");

    let quoteElement = document.querySelector("#output");
    quoteElement.classList.remove("hidden");
    quoteElement.innerHTML = `<div class="waiting">⏳ Generating inspiring quote about "${userInput}"...</div>`;

    axios
      .get(apiUrl)
      .then(displayQuote)
      .catch(() => {
        quoteElement.innerHTML = `<div class="error">❌ Failed to fetch a quote. Please try again later.</div>`;
      })
      .finally(() => {
        submitButton.removeAttribute("disabled");
      });
  }

  // Attach event listener to the form
  let quoteForm = document.querySelector("#quote-generator");
  quoteForm.addEventListener("submit", generateQuote);

  // Display the default quote on page load
  displayDefaultQuoteInfo();
});
