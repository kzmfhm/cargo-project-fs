export type LatLngLiteral = google.maps.LatLngLiteral
export type DirectionsResult = google.maps.DirectionsResult
export type MapOptions = google.maps.MapOptions

type WayPoint = {
  location: LatLngLiteral
  stopover: boolean
}

export type TransportationJob = {
  id: number
  vehicle: string
  driver: string
  driver_avatar?: string | null
  current_location: LatLngLiteral
  current_speed: number
  angle: number
  origin: LatLngLiteral | null
  destination: LatLngLiteral | null
  expected_route_waypoints: WayPoint[]
  followed_route_waypoints: WayPoint[]
  container: string
  item_description: string
  customer_reference_number: string
  mbl: string
  shipment_id: string
  visibility: string
  slug: string
  start_time: string
  end_time?: string | null
  status: string
}
