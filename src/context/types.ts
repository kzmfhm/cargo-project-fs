export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type Group = {
  name: string
  plateform_fee: number
  discount: number
}

export type Partner = {
  id: string
  name: string
  group?: Group
}

export type RegisterParams = {
  email: string
  username: string
  password: string
}

export type UserDataType = {
  refresh: string
  access: string
  id: string
  name: string
  avatar: string | null
  email: string
  isEmailVerified: boolean
  isTrader: boolean
  notifyTracking: boolean
  notifyIgmEmails: boolean
  comments_alert_on_emails: boolean
  notifyWhatsapp: boolean
  phoneNumber: string | null
  about: string
  address: string | null
  city: string | null
  postalCode: string | null
  country: string | null
  isAdmin: boolean
  isVendor: boolean
  token: string
  role: string
  partner: Partner[]
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
  updateUserData: (userData: UserDataType) => void
}
