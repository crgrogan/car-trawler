import("../../css/styles.scss");
import("./page.scss");
import data from "../../data/cars.json";
import "../../components/card/main";

const home = (function () {
  const init = () => {
    // if data was not stored locally you could
    // call a method here to fetch the data
    const pickUpReturnInfo = data[0].VehAvailRSCore.VehRentalCore;
    const vendorsArray = data[0].VehAvailRSCore.VehVendorAvails;
    const carsArray = flattenCarsArray(vendorsArray);
    renderData(carsArray, pickUpReturnInfo);
  };

  const flattenCarsArray = (vendors) => {
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

  const renderData = (carsArray, pickUpReturnInfo) => {
    const pickUpLocation = document.getElementById("pick-up-location");
    const pickUpTime = document.getElementById("pick-up-time");
    const returnLocation = document.getElementById("return-location");
    const returnTime = document.getElementById("return-time");
    const carsListLength = document.querySelector(".cars-list-length");
    const carsListElement = document.querySelector(".cars-list");

    carsListLength.textContent = `${carsArray.length} results`;

    carsArray.forEach((car) => {
      const cardElement = document.createElement("custom-card");
      cardElement.carData = car;
      carsListElement.appendChild(cardElement);
    });

    pickUpLocation.textContent = pickUpReturnInfo.PickUpLocation["@Name"];
    pickUpTime.textContent = new Date(
      pickUpReturnInfo["@PickUpDateTime"]
    ).toLocaleString("en-US", { hour12: false });

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
