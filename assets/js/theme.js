const STORAGE_KEY = "theme";
const THEME_ATTR = "data-theme";
const QUERY_KEY = "(prefers-color-scheme: dark)";
const themes = { LIGHT: "light", DARK: "dark" };

initTheme();

function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const systemTheme = window.matchMedia && window.matchMedia(QUERY_KEY).matches ? themes.DARK : themes.LIGHT;
  setTheme(savedTheme || systemTheme);

  window.matchMedia(QUERY_KEY).addEventListener("change", (e) => {
    const newTheme = e.matches ? themes.DARK : themes.LIGHT;
    setTheme(newTheme);
  });
}

function toggleTheme() {
  const newTheme = getTheme() === themes.DARK ? themes.LIGHT : themes.DARK;
  setTheme(newTheme);
  localStorage.setItem(STORAGE_KEY, newTheme);
}

function getTheme() {
  return document.documentElement.getAttribute(THEME_ATTR);
}

function setTheme(value) {
  document.documentElement.setAttribute(THEME_ATTR, value);
  const themeIcon = document.getElementById("theme-icon");
  themeIcon.classList.toggle("fa-sun", value === themes.DARK);
  themeIcon.classList.toggle("fa-moon", value === themes.LIGHT);
}
