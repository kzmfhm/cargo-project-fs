// find start of fiscal year
export const fiscalYearStart = (): string => {
  const date: Date = new Date()
  const year: number = date.getFullYear()
  const month: number = date.getMonth()

  // In Pakistan, fiscal year starts from first July of the year
  if (month + 1 <= 6) {
    return `${year - 1}-07-01`
  } else {
    return `${year}-07-01`
  }
}

// find end of fiscal year
export const fiscalYearEnd = (): string => {
  const date: Date = new Date()
  const year: number = date.getFullYear()
  const month: number = date.getMonth()

  // In Pakistan, fiscal year ends on last June of the year
  if (month + 1 <= 6) {
    return `${year}-06-30`
  } else {
    return `${year + 1}-06-30`
  }
}

// get today date
export const today = (): string => {
  const date: Date = new Date()
  const year: number = date.getFullYear()
  const month: number = date.getMonth() + 1
  const day: number = date.getDate()

  return `${year}-${month}-${day}`
}

// return date into a string with YYYY-MM-DD format
export const formatDate = (date: Date): string => {
  const year: number = date.getFullYear()
  const month: number = date.getMonth() + 1
  const day: number = date.getDate()

  return `${year}-${month}-${day}`
}
