export const convertToUnixtime = (time) => {
  const currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() - Number(time));
  return currentDate.getTime() / 1000;
};
