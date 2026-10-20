// Paste the published Tableau Public view URL here, for example:
// https://public.tableau.com/views/WorkbookName/DashboardName
const openLink = document.querySelector("#openTableau");

const revealItems = document.querySelectorAll("[data-reveal]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReducedMotion && "IntersectionObserver" in window) {
  document.documentElement.classList.add("motion-ready");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const productionViz = document.querySelector("#viz-production");
const analysisViz = document.querySelector("#viz-analysis");
productionViz?.addEventListener("vizloaderror", () => {
  document.querySelector("#placeholder-production").hidden = false;
});
analysisViz?.addEventListener("vizloaderror", () => {
  document.querySelector("#placeholder-analysis").hidden = false;
});

const dashboardTabs = document.querySelectorAll("[data-dashboard-tab]");
dashboardTabs.forEach((tab) => tab.addEventListener("click", () => {
  const selectedPanelId = tab.dataset.dashboardTab;
  dashboardTabs.forEach((item) => {
    const selected = item === tab;
    item.classList.toggle("active", selected);
    item.setAttribute("aria-selected", String(selected));
  });
  document.querySelectorAll(".dashboard-panel").forEach((panel) => {
    panel.hidden = panel.id !== selectedPanelId;
    panel.classList.toggle("active", !panel.hidden);
  });
  const selectedViz = selectedPanelId === "panel-analysis" ? analysisViz : productionViz;
  if (selectedViz && !selectedViz.getAttribute("src")) {
    selectedViz.setAttribute("src", selectedViz.dataset.src);
  }
  if (openLink && selectedViz) {
    openLink.href = selectedViz.getAttribute("src") || selectedViz.dataset.src;
  }
}));

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
  }));
}

const weatherForm = document.querySelector("#farmWeatherForm");
const areaInput = document.querySelector("#farmArea");
const areaUnit = document.querySelector("#farmAreaUnit");
const weatherStatus = document.querySelector("#weatherStatus");
let activeFarmCoordinates = null;

function updateFarmArea() {
  const area = Number.parseFloat(areaInput?.value || "");
  const output = document.querySelector("#farmAreaDisplay");
  if (!output) return;
  output.textContent = Number.isFinite(area) && area > 0
    ? `${area.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${areaUnit.value}`
    : "Not entered";
}

areaInput?.addEventListener("input", updateFarmArea);
areaUnit?.addEventListener("change", updateFarmArea);

const weatherDescriptions = {
  0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
  45: "Fog", 48: "Rime fog", 51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle",
  56: "Freezing drizzle", 57: "Heavy freezing drizzle", 61: "Light rain", 63: "Rain", 65: "Heavy rain",
  66: "Freezing rain", 67: "Heavy freezing rain", 71: "Light snow", 73: "Snow", 75: "Heavy snow",
  77: "Snow grains", 80: "Rain showers", 81: "Rain showers", 82: "Heavy rain showers",
  85: "Snow showers", 86: "Heavy snow showers", 95: "Thunderstorm", 96: "Thunderstorm with hail", 99: "Heavy thunderstorm with hail"
};

async function loadFarmWeather(latitude, longitude, locationName) {
  const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");
  weatherUrl.search = new URLSearchParams({
    latitude: String(latitude), longitude: String(longitude),
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m",
    temperature_unit: "celsius", wind_speed_unit: "kmh", precipitation_unit: "mm", timezone: "auto"
  });
  const response = await fetch(weatherUrl);
  if (!response.ok) throw new Error("Weather service did not respond. Please try again shortly.");
  const data = await response.json();
  if (!data.current) throw new Error("Current weather is not available for this location.");
  const current = data.current;
  const value = (number, suffix) => Number.isFinite(number) ? `${number}${suffix}` : "—";
  document.querySelector("#weatherCondition").textContent = weatherDescriptions[current.weather_code] || "Current conditions";
  document.querySelector("#weatherTemperature").innerHTML = `${value(current.temperature_2m, "")}<sup>°C</sup>`;
  document.querySelector("#weatherPlace").textContent = locationName;
  document.querySelector("#weatherHumidity").textContent = value(current.relative_humidity_2m, "%");
  document.querySelector("#weatherRain").textContent = value(current.precipitation, " mm");
  document.querySelector("#weatherWind").textContent = value(current.wind_speed_10m, " km/h");
  document.querySelector("#weatherUpdated").textContent = current.time
    ? `Current conditions · local time ${current.time.replace("T", " ")}`
    : "Current conditions from the latest available model update.";
}

weatherForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const locationQuery = document.querySelector("#farmLocation").value.trim();
  if (!locationQuery) return;
  weatherStatus.textContent = "Finding location and loading current weather…";
  weatherForm.querySelector("button[type=submit]").disabled = true;
  try {
    const geocodingUrl = new URL("https://geocoding-api.open-meteo.com/v1/search");
    geocodingUrl.search = new URLSearchParams({ name: locationQuery, count: "1", language: "en", format: "json", countryCode: "IN" });
    const geoResponse = await fetch(geocodingUrl);
    if (!geoResponse.ok) throw new Error("Location search is unavailable. Please try again.");
    const geoData = await geoResponse.json();
    const place = geoData.results?.[0];
    if (!place) throw new Error("We couldn't find that Indian location. Try a nearby town, district or PIN code.");
    const locationName = [place.name, place.admin1, place.country].filter((part, index, parts) => part && parts.indexOf(part) === index).join(", ");
    activeFarmCoordinates = { latitude: place.latitude, longitude: place.longitude, locationName };
    await loadFarmWeather(place.latitude, place.longitude, locationName);
    weatherStatus.textContent = "Weather location updated.";
  } catch (error) {
    weatherStatus.textContent = error.message || "Could not load weather. Check your connection and try again.";
  } finally {
    weatherForm.querySelector("button[type=submit]").disabled = false;
  }
});

if (weatherForm) {
  window.setInterval(() => {
    if (!activeFarmCoordinates || document.hidden) return;
    const { latitude, longitude, locationName } = activeFarmCoordinates;
    loadFarmWeather(latitude, longitude, locationName).catch(() => {
      weatherStatus.textContent = "Weather refresh failed. Check your connection and try again.";
    });
  }, 15 * 60 * 1000);
}

