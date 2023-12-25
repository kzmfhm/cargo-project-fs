import React from 'react'

interface TimeAgoProps {
  timeStamp: string
}

export const TimeAgo = ({ timeStamp }: TimeAgoProps): React.ReactElement => {
  let timeAgo = ''
  if (timeStamp) {
    const date = new Date(timeStamp)
    const now = new Date()
    const elapsed = now.getTime() - date.getTime()

    // Calculate the time period and unit
    const periods: [number, string][] = [
      [60 * 1000, 'minute'],
      [60 * 60 * 1000, 'hour'],
      [24 * 60 * 60 * 1000, 'day'],
      [7 * 24 * 60 * 60 * 1000, 'week'],
      [30 * 24 * 60 * 60 * 1000, 'month'],
      [365 * 24 * 60 * 60 * 1000, 'year']
    ]

    let period = 0
    let unit = ''
    let periodIndex = 0

    for (let i = periods.length - 1; i >= 0; i--) {
      const [periodDuration, periodUnit] = periods[i]
      if (elapsed >= periodDuration) {
        period = Math.floor(elapsed / periodDuration)
        unit = periodUnit
        periodIndex = i
        break
      }
    }

    if (period === 0) {
      timeAgo = `just now`
    } else {
      timeAgo = `${period} ${unit}${period === 1 ? '' : 's'} ago`
    }
  }
  return (
    <span title={timeStamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
}

export default TimeAgo
