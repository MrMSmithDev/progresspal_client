export function convertWeightUnits(
  weight: number,
  unitFrom: 'met' | 'imp'
): number {
  if (unitFrom === 'met') {
    // To imperial
    return parseFloat((weight * 2.20462).toFixed(2));
  } else {
    // To metric
    return parseFloat((weight / 2.20462).toFixed(2));
  }
}

export function convertDistanceUnits(
  distance: number,
  unitFrom: 'met' | 'imp'
) {
  if (unitFrom === 'met') {
    // To imperial
    return parseFloat((distance * 0.621371).toFixed(2));
  } else {
    // To Metric
    return parseFloat((distance / 0.621371).toFixed(2));
  }
}
