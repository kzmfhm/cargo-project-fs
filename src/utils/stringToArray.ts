export const convertStringToArray = (string: string) => {
  // input "[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]"
  // output [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]

  // input "["Jul-22", "Aug-22", "Sep-22", "Oct-22", "Nov-22", "Dec-22", "Jan-23", "Feb-23", "Mar-23"]"
  // output "["Jul-22", "Aug-22", "Sep-22", "Oct-22", "Nov-22", "Dec-22", "Jan-23", "Feb-23", "Mar-23"]"
  return JSON.parse(string)
}
