import("../../css/styles.scss");
import("./page.scss");
import data from "../../data/cars.json";
import "../../components/card/main";

const details = (function () {
  const init = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const vendorCode = urlParams.get("vendor");
    const vehicleCode = urlParams.get("vehicle");
    const vendorsArray = data[0].VehAvailRSCore.VehVendorAvails;
    const selectedVendor = getSelectedVendor(vendorsArray, vendorCode);
    const selectedVehicle = getSelectedVehicle(selectedVendor, vehicleCode);
    renderData(selectedVendor.Vendor, selectedVehicle);
  };

  const getSelectedVendor = (vendors, code) => {
    return vendors.filter((vendor) => vendor.Vendor["@Name"] === code)[0];
  };

  const getSelectedVehicle = (vendor, code) => {
    return vendor.VehAvails.filter(
      (vehicle) => vehicle.Vehicle["@Code"] === code
    )[0];
  };

  const renderData = (vendor, vehicle) => {
    const carDetailsImage = document.querySelector(".car-details-image");
    const model = document.querySelector(".car-details-model");
    const vehicleVendorName = document.querySelector(
      ".car-details-vendor-name"
    );
    const vehicleVendorCode = document.querySelector(
      ".car-details-vendor-code"
    );
    const airCon = document.querySelector(".car-details-air-con");
    const transmission = document.querySelector(".car-details-transmission");
    const fuelType = document.querySelector(".car-details-fuel");
    const passengerQty = document.querySelector(".car-details-passenger-qty");
    const baggageQty = document.querySelector(".car-details-baggage-qty");
    const doorCount = document.querySelector(".car-details-door-count");
    const price = document.querySelector(".car-details-price");
    const vehicleCode = document.querySelector(".car-details-code");
    const vehicleAvailability = document.querySelector(
      ".car-details-availability"
    );

    carDetailsImage.src = vehicle.Vehicle.PictureURL;
    model.textContent = vehicle.Vehicle.VehMakeModel["@Name"];
    vehicleVendorName.innerHTML = `<span class="bold">Name:</span>${vendor["@Name"]}`;
    vehicleVendorCode.innerHTML = `<span class="bold">Code:</span>${vendor["@Code"]}`;
    airCon.textContent = vehicle.Vehicle["@AirConditionInd"] ? "Air Con" : "";
    fuelType.textContent = vehicle.Vehicle["@FuelType"];
    transmission.textContent = vehicle.Vehicle["@TransmissionType"];
    passengerQty.textContent = `${vehicle.Vehicle["@PassengerQuantity"]} People`;
    baggageQty.textContent = `${vehicle.Vehicle["@BaggageQuantity"]} Bags`;
    doorCount.textContent = `${vehicle.Vehicle["@DoorCount"]} Doors`;
    price.innerHTML = `${vehicle.TotalCharge["@CurrencyCode"]} $${vehicle.TotalCharge["@RateTotalAmount"]} `;
    vehicleCode.innerHTML = `<span class="bold">Vehicle Code:</span>${vehicle.Vehicle["@Code"]}`;
    vehicleAvailability.innerHTML = `${vehicle["@Status"]}<div class="available-icon"></div>`;
  };

  return { init };
})();

document.addEventListener("DOMContentLoaded", () => {
  details.init();
});
