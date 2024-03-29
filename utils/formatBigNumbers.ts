export function formatBigNumber(num: number) {
  if (num >= 1000) {
    const thousands = num / 1000;
    if (thousands >= 10) {
      return Math.floor(thousands) + 'K';
    } else {
      return thousands.toFixed(1) + 'K';
    }
  }
  return num;
}
