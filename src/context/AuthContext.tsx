// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
// ** Types
import {
  AuthValuesType,
  RegisterParams,
  LoginParams,
  ErrCallbackType,
  UserDataType
} from './types'
import { userModified } from 'src/utils/role'
// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  updateUserData: () => Promise.resolve() // add this line
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!

      if (storedToken) {
        setLoading(true)
        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: 'Bearer ' + storedToken
            }
          })
          .then(async (response) => {
            setLoading(false)

            let userData = userModified(response.data)
            setUser(userData)
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('token')
            setUser(null)
            setLoading(false)
            if (
              authConfig.onTokenExpiration === 'logout' &&
              !router.pathname.includes('login')
            ) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.loginEndpoint, params)
      .then(async (response) => {
        params.rememberMe
          ? window.localStorage.setItem(
              authConfig.storageTokenKeyName,
              response.data.token
            )
          : null
        const returnUrl = router.query.returnUrl

        let userData = userModified(response.data)
        setUser(userData)
        params.rememberMe
          ? window.localStorage.setItem('userData', JSON.stringify(userData))
          : null

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL as string)
      })

      .catch((err) => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')

    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then((res) => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ email: params.email, password: params.password })
        }
      })
      .catch((err: { [key: string]: string }) =>
        errorCallback ? errorCallback(err) : null
      )
  }

  const handleUpdateUserData = (userData: UserDataType) => {
    setUser(userData)
    localStorage.setItem('userData', JSON.stringify(userData))
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    updateUserData: handleUpdateUserData // add this line
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
