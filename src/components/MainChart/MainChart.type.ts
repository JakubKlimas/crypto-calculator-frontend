export type Price = {
  price: number;
  date: Date;
};

export type Series = {
  label: string;
  data: Price[];
};

export const enum IntervalsEmum {
  ONE_DAY = "1d",
  ONE_WEEK = "1w",
  ONE_MONTH = "1M",
}
