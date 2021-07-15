import styles from "./component.styles.scss";

class Card extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = `
        <style>
            ${styles}
        </style>
        <article class="card">
            <div class="col col-left">
              <img class="car-image" src="" alt="Image of car" />
            </div>
            <div class="col col-middle">
              <h2 class="car-model"></h2>
              <div class="vendor-details">
                <span class="car-vendor"></span>
                <span class="car-code"></span>
              </div>
              <div class="car-info">
                <span class="car-passenger-qty"></span>
                <span class="car-baggage-qty"></span>
                <span class="car-door-count"></span>
              </div>
              <div class="car-info">
                <span class="car-air-con"></span>
                <span class="car-transmission"></span>
                <span class="car-fuel"></span>
              </div>
              <div class="car-info">
                <span class="car-availability"></span>
              </div>
            </div>
            <div class="col col-right">
                <h3 class="car-price-heading">Total Price</h3>
                <span class="car-price"></span>
                <a href="" class="btn details-btn">View Details</a>
            </div>
        </article>`;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._carData = {};
  }

  set carData(value) {
    this._carData = value;
    this.updateUI();
  }

  get carData() {
    return this._carData;
  }

  updateUI() {
    const image = this.shadowRoot.querySelector(".car-image");
    const model = this.shadowRoot.querySelector(".car-model");
    const vendor = this.shadowRoot.querySelector(".car-vendor");
    const airCon = this.shadowRoot.querySelector(".car-air-con");
    const transmission = this.shadowRoot.querySelector(".car-transmission");
    const fuelType = this.shadowRoot.querySelector(".car-fuel");
    const passengerQty = this.shadowRoot.querySelector(".car-passenger-qty");
    const baggageQty = this.shadowRoot.querySelector(".car-baggage-qty");
    const doorCount = this.shadowRoot.querySelector(".car-door-count");
    const price = this.shadowRoot.querySelector(".car-price");
    const vehicleCode = this.shadowRoot.querySelector(".car-code");
    const vehicleAvailability =
      this.shadowRoot.querySelector(".car-availability");
    const detailsBtn = this.shadowRoot.querySelector(".details-btn");

    detailsBtn.href = `/details.html?vendor=${this._carData.vendor}&vehicle=${this._carData.Vehicle["@Code"]}`;
    image.src = this._carData.Vehicle.PictureURL;
    model.textContent = this._carData.Vehicle.VehMakeModel["@Name"];
    vendor.textContent = `Vendor: ${this._carData.vendor}`;
    airCon.textContent = this._carData.Vehicle["@AirConditionInd"]
      ? "Air Con"
      : "";
    fuelType.textContent = this._carData.Vehicle["@FuelType"];
    transmission.textContent = this._carData.Vehicle["@TransmissionType"];
    passengerQty.textContent = `${this._carData.Vehicle["@PassengerQuantity"]} People`;
    baggageQty.textContent = `${this._carData.Vehicle["@BaggageQuantity"]} Bags`;
    doorCount.textContent = `${this._carData.Vehicle["@DoorCount"]} Doors`;
    price.innerHTML = `${this._carData.TotalCharge["@CurrencyCode"]} $${this._carData.TotalCharge["@RateTotalAmount"]} `;
    vehicleCode.textContent = `Code: ${this._carData.Vehicle["@Code"]}`;
    vehicleAvailability.innerHTML = `${this._carData["@Status"]}<div class="available-icon"></div>`;
  }
}

customElements.define("custom-card", Card);
