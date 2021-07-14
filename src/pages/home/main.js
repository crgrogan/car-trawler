import("../../css/styles.scss");
import("./page.scss");
import data from "../../data/cars.json";

const home = (function () {
  const init = () => {
    // if data was not stored locally you would
    // call a method here to fetch the data
    const pickUpReturnInfo = data[0].VehAvailRSCore.VehRentalCore;
    const vendorsArray = data[0].VehAvailRSCore.VehVendorAvails;
    const carsArray = flattenCarsArray(vendorsArray);
    renderData(carsArray, pickUpReturnInfo);
  };

  const flattenCarsArray = (vendors) => {
    const flattenedArray = [];
    vendors.forEach((vendor) =>
      vendor.VehAvails.forEach((vehicle) => {
        flattenedArray.push({ vendor: vendor.Vendor["@Name"], ...vehicle });
      })
    );
    return flattenedArray;
  };

  const renderData = (carsArray, pickUpReturnInfo) => {
    const pickUpLocation = document.getElementById("pick-up-location");
    const pickUpTime = document.getElementById("pick-up-time");
    const returnLocation = document.getElementById("return-location");
    const returnTime = document.getElementById("return-time");
    const carsListLength = document.querySelector(".cars-list-length");
    const carsListElement = document.querySelector(".cars-list");

    carsListLength.textContent = `${carsArray.length} results`;

    carsArray.forEach((car) => {});

    pickUpLocation.textContent = pickUpReturnInfo.PickUpLocation["@Name"];
    pickUpTime.textContent = new Date(
      pickUpReturnInfo["@PickUpDateTime"]
    ).toLocaleString("en-GB");

    returnLocation.textContent = pickUpReturnInfo.ReturnLocation["@Name"];
    returnTime.textContent = new Date(
      pickUpReturnInfo["@ReturnDateTime"]
    ).toLocaleString("en-GB");
  };

  return { init };
})();

document.addEventListener("DOMContentLoaded", () => {
  home.init();
});
