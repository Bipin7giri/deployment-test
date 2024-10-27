export const getAltmanDescription = (rating) => {
  const newRating = Number(rating);
  if (newRating < 1.81) {
    return "The company is in the red zone and has high probability of bankruptcy.";
  } else if (rating > 1.81 && rating < 2.99) {
    return "The company is in the gray zone and has a moderate probability of bankruptcy.";
  } else if (rating >= 2.99) {
    return "The company is in the safe zone and has less probability of filing for bankruptcy.";
  } else {
    return "NAN";
  }
};
export const getSaralRatingSummary = (rating, percent) => {
  if (percent < 34) {
    return `As per our automated checklist, the stock passed ${rating} checks, indicating poor fundamentals`;
  } else if (percent >= 34 && percent < 66) {
    return `As per our automated checklist, the stock passed ${rating} checks, indicating average fundamentals`;
  } else if (percent >= 66) {
    return `As per our automated checklist, the stock passed ${rating} checks, indicating strong fundamentals`;
  } else {
    return "";
  }
};
export const getSaralRatingDescription = () => {
  return "This rating system is carried out by focusing on several key ratios that reflects the companies health from multiple areas of a company compared historically and among industry peers.";
};

export const getCamelRatingDescription = () => {
  return "CAMEL rating is a popular financial analytical tool used to identify good banks by factoring in capital adequacy, Asset quality, Management Quality, Earnings Quality, and Liquidity.";
};

export const getPiotroskiRatingDescription = () => {
  return "Piotroski framework is a widely known model that enables investors to identify quality companies. Companies are rated from 1 to 9; 9 being the highest and 1 being the lowest.";
};

export const getTechnicalMeterDescription = () => {
  return "Signals as per key indicators as of today (green - bullish/buy, blue - neutral/hold, red - bearish/sell). Time horizon - 2 weeks.";
};
