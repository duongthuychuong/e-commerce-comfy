export const formatPrice = (price) => {
  const newPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);
  return newPrice;
};

export const getUniqueValues = (data, type) => {
  const unique = data.map((product) => product[type]);
  return ["all", ...new Set(unique)];
};
