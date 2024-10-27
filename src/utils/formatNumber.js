export const formatNumberwithComma = (number) => {
  // Convert the number to a string
  const numberString = number.toString();

  // Split the number into integer and decimal parts
  const [integerPart, decimalPart] = numberString.split(".");

  // Format the integer part
  let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // If the first group has only one digit, add a leading zero
  if (formattedInteger.indexOf(",") === -1) {
    formattedInteger = "0" + formattedInteger;
  }

  // Combine the formatted integer part with the decimal part
  if (formattedInteger && decimalPart) {
    const formattedNumber = `${formattedInteger}.${decimalPart}`;
    return formattedNumber;
  } else {
    return formattedInteger ? formattedInteger : 0;
  }
};
