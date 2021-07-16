import { sortArrayByPrice } from "./sortArray";

describe("test function for with all possible orders", () => {
  let arr;

  beforeEach(() => {
    arr = [
      { TotalCharge: { "@RateTotalAmount": 5000 } },
      { TotalCharge: { "@RateTotalAmount": 10000 } },
      { TotalCharge: { "@RateTotalAmount": 2000 } },
    ];
  });

  test("return an array sorted by price ascending", () => {
    expect(sortArrayByPrice(arr, "asc")).toEqual([
      { TotalCharge: { "@RateTotalAmount": 2000 } },
      { TotalCharge: { "@RateTotalAmount": 5000 } },
      { TotalCharge: { "@RateTotalAmount": 10000 } },
    ]);
  });

  test("return an array sorted by price descending", () => {
    expect(sortArrayByPrice(arr, "desc")).toEqual([
      { TotalCharge: { "@RateTotalAmount": 10000 } },
      { TotalCharge: { "@RateTotalAmount": 5000 } },
      { TotalCharge: { "@RateTotalAmount": 2000 } },
    ]);
  });

  test("return the array in the same order it was passed in", () => {
    expect(sortArrayByPrice(arr)).toEqual([
      { TotalCharge: { "@RateTotalAmount": 5000 } },
      { TotalCharge: { "@RateTotalAmount": 10000 } },
      { TotalCharge: { "@RateTotalAmount": 2000 } },
    ]);
  });
});
