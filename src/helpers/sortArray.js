export const sortArrayByPrice = (carsArray, order) => {
  if (order === "asc") {
    return carsArray.sort(
      (a, b) =>
        parseFloat(a.TotalCharge["@RateTotalAmount"]) -
        parseFloat(b.TotalCharge["@RateTotalAmount"])
    );
  } else if (order === "desc") {
    return carsArray.sort(
      (a, b) =>
        parseFloat(b.TotalCharge["@RateTotalAmount"]) -
        parseFloat(a.TotalCharge["@RateTotalAmount"])
    );
  } else {
    return carsArray;
  }
};
