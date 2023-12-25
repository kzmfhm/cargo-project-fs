export function calculateDateDifference(
  origin_departure_date_estimated: string | null,
  destination_arrival_date_estimated: string | null,
): number | null {
  if (!origin_departure_date_estimated || !destination_arrival_date_estimated) {
    return null // Handle null inputs
  }

  const originDate = new Date(origin_departure_date_estimated)
  const destinationDate = new Date(destination_arrival_date_estimated)

  if (isNaN(originDate.getTime()) || isNaN(destinationDate.getTime())) {
    return null // Handle invalid date inputs
  }

  const timeDifference = originDate.getTime() - destinationDate.getTime()
  const dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24))

  return dayDifference
}
