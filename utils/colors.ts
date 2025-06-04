/**
 * Color utility for consistent color management across the application
 * This replaces CSS variables with a more reliable approach
 */

// Primary colors
export const PRIMARY_COLORS = {
  50: "#f0f9ff",
  100: "#e0f2fe",
  200: "#bae6fd",
  300: "#7dd3fc",
  400: "#38bdf8",
  500: "#0ea5e9",
  600: "#0284c7",
  700: "#0369a1",
  800: "#075985",
  900: "#0c4a6e",
  950: "#08365f",
};

// Secondary colors
export const SECONDARY_COLORS = {
  50: "#f8fafc",
  100: "#f1f5f9",
  200: "#e2e8f0",
  300: "#cbd5e1",
  400: "#94a3b8",
  500: "#64748b",
  600: "#475569",
  700: "#334155",
  800: "#1e293b",
  900: "#0f172a",
};

// RGB values for animations
export const PRIMARY_COLORS_RGB = {
  300: "125, 211, 252",
  400: "56, 189, 248",
  500: "14, 165, 233",
  600: "2, 132, 199",
  700: "3, 105, 161",
  800: "7, 89, 133",
};

export const SECONDARY_COLORS_RGB = {
  300: "203, 213, 225",
  400: "148, 163, 184",
  500: "100, 116, 139",
  600: "71, 85, 105",
  700: "51, 65, 85",
  800: "30, 41, 59",
  900: "15, 23, 42",
};

/**
 * Get RGBA color string
 * @param colorSet - The color set to use (PRIMARY_COLORS_RGB or SECONDARY_COLORS_RGB)
 * @param shade - The color shade (e.g., 400, 500)
 * @param opacity - The opacity value (0-1)
 * @returns RGBA color string
 */
export const getRgbaColor = (
  colorSet: Record<string, string>,
  shade: string | number,
  opacity: number
): string => {
  const rgb = colorSet[shade] || colorSet["500"]; // Default to 500 if shade not found
  return `rgba(${rgb}, ${opacity})`;
};

/**
 * Get theme-aware color based on dark mode
 * @param isDarkMode - Whether dark mode is active
 * @param lightShade - The shade to use in light mode
 * @param darkShade - The shade to use in dark mode
 * @param opacity - The opacity value
 * @returns RGBA color string
 */
export const getThemeAwareColor = (
  isDarkMode: boolean,
  lightShade: string | number = 600,
  darkShade: string | number = 400,
  opacity: number = 1
): string => {
  return isDarkMode
    ? getRgbaColor(PRIMARY_COLORS_RGB, darkShade, opacity)
    : getRgbaColor(PRIMARY_COLORS_RGB, lightShade, opacity);
};
