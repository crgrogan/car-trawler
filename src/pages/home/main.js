import("../../css/styles.scss");
import("./page.scss");
import data from "../../data/cars.json";
import "../../components/card/main";
import { flattenCarsArray } from "../../helpers/flattenArray";
import { sortArrayByPrice } from "../../helpers/sortArray";

const home = (function () {
  let carsArray = [];

  const init = () => {
    // if data was not stored locally you could
    // call a method here to fetch the data
    const selectElement = document.querySelector("select[name=order]");
    const defaultOrder = "asc";
    const pickUpReturnInfo = data[0].VehAvailRSCore.VehRentalCore;
    const vendorsArray = data[0].VehAvailRSCore.VehVendorAvails;

    addSelectChangeEventListener(selectElement);
    carsArray = flattenCarsArray(vendorsArray);
    const sortedArray = sortArrayByPrice(carsArray, defaultOrder);
    renderData(sortedArray, pickUpReturnInfo);
  };

  const addSelectChangeEventListener = (element) => {
    element.addEventListener("change", function () {
      // get value of selected option in Sort By dropdown
      const sortOrder = this.options[this.selectedIndex].value;
      const sortedArray = sortArrayByPrice(carsArray, sortOrder);
      renderData(sortedArray);
    });
  };

  const renderData = (carsArray, pickUpReturnInfo) => {
    const pickUpLocation = document.getElementById("pick-up-location");
    const pickUpTime = document.getElementById("pick-up-time");
    const returnLocation = document.getElementById("return-location");
    const returnTime = document.getElementById("return-time");
    const carsListLengthElement = document.querySelector(".cars-list-length");
    const carsListElement = document.querySelector(".cars-list");

    if (carsArray) {
      carsListLengthElement.textContent = `${carsArray.length} results`;
      carsListElement.innerHTML = "";

      carsArray.forEach((car) => {
        const cardElement = document.createElement("custom-card");
        cardElement.carData = car;
        carsListElement.appendChild(cardElement);
      });
    }

    if (pickUpReturnInfo) {
      pickUpLocation.textContent = pickUpReturnInfo.PickUpLocation["@Name"];
      pickUpTime.textContent = new Date(
        pickUpReturnInfo["@PickUpDateTime"]
      ).toLocaleString("en-GB");

      returnLocation.textContent = pickUpReturnInfo.ReturnLocation["@Name"];
      returnTime.textContent = new Date(
        pickUpReturnInfo["@ReturnDateTime"]
      ).toLocaleString("en-GB");
    }
  };

  return { init };
})();

document.addEventListener("DOMContentLoaded", () => {
  home.init();
});
