const STORAGE_KEY = "theme";
const THEME_ATTR  = "data-theme";
const QUERY_KEY   = "(prefers-color-scheme: dark)";

const themes = {
  LIGHT: "light",
  DARK: "dark",
};

initTheme();

function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const isDarkMode = window.matchMedia && window.matchMedia(QUERY_KEY).matches;

  // Set theme based on saved preference or system setting
  setTheme(savedTheme || (isDarkMode ? themes.DARK : themes.LIGHT));

  // Watch for system theme changes
  window.matchMedia(QUERY_KEY).addEventListener("change", (e) => {
    const newTheme = e.matches ? themes.DARK : themes.LIGHT;
    setTheme(newTheme);
  });
}

function toggleTheme() {
  const theme = getTheme();
  const newTheme = theme === themes.DARK ? themes.LIGHT : themes.DARK;
  setTheme(newTheme);
  localStorage.setItem(STORAGE_KEY, newTheme);
}

function getTheme() {
  return document.documentElement.getAttribute(THEME_ATTR);
}

function setTheme(value) {
  document.documentElement.setAttribute(THEME_ATTR, value);

  // Change icon based on theme
  const themeIcon = document.getElementById("theme-icon");
  if (themeIcon) {
    themeIcon.className = value === themes.DARK ? "fas fa-sun" : "fas fa-moon";
  }
}
