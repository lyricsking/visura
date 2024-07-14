export const DiscountType = {
  percent: "percent",
  flat: "flat"
} as const;
export type DiscountType = typeof DiscountType[keyof typeof DiscountType];

export interface IDiscount {
  code: string,
  type: DiscountType,
  value: number
}