import { describe, expect, it } from "vitest";
import { cartTotals } from "@/lib/store";

const price = (id: string) => ({ a: 1000, b: 4500 })[id] ?? 0;
describe("cart totals", () => {
  it("charges ৳120 delivery under ৳5,000", () => {
    expect(cartTotals([{ id: "a", qty: 2 }], price)).toMatchObject({ subtotal: 2000, shipping: 120, total: 2120, count: 2 });
  });
  it("delivers free at ৳5,000 or more", () => {
    expect(cartTotals([{ id: "a", qty: 1 }, { id: "b", qty: 1 }], price)).toMatchObject({ subtotal: 5500, shipping: 0, total: 5500 });
  });
});
