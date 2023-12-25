import { createSlice } from '@reduxjs/toolkit'
import axios from 'src/utils/axios'
import { userModified } from 'src/utils/role'
import { AppDispatch } from '../store'
import { UpdateUserFormType } from 'src/db/types/forms'
import { LoginParams, UserDataType } from 'src/context/types'
import authConfig from 'src/configs/auth'

// Define a type for the slice state
interface AccountsState {
  isLoginLoading: boolean
  loginError: string | null
  loginSuccess: boolean

  isPartnersLoading: boolean
  partnersError: string | null
  partnersSuccess: boolean
  allPartners: any[]

  resetPasswordRequestBeforeLoginLoading: boolean
  resetPasswordRequestBeforeLoginError: string | null
  resetPasswordRequestBeforeLoginSuccess: boolean
  resetPasswordEmail: string

  resetPasswordVerifyBeforeLoginLoading: boolean
  resetPasswordVerifyBeforeLoginError: string | null
  resetPasswordVerifyBeforeLoginSuccess: boolean

  passwordChangeLoading: boolean
  passwordChangeError: string | null
  passwordChangeSuccess: boolean

  userUpdateLoading: boolean
  userUpdateError: string | null
  userUpdateSuccess: boolean

  userNotifcationsLoading: boolean
  userNotifcationsError: string | null
  userNotifcationsSuccess: boolean

  sendOTPIsLoading: boolean
  sendOTPError: string | null
  sendOTPSuccess: boolean

  verifyOTPIsLoading: boolean
  verifyOTPError: string | null
  verifyOTPSuccess: boolean

  userData: UserDataType | null
}

const initialState: AccountsState = {
  isLoginLoading: false,
  loginError: null,
  loginSuccess: false,

  isPartnersLoading: false,
  partnersError: null,
  partnersSuccess: false,
  allPartners: [],

  resetPasswordRequestBeforeLoginLoading: false,
  resetPasswordRequestBeforeLoginError: null,
  resetPasswordRequestBeforeLoginSuccess: false,
  resetPasswordEmail: '',

  resetPasswordVerifyBeforeLoginLoading: false,
  resetPasswordVerifyBeforeLoginError: null,
  resetPasswordVerifyBeforeLoginSuccess: false,

  passwordChangeLoading: false,
  passwordChangeError: null,
  passwordChangeSuccess: false,

  userUpdateLoading: false,
  userUpdateError: null,
  userUpdateSuccess: false,

  userNotifcationsLoading: false,
  userNotifcationsError: null,
  userNotifcationsSuccess: false,

  sendOTPIsLoading: false,
  sendOTPError: null,
  sendOTPSuccess: false,

  verifyOTPIsLoading: false,
  verifyOTPError: null,
  verifyOTPSuccess: false,

  userData: null
}

const slice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    startLoginLoading(state) {
      state.isLoginLoading = true
      state.loginError = null
      state.loginSuccess = false
    },

    // LOGIN
    loginSuccess(state, action) {
      state.isLoginLoading = false
      state.loginSuccess = true
      state.userData = userModified(action.payload)
      // set token in local storage
      localStorage.setItem(authConfig.storageTokenKeyName, action.payload.token)
      // set userData in local storage
      localStorage.setItem('userData', JSON.stringify(action.payload))
    },
    loginFail(state, action) {
      state.isLoginLoading = false
      state.loginError = action.payload
    },

    startPartnersLoading(state) {
      state.isPartnersLoading = true
      state.partnersError = null
      state.partnersSuccess = false
    },
    // GET ALL PARTNERS
    getAllPartnersSuccess(state, action) {
      state.isPartnersLoading = false
      state.partnersSuccess = true
      state.allPartners = action.payload
    },
    getAllPartnersFail(state, action) {
      state.isPartnersLoading = false
      state.partnersError = action.payload
    },

    startResetPasswordRequestBeforeLoginLoading(state) {
      state.resetPasswordRequestBeforeLoginLoading = true
      state.resetPasswordRequestBeforeLoginError = null
      state.resetPasswordRequestBeforeLoginSuccess = false
    },

    // RESET PASSWORD REQUEST BEFORE LOGI
    resetPasswordRequestBeforeLoginSuccess(state, action) {
      state.resetPasswordRequestBeforeLoginLoading = false
      state.resetPasswordRequestBeforeLoginSuccess = true
      state.resetPasswordEmail = action.payload
    },

    resetPasswordRequestBeforeLoginFail(state, action) {
      state.resetPasswordRequestBeforeLoginLoading = false
      state.resetPasswordRequestBeforeLoginError = action.payload
    },

    startResetPasswordVerifyBeforeLoginLoading(state) {
      state.resetPasswordVerifyBeforeLoginLoading = true
      state.resetPasswordVerifyBeforeLoginError = null
      state.resetPasswordVerifyBeforeLoginSuccess = false
    },

    // RESET PASSWORD VERIFY BEFORE LOGIN
    resetPasswordVerifyBeforeLoginSuccess(state, action) {
      state.resetPasswordVerifyBeforeLoginLoading = false
      state.resetPasswordVerifyBeforeLoginSuccess = true
      state.userData = userModified(action.payload)
    },

    resetPasswordVerifyBeforeLoginFail(state, action) {
      state.resetPasswordVerifyBeforeLoginLoading = false
      state.resetPasswordVerifyBeforeLoginError = action.payload
    },

    startPasswordChangeLoading(state) {
      state.passwordChangeLoading = true
      state.passwordChangeError = null
      state.passwordChangeSuccess = false
    },
    // CHANGE PASSWORD
    changePasswordSuccess(state, action) {
      state.passwordChangeLoading = false
      state.passwordChangeSuccess = true
      state.userData = userModified(action.payload)
    },
    changePasswordFail(state, action) {
      state.passwordChangeLoading = false
      state.passwordChangeError = action.payload
    },

    startUserUpdateLoading(state) {
      state.userUpdateLoading = true
      state.userUpdateError = null
      state.userUpdateSuccess = false
    },
    // UPDATE USER
    updateUserSuccess(state, action) {
      state.userUpdateLoading = false
      state.userData = userModified(action.payload)
      state.userUpdateSuccess = true
    },
    updateUserFail(state, action) {
      state.userUpdateLoading = false
      state.userUpdateError = action.payload
      state.userUpdateSuccess = false
    },

    startUserNotifcationsLoading(state) {
      state.userNotifcationsLoading = true
      state.userNotifcationsError = null
      state.userNotifcationsSuccess = false
    },
    // UPDATE USER NOTIFICATIONS
    updateUserNotifcationsSuccess(state, action) {
      state.userNotifcationsLoading = false
      state.userData = userModified(action.payload)
      state.userNotifcationsSuccess = true
    },

    updateUserNotifcationsFail(state, action) {
      state.userNotifcationsLoading = false
      state.userNotifcationsError = action.payload
      state.userNotifcationsSuccess = false
    },

    startSendOTPLoading(state) {
      state.sendOTPIsLoading = true
      state.sendOTPError = null
      state.sendOTPSuccess = false
    },

    // SEND OTP
    sendOTPSuccess(state, action) {
      state.sendOTPIsLoading = false
      state.sendOTPSuccess = true
    },

    sendOTPFail(state, action) {
      state.sendOTPIsLoading = false
      state.sendOTPError = action.payload
    },

    startVerifyOTPLoading(state) {
      state.verifyOTPIsLoading = true
      state.verifyOTPError = null
      state.verifyOTPSuccess = false
    },

    // VERIFY OTP
    verifyOTPSuccess(state, action) {
      state.verifyOTPIsLoading = false
      state.verifyOTPSuccess = true
      state.userData = userModified(action.payload)
    },

    verifyOTPFail(state, action) {
      state.verifyOTPIsLoading = false
      state.verifyOTPError = action.payload
    },

    resetState(state) {
      state.isLoginLoading = false
      state.loginError = null
      state.loginSuccess = false

      state.isPartnersLoading = false
      state.partnersError = null
      state.partnersSuccess = false
      state.allPartners = []

      state.resetPasswordRequestBeforeLoginLoading = false
      state.resetPasswordRequestBeforeLoginError = null
      state.resetPasswordRequestBeforeLoginSuccess = false

      state.resetPasswordVerifyBeforeLoginLoading = false
      state.resetPasswordVerifyBeforeLoginError = null
      state.resetPasswordVerifyBeforeLoginSuccess = false

      state.passwordChangeLoading = false
      state.passwordChangeError = null
      state.passwordChangeSuccess = false

      state.userUpdateLoading = false
      state.userUpdateError = null
      state.userUpdateSuccess = false

      state.userNotifcationsLoading = false
      state.userNotifcationsError = null
      state.userNotifcationsSuccess = false

      state.sendOTPIsLoading = false
      state.sendOTPError = null
      state.sendOTPSuccess = false

      state.verifyOTPIsLoading = false
      state.verifyOTPError = null
      state.verifyOTPSuccess = false

      state.userData = null
    }
  }
})

// Reducer
export default slice.reducer
export const { actions } = slice

// Actions

export const login = (params: LoginParams) => async (dispatch: AppDispatch) => {
  dispatch(actions.startLoginLoading())
  try {
    const response = await axios.post('/api/v1/accounts/login/', params)
    dispatch(actions.loginSuccess(response.data))
  } catch (error: any) {
    dispatch(actions.loginFail(error.detail))
  }
}

export const me = (token: string) => async (dispatch: AppDispatch) => {
  dispatch(actions.startLoginLoading())
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.get('/api/v1/accounts/me', config)
    dispatch(actions.loginSuccess(response.data))
  } catch (error: any) {
    dispatch(actions.loginFail(error.detail))
  }
}

export const resetPasswordRequestBeforeLogin =
  (email: string) => async (dispatch: AppDispatch) => {
    dispatch(actions.startResetPasswordRequestBeforeLoginLoading())
    try {
      await axios.post('/api/v1/accounts/user/password_reset_request/', {
        email
      })
      dispatch(actions.resetPasswordRequestBeforeLoginSuccess(email))
    } catch (error: any) {
      dispatch(actions.resetPasswordRequestBeforeLoginFail(error.detail))
    }
  }

export const resetPasswordVerifyBeforeLogin =
  (email: string, otpForEmail: string, password: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(actions.startResetPasswordVerifyBeforeLoginLoading())
    try {
      const response = await axios.put('/api/v1/accounts/user/reset_password_verify/', {
        email,
        otpForEmail,
        password
      })
      dispatch(actions.resetPasswordVerifyBeforeLoginSuccess(response.data))
    } catch (error: any) {
      dispatch(actions.resetPasswordVerifyBeforeLoginFail(error.detail))
    }
  }

export const getAllPartners = (token: string) => async (dispatch: AppDispatch) => {
  dispatch(actions.startPartnersLoading())
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.get('/api/v1/accounts/partners/', config)
    dispatch(actions.getAllPartnersSuccess(response.data))
  } catch (error: any) {
    dispatch(actions.getAllPartnersFail(error.detail))
  }
}

export const changePassword =
  (token: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(actions.startPasswordChangeLoading())
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      let data = {
        password: password,
        confirmPassword: password
      }
      const response = await axios.patch(
        '/api/v1/accounts/user/password/change/',
        data,
        config
      )
      dispatch(actions.changePasswordSuccess(response.data))
    } catch (error: any) {
      dispatch(actions.changePasswordFail(error.detail))
    }
  }

export const updateUser =
  (token: string, data: UpdateUserFormType) => async (dispatch: AppDispatch) => {
    dispatch(actions.startUserUpdateLoading())
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.patch(
        '/api/v1/accounts/user-profile-update/',
        data,
        config
      )
      dispatch(actions.updateUserSuccess(response.data))
    } catch (error: any) {
      dispatch(actions.updateUserFail(error.detail))
    }
  }

export const resetAccountsState = () => async (dispatch: AppDispatch) => {
  dispatch(actions.resetState())
}

export const refillUserData = (data: UserDataType) => async (dispatch: AppDispatch) => {
  dispatch(actions.loginSuccess(data))
}

export const updateUserNotifcations =
  (token: string, id: string, endpoint: string) => async (dispatch: AppDispatch) => {
    dispatch(actions.startUserNotifcationsLoading())
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.patch(
        `/api/v1/accounts/user/${id}/${endpoint}/`,
        {},
        config
      )
      dispatch(actions.updateUserNotifcationsSuccess(response.data))
    } catch (error: any) {
      dispatch(actions.updateUserNotifcationsFail(error.detail))
    }
  }

export const sendOTPforEmailVerify =
  (token: string, id: string, email: string) => async (dispatch: AppDispatch) => {
    dispatch(actions.startSendOTPLoading())
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.post(
        `/api/v1/accounts/user/${id}/send-otp/`,
        { email },
        config
      )
      dispatch(actions.sendOTPSuccess(response.data))
    } catch (error: any) {
      dispatch(actions.sendOTPFail(error.detail))
    }
  }

export const verifyOTPforEmailVerify =
  (token: string, id: string, otpForEmail: string) => async (dispatch: AppDispatch) => {
    dispatch(actions.startVerifyOTPLoading())
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.put(
        `/api/v1/accounts/user/${id}/verify-email/`,
        { otpForEmail },
        config
      )
      dispatch(actions.verifyOTPSuccess(response.data))
    } catch (error: any) {
      dispatch(actions.verifyOTPFail(error.detail))
    }
  }
