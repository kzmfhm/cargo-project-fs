function formatDatetime(inputDatetimeStr: string | null | undefined): string {
  if (inputDatetimeStr === null || inputDatetimeStr === undefined) {
    return '' // Return an empty string or any default value you prefer for null or undefined input
  }

  const inputDate: Date = new Date(inputDatetimeStr)

  // Check if the date is valid
  if (isNaN(inputDate.getTime())) {
    return '' // Return an empty string for an invalid date
  }

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }

  return inputDate.toLocaleDateString(undefined, options)
}

function calculateRemainingDays(inputDatetimeStr: string | null | undefined): number | null {
  if (inputDatetimeStr === null || inputDatetimeStr === undefined) {
    return null // Return null for null or undefined input
  }

  const inputDate: Date = new Date(inputDatetimeStr)

  // Check if the date is valid
  if (isNaN(inputDate.getTime())) {
    return null // Return null for an invalid date
  }

  // Calculate the time difference in milliseconds between inputDate and today's date
  const timeDifference = inputDate.getTime() - new Date().getTime()

  // Calculate the remaining days by converting milliseconds to days
  const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

  return remainingDays
}

export { formatDatetime, calculateRemainingDays }
