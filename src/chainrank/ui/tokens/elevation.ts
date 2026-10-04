/**
 * ChainRank-AML Design Tokens — Elevation & Z-Index
 */

export const elevation = {
  zIndex: {
    base: 0,
    surface: 1,
    header: 20,
    sidebar: 30,
    popover: 40,
    drawer: 50,
    modalBackdrop: 60,
    modal: 70,
    commandPalette: 80,
    toast: 90,
    tooltip: 100,
  },
} as const;

export type ElevationTokens = typeof elevation;
