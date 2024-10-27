// for money comma
export const formatMoney = (amount) => {
  return Number(amount).toLocaleString("en-US");
};

export const formatMoneyForLTPInCompany = (amount) => {
  const output = Number(amount).toLocaleString("en-US");
  if (isNaN(amount)) return null;
  return output;
};

// convert arab
export const arabConvert = (value) => {
  const cor = value / 1000000;
  return cor.toFixed(2) + " arab";
};

// convert crore
export const croreConvert = (value) => {
  const cor = value / 10000000;
  return cor.toFixed(2) + " crore";
};

export const lakhConvert = (value) => {
  const cor = value / 100000;
  return cor.toFixed(2) + " lakh";
};

export const formatValue = (value) => {
  let formattedValue = value;
  if (formattedValue >= 100000000000) {
    formattedValue =
      (formattedValue / 100000000000)?.toFixed(2)?.toLocaleString("en-AE") +
      " Kharab";
  } else if (formattedValue >= 1000000000) {
    formattedValue =
      (formattedValue / 1000000000)?.toFixed(2)?.toLocaleString("en-AE") +
      " Arba";
  } else if (formattedValue >= 10000000) {
    formattedValue =
      (formattedValue / 10000000)?.toFixed(2)?.toLocaleString("en-AE") +
      " Crore";
  } else if (formattedValue >= 100000) {
    formattedValue =
      (formattedValue / 100000)?.toFixed(2)?.toLocaleString("en-AE") + " Lakh";
  } else {
    formattedValue = formatMoney(formattedValue);
  }
  return formattedValue;
};

// // convert crore
// export const croreConvert = (value) => {
//   const cor = value / 100000000;
//   return cor.toFixed(2) + " crore";
// };
