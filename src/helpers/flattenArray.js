export const flattenCarsArray = (vendors) => {
  const flattenedArray = [];
  // loop through list of available vehicles for each vendor and
  // add them to new array along with relevant vendor as a single object
  vendors.forEach((vendor) =>
    vendor.VehAvails.forEach((vehicle) => {
      flattenedArray.push({ vendor: vendor.Vendor["@Name"], ...vehicle });
    })
  );
  return flattenedArray;
};
