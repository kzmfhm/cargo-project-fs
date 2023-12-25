export const calculatedDays = (actual_departure: Date, actual_arrival: Date): number => {
  const difference = actual_arrival.getTime() - actual_departure.getTime()
  const totalDays = Math.ceil(difference / (1000 * 3600 * 24))
  return totalDays
}

export const percentageCalculator = (
  actual_departure: Date,
  actual_arrival: Date
): number => {
  const today = new Date()
  const difference = actual_arrival.getTime() - actual_departure.getTime()
  const differenceFromTodayValue = today.getTime() - actual_departure.getTime()
  const totalDaysTillToday = Math.ceil(differenceFromTodayValue / (1000 * 3600 * 24))
  const totalDays = Math.ceil(difference / (1000 * 3600 * 24))
  const percentage = (totalDaysTillToday / totalDays) * 100
  if (percentage < 0) {
    return 0
  } else if (percentage > 100) {
    return 100
  } else {
    return parseInt(percentage.toString())
  }
}

export const differenceFromToday = (actual_departure: Date): number => {
  const today = new Date()
  const differenceFromTodayValue = today.getTime() - actual_departure.getTime()
  const totalDaysTillToday = Math.ceil(differenceFromTodayValue / (1000 * 3600 * 24))
  if (totalDaysTillToday < 0) {
    return 0
  } else {
    return parseInt(totalDaysTillToday.toString())
  }
}
