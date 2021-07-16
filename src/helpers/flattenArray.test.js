import { flattenCarsArray } from "./flattenArray.js";

test("given an array of objects containing a nested vehicles array, returns an array of objects with vendor added", () => {
  const arr = [
    { Vendor: { "@Name": "vendor1" }, VehAvails: [{ details: "vehicle1" }] },
    { Vendor: { "@Name": "vendor2" }, VehAvails: [{ details: "vehicle2" }] },
  ];

  expect(flattenCarsArray(arr)).toEqual([
    { vendor: "vendor1", details: "vehicle1" },
    { vendor: "vendor2", details: "vehicle2" },
  ]);
});
