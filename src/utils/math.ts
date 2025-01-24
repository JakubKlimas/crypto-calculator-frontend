export const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const fixSum = (value: string) =>
  Number(value.replace("$", "")).toFixed(2).toString() + "$";
