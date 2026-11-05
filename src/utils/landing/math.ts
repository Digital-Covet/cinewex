export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

export const calculatePercentage = (current: number, total: number): number => {
  return (current / total) * 100;
};
