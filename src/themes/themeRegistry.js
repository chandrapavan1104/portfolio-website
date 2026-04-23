import BuilderMelaApp from "./builders-mela/BuilderMelaApp";

export const portfolioThemes = [
  {
    id: "builders-mela",
    name: "Build Grounds",
    description: "A warm, map-like interface for projects, skills, and AI work.",
    component: BuilderMelaApp,
  },
];

export const defaultThemeId = "builders-mela";

export function getPortfolioTheme(themeId = defaultThemeId) {
  return (
    portfolioThemes.find((theme) => theme.id === themeId) || portfolioThemes[0]
  );
}
