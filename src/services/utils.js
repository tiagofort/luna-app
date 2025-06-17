export function formatCurrency (value, currency = 'EUR' , locale = 'en-IE') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }).format(value)
}
