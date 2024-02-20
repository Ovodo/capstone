export const formatPrice = (price) => {
  const priceString = price.toString();
  if (priceString.length > 4) {
    return priceString.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  return priceString;
};

// Function to convert price based on country
export const convertPriceByCountry = (price, country) => {
  switch (country) {
    case "Nigeria":
      return formatPrice(price * 1400); // Assuming 1 USD = 1400 NGN
    case "England":
      return formatPrice(price * 0.73); // Assuming 1 USD = 0.73 GBP
    case "Canada":
      return formatPrice(price * 1.28); // Assuming 1 USD = 1.28 CAD
    case "Japan":
      return formatPrice(price * 110.63); // Assuming 1 USD = 110.63 JPY
    case "SouthAfrica":
      return formatPrice(price * 14.79); // Assuming 1 USD = 14.79 ZAR
    case "Ghana":
      return formatPrice(price * 6.1); // Assuming 1 USD = 6.10 GHS
    default:
      return formatPrice(price); // Default to USD
  }
};

export const convertTotalPriceByCountry = (totalPrice, country) => {
  switch (country) {
    case "Nigeria":
      return formatPrice(totalPrice * 1400); // Assuming 1 USD = 1400 NGN
    case "England":
      return formatPrice(totalPrice * 0.73); // Assuming 1 USD = 0.73 GBP
    case "Canada":
      return formatPrice(totalPrice * 1.28); // Assuming 1 USD = 1.28 CAD
    case "Japan":
      return formatPrice(totalPrice * 110.63); // Assuming 1 USD = 110.63 JPY
    case "SouthAfrica":
      return formatPrice(totalPrice * 14.79); // Assuming 1 USD = 14.79 ZAR
    case "Ghana":
      return formatPrice(totalPrice * 6.1); // Assuming 1 USD = 6.10 GHS
    default:
      return formatPrice(totalPrice); // Default to USD
  }
};
