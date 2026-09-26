const searchDatabase = [
  {
    title: "age calculator",
    description: "calculate your exact age from your date of birth.",
    keywords: ["age", "old", "how old am i", "date of birth", "birthday", "dob"],
    url: "age-calculator.html"
  },

  {
    title: "percentage calculator",
    description: "calculate percentages quickly and easily.",
    keywords: ["percentage", "percent", "%", "calculate percentage", "discount percent"],
    url: "percentage-calculator.html"
  },

  {
    title: "bmi calculator",
    description: "calculate body mass index using height and weight.",
    keywords: ["bmi", "body mass", "weight", "height", "body index"],
    url: "bmi-calculator.html"
  },

  {
    title: "unit converter",
    description: "convert common units such as length, weight and temperature.",
    keywords: ["unit", "convert", "converter", "kg", "kilogram", "meter", "mile", "km", "temperature", "celsius", "fahrenheit"],
    url: "unit-converter.html"
  },

  {
    title: "date calculator",
    description: "calculate dates and find the difference between dates.",
    keywords: ["date", "dates", "days", "date difference", "between dates", "days between"],
    url: "date-calculator.html"
  },

  {
    title: "time calculator",
    description: "calculate time differences and durations.",
    keywords: ["time", "hours", "minutes", "duration", "time difference"],
    url: "time-calculator.html"
  },

  {
    title: "discount calculator",
    description: "calculate discounts, savings and final prices.",
    keywords: ["discount", "sale", "price", "saving", "original price", "final price"],
    url: "discount-calculator.html"
  },

  {
    title: "1-minute calm",
    description: "take a short break with a simple calming exercise.",
    keywords: ["calm", "relax", "relaxation", "stress", "one minute", "1 minute", "calming"],
    url: "#meditation"
  },

  {
    title: "5-minute meditation",
    description: "a simple five-minute meditation session.",
    keywords: ["meditation", "five minutes", "5 minutes", "relax", "mindfulness", "calm"],
    url: "#meditation"
  },

  {
    title: "breathing exercise",
    description: "follow a simple breathing pattern for relaxation.",
    keywords: ["breathing", "breath", "breathing exercise", "anxiety", "calm", "relax", "relaxation"],
    url: "#meditation"
  },

  {
    title: "meditation timer",
    description: "set a timer for your meditation and quiet time.",
    keywords: ["meditation timer", "timer", "meditation", "quiet time", "relax"],
    url: "#meditation"
  },

  {
    title: "sleep relaxation",
    description: "simple relaxation ideas for a calmer bedtime.",
    keywords: ["sleep", "sleep better", "before sleep", "bedtime", "relax before sleep", "night", "relaxation"],
    url: "#meditation"
  },

  {
    title: "kids & learning",
    description: "learning activities, resources and educational content for children.",
    keywords: ["kids", "children", "child", "learning", "numbers", "math", "school", "activities"],
    url: "#kids"
  },

  {
    title: "health & fitness",
    description: "general wellness, fitness information and healthy living resources.",
    keywords: ["health", "fitness", "exercise", "healthy", "wellness", "workout"],
    url: "#health"
  },

  {
    title: "technology",
    description: "technology guides, useful information and digital resources.",
    keywords: ["technology", "tech", "computer", "phone", "internet", "software", "digital"],
    url: "#technology"
  },

  {
    title: "education",
    description: "educational resources and useful learning materials.",
    keywords: ["education", "study", "learning", "school", "student", "course", "lesson"],
    url: "#education"
  }
];


/* =========================
   smart search
========================= */

function smartSearch() {

  const input = document.getElementById("searchInput");
  const resultsBox = document.getElementById("searchResults");

  if (!input || !resultsBox) return;

  const query = input.value.trim().toLowerCase();

  resultsBox.innerHTML = "";

  if (query.length === 0) return;

  const words = query
    .replace(/[?!.,]/g, "")
    .split(/\s+/)
    .filter(Boolean);

  const results = searchDatabase
    .map(item => {

      let score = 0;

      const title = item.title.toLowerCase();
      const description = item.description.toLowerCase();
      const keywords = item.keywords.map(keyword =>
        keyword.toLowerCase()
      );

      if (title === query) score += 100;
      if (title.includes(query)) score += 50;
      if (description.includes(query)) score += 20;

      keywords.forEach(keyword => {

        if (keyword === query) score += 60;
        if (keyword.includes(query)) score += 35;

        words.forEach(word => {

          if (word.length < 2) return;

          if (keyword.includes(word)) score += 12;
          if (title.includes(word)) score += 10;
          if (description.includes(word)) score += 5;

        });

      });

      return {
        ...item,
        score
      };

    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);


  if (results.length === 0) {

    resultsBox.innerHTML = `
      <div class="search-result">
        <h3>no results found</h3>
        <p>try another search such as age calculator, meditation, sleep, kids or weather.</p>
      </div>
    `;

    return;
  }


  results.forEach(item => {

    const result = document.createElement("a");

    result.href = item.url;
    result.className = "search-result";

    result.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    `;

    resultsBox.appendChild(result);

  });

}


/* =========================
   mobile menu
========================= */

function toggleMenu() {

  const menu = document.getElementById("mobileMenu");

  if (!menu) return;

  menu.classList.toggle("active");

}


/* =========================
   close mobile menu
========================= */

document.addEventListener("DOMContentLoaded", function () {

  const menuLinks = document.querySelectorAll("#mobileMenu a");

  menuLinks.forEach(link => {

    link.addEventListener("click", function () {

      const menu = document.getElementById("mobileMenu");

      if (menu) {
        menu.classList.remove("active");
      }

    });

  });

});


/* =========================
   search focus
========================= */

function focusSearch() {

  const searchInput = document.getElementById("searchInput");

  if (!searchInput) return;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  setTimeout(function () {
    searchInput.focus();
  }, 500);

}


/* =========================
   weather placeholder
========================= */

function searchWeather() {

  const cityInput = document.getElementById("cityInput");
  const weatherResult = document.getElementById("weatherResult");

  if (!cityInput || !weatherResult) return;

  const city = cityInput.value.trim();

  if (city === "") {

    weatherResult.innerHTML = `
      <p>please enter a city name.</p>
    `;

    return;
  }

  weatherResult.innerHTML = `
    <p>weather information for <strong>${city}</strong> will appear here.</p>
    <p>weather api will be connected in the next step.</p>
  `;

}