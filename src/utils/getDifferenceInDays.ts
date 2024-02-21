export const getDifferenceInDays = (date: string) => {
  const past = new Date(date).getTime();
  const current = new Date().getTime();
  const differenceInDays = Math.abs(current - past);
  const diffDays = Math.floor(differenceInDays / (1000 * 60 * 60 * 24));
  return diffDays;
};
