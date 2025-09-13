export const formatNumber = (num) => {
  if (typeof num !== "number") return num;
  // Handle negative numbers by formatting their absolute value and adding “–” in front
  if (num < 0) {
    return "-" + formatNumber(-num);
  }
  if (num >= 1_000_000) {
    const value = num / 1_000_000;
    return num % 1_000_000 === 0 ? `${value}M` : `${value.toFixed(2)}M`;
  }
  if (num >= 1_000) {
    const value = num / 1_000;
    return num % 1_000 === 0 ? `${value}K` : `${value.toFixed(2)}K`;
  }
  return num % 1 === 0 ? num.toString() : num.toFixed(2);
};
