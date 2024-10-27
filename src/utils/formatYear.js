export const formatYear = (year) => {
  const formattedYear = `${year - 1}/${year % 100}`
  return formattedYear;
};