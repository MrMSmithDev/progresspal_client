export default function convertUnits(
  weight: number,
  unitFrom: 'met' | 'imp'
): number {
  if (unitFrom === 'met') {
    // To imperial
    return parseInt((weight * 2.20462).toFixed(2));
  } else {
    // To metric
    return parseInt((weight * 0.453592).toFixed(2));
  }
}
