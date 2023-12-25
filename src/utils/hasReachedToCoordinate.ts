import haversineDistance from './haversineDistance'
import { LatLngLiteral } from 'src/db/types/transportation'
/**
 * This function checks if a given point has reached its expected destination within a certain tolerance
 * by using the haversine formula for calculating the distance between two points on a sphere from their longitudes and latitudes.
 * The threshold is currently set to 1000 meters, accounting for the GPS inaccuracies.
 *
 * @param {LatLngLiteral} expectedDestinationWaypoint - The expected destination point in the form of an object with `lat` and `lng` properties.
 * @param {LatLngLiteral} waypointLocation - The current location of the point in the form of an object with `lat` and `lng` properties.
 *
 * @returns {boolean} Returns `true` if the distance between the expected destination and the current location is less than or equal to 1000 meters.
 * Otherwise, returns `false`.
 *
 * @example
 * // Using coordinates for New York City and Newark, NJ, approximately 16 km apart
 * const NYC = {lat: 40.7128, lng: -74.0060};
 * const Newark = {lat: 40.7357, lng: -74.1724};
 * console.log(hasReachedToCoordinate(Newark, NYC)); // Returns `false`
 *
 */
export default function hasReachedToCoordinate(expectedDestinationWaypoint: LatLngLiteral, waypointLocation: LatLngLiteral): boolean {
  if (!expectedDestinationWaypoint || !waypointLocation) {
    return false
  }
  const distanceInKm = haversineDistance(expectedDestinationWaypoint, waypointLocation)
  const distanceInMeters = distanceInKm * 1000
  return distanceInMeters <= 1000 // adjust this threshold as needed, GPS is not perfectly accurate
}
