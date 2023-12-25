export const readableTimeStamp = (timeStamp: string) => {
  // 2023-04-19T00:32:37.191197+05:00 format from API

  const date = new Date(timeStamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM'
  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds} ${ampm}`
}
