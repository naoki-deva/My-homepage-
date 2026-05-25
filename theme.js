(() => {
  const storageKey = "tnosl-theme";
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  const getPreferredTheme = () => {
    const saved = localStorage.getItem(storageKey);
    if (saved === "light" || saved === "dark") return saved;
    return media.matches ? "dark" : "light";
  };

  const updateToggleLabel = (theme) => {
    const toggle = document.querySelector("[data-theme-toggle]");
    if (!toggle) return;
    const next = theme === "dark" ? "light" : "dark";
    toggle.textContent = next === "dark" ? "🌙 ダーク" : "☀️ ライト";
    toggle.setAttribute("aria-label", `テーマ切替（現在: ${theme === "dark" ? "ダーク" : "ライト"}）`);
  };

  const applyTheme = (theme, save = true) => {
    root.setAttribute("data-theme", theme);
    if (save) localStorage.setItem(storageKey, theme);
    updateToggleLabel(theme);
  };

  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(getPreferredTheme(), false);

    const toggle = document.querySelector("[data-theme-toggle]");
    if (toggle) {
      toggle.addEventListener("click", () => {
        const current = root.getAttribute("data-theme") || "light";
        applyTheme(current === "dark" ? "light" : "dark");
      });
    }
  });

  media.addEventListener("change", (event) => {
    const saved = localStorage.getItem(storageKey);
    if (saved === "light" || saved === "dark") return;
    applyTheme(event.matches ? "dark" : "light", false);
  });
})();
