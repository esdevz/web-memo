export function themeColorPalette(colors: string[]) {
  return colors.reduce((palette: Record<number, string>, color, i) => {
    palette[(i + 1) * 100] = color;
    return palette;
  }, {});
}
