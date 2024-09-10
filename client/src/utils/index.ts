const CURRENCY_FORMATER = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "GBP",
});

export function formatCurrency(num: number) {
  return CURRENCY_FORMATER.format(num);
}
