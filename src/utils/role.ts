import { UserDataType } from 'src/context/types'

export const userModified = (user: UserDataType) => {
  let role: string = ''

  if (user.isAdmin === true) {
    role = 'admin'
  } else if (user.isTrader === true) {
    role = 'trader'
  } else if (user.isVendor === true) {
    role = 'vendor'
  }
  let userData = { ...user, role: role }

  return userData
}
