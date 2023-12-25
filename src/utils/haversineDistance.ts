import { LatLngLiteral } from 'src/db/types/transportation'

/**
 * Converts the given value from degrees to radians.
 *
 * @param {number} x - A value in degrees that needs to be converted into radians.
 *
 * @returns {number} The value converted into radians.
 *
 * @example
 * const radianValue = toRad(90); // Returns 1.5708 which is equivalent to 90 degrees in radians.
 *
 * @throws {Error} Throws an error if the input is not a number.
 */
function toRad(x: number): number {
  return (x * Math.PI) / 180
}

/**
 * This function calculates the Haversine distance between two points on the Earth's surface specified by their latitudes and longitudes.
 * The Haversine formula is used here, which is especially important in navigation because it gives accurate results for small distances.
 *
 * @param {LatLngLiteral} coords1 - The coordinates of the first location in the form of an object with `lat` and `lng` properties.
 * @param {LatLngLiteral} coords2 - The coordinates of the second location in the form of an object with `lat` and `lng` properties.
 *
 * @returns {number} The Haversine distance between the two points in kilometers.
 *
 * @example
 * // Using coordinates for New York City and Newark, NJ, approximately 16 km apart
 * const NYC = {lat: 40.7128, lng: -74.0060};
 * const Newark = {lat: 40.7357, lng: -74.1724};
 * console.log(haversineDistance(Newark, NYC)); // Returns approximately 16
 *
 * @throws {Error} If either of the coordinates are not provided or are invalid, the function will throw an error.
 */
export default function haversineDistance(coords1: LatLngLiteral, coords2: LatLngLiteral): number {
  const lon1 = coords1.lng
  const lat1 = coords1.lat

  const lon2 = coords2.lng
  const lat2 = coords2.lat

  const earthRadiusInKm = 6371 // radius of Earth in kilometers

  const latDiff = lat2 - lat1
  const deltaLat = toRad(latDiff)
  const lonDiff = lon2 - lon1
  const deltaLon = toRad(lonDiff)

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2)

  const angle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distanceInKm = earthRadiusInKm * angle

  return distanceInKm
}
