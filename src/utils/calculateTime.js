import moment from "moment";
export const calculateTime = (time) => {
  const specificMoment = moment(time);
  const hoursAgo = specificMoment.fromNow(true); // Passing 'true' displays the value without the suffix
  return hoursAgo;
};
