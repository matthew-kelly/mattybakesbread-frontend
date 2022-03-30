export default function formatMoney(cents = 0, shorten = true) {
  const options = {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
  };
  // check if it's a clean dollar amount
  if (cents % 100 === 0 && shorten) {
    options.minimumFractionDigits = 0;
  }
  const formatter = new Intl.NumberFormat('en-CA', options);
  return formatter.format(cents / 100);
}
