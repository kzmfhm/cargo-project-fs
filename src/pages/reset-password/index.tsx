// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { Card } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import OutlinedInput from '@mui/material/OutlinedInput'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import AuthIllustrationV1Wrapper from 'src/views/pages/auth/AuthIllustrationV1Wrapper'

import {
  resetPasswordVerifyBeforeLogin,
  resetAccountsState
} from 'src/redux/slices/accounts'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'

import LoadingButton from '@mui/lab/LoadingButton'

// ** Styled Components
const Logo = styled('img')(({ theme }) => ({
  zIndex: 1,
  maxHeight: '100%',
  maxWidth: '100%',
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  fontSize: '1rem',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main
}))

const schema = yup.object().shape({
  otp: yup.string().required('OTP is required'),
  // Alow only minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
  password: yup.string().min(5).required()
})

const defaultValues = {
  otp: '',
  password: ''
}

interface FormData {
  otp: string
  password: string
}

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const [passwordToLogin, setPasswordToLogin] = useState<string>('')
  const dispatch = useAppDispatch()
  // ** Hooks
  const auth = useAuth()

  const {
    resetPasswordEmail,
    resetPasswordVerifyBeforeLoginLoading,
    resetPasswordVerifyBeforeLoginError,
    resetPasswordVerifyBeforeLoginSuccess
  } = useAppSelector((state) => state.accounts)

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    const { otp, password } = data
    setPasswordToLogin(password)
    dispatch(resetPasswordVerifyBeforeLogin(resetPasswordEmail, otp, password))
  }

  useEffect(() => {
    if (resetPasswordVerifyBeforeLoginSuccess) {
      // route to login page
      let rememberMe = true
      auth.login(
        { email: resetPasswordEmail, password: passwordToLogin, rememberMe },
        () => {}
      ) // attempt to login
    } else if (resetPasswordVerifyBeforeLoginError) {
      // show error message
      setError('otp', {
        type: 'manual',
        message: resetPasswordVerifyBeforeLoginError
      })
    }
  }, [resetPasswordVerifyBeforeLoginSuccess, resetPasswordVerifyBeforeLoginError])

  return (
    <Box className="content-center" sx={{ backgroundColor: 'background.paper' }}>
      <AuthIllustrationV1Wrapper>
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CardContent sx={{ p: (theme) => `${theme.spacing(10.5, 1, 8)} !important` }}>
            <Box
              sx={{
                p: [3, 6],
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Box sx={{ width: '100%', maxWidth: 400 }}>
                <Logo alt="login-illustration" src={`/images/pages/logo.svg`} />
                <Box sx={{ my: 6 }}>
                  <Typography
                    sx={{
                      mb: 1.5,
                      fontWeight: 500,
                      fontSize: '1.625rem',
                      lineHeight: 1.385
                    }}
                  >
                    Reset Password 🔓
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    Enter your otp and password to reset your password
                  </Typography>
                </Box>
                <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      name="otp"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          autoFocus
                          label="otp"
                          type="number"
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.otp)}
                          placeholder="6 digit otp"
                        />
                      )}
                    />
                    {errors.otp && (
                      <FormHelperText sx={{ color: 'error.main' }}>
                        {errors.otp.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl fullWidth sx={{ mb: 1.5 }}>
                    <InputLabel
                      htmlFor="auth-login-v2-password"
                      error={Boolean(errors.password)}
                    >
                      Password
                    </InputLabel>
                    <Controller
                      name="password"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <OutlinedInput
                          value={value}
                          onBlur={onBlur}
                          label="Password"
                          onChange={onChange}
                          id="auth-login-v2-password"
                          error={Boolean(errors.password)}
                          type={showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                edge="end"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                <Icon
                                  icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'}
                                  fontSize={20}
                                />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      )}
                    />
                    {errors.password && (
                      <FormHelperText sx={{ color: 'error.main' }} id="">
                        {errors.password.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{ mb: 4 }}
                    loading={resetPasswordVerifyBeforeLoginLoading}
                  >
                    Confirm
                  </LoadingButton>
                  <Typography
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '& svg': { mr: 1 }
                    }}
                  >
                    <LinkStyled
                      href="/forgot-password"
                      onClick={() => dispatch(resetAccountsState())}
                    >
                      <Icon fontSize="1.25rem" icon="tabler:chevron-left" />
                      <span>Resend otp</span>
                    </LinkStyled>
                  </Typography>
                </form>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </AuthIllustrationV1Wrapper>
    </Box>
  )
}

ResetPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

ResetPassword.guestGuard = true

export default ResetPassword
