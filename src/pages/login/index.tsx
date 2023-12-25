// ** React Imports
import { useState, ReactNode, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import LoadingButton from '@mui/lab/LoadingButton'
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import { login as loginInStore } from 'src/redux/slices/accounts'
// ** Configs
import themeConfig from 'src/configs/themeConfig'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { resetShipmentsState } from 'src/redux/slices/shipments'
import { resetOverviewState } from 'src/redux/slices/overview'
import { resetAnalyticsState } from 'src/redux/slices/analytics'
import { resetTransportationsState } from 'src/redux/slices/transportation'
import { resetScedulesState } from 'src/redux/slices/schedules'
import { resetBookingState } from 'src/redux/slices/bookings'

import { Card } from '@mui/material'
import AuthIllustrationV1Wrapper from 'src/views/pages/auth/AuthIllustrationV1Wrapper'

// ** Styled Components
const Logo = styled('img')(({ theme }) => ({
  zIndex: 1,
  maxHeight: '100%',
  maxWidth: '100%',
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550,
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500,
  },
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main,
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
  },
}))

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
})

const defaultValues = {
  password: '',
  email: '',
}

interface FormData {
  email: string
  password: string
}

const LoginPage = () => {
  // ** States
  const [rememberMe, setRememberMe] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // ** Hooks
  const auth = useAuth()
  const dispatch = useAppDispatch()

  const { isLoginLoading } = useAppSelector((state) => state.accounts)

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    const { email, password } = data
    dispatch(loginInStore({ email, password, rememberMe })) // login in store, and user detials will be saved in store
    auth.login({ email, password, rememberMe }, () => {
      setError('email', {
        type: 'manual',
        message: 'Email or Password is invalid',
      })
    }) // login in auth
  }

  useEffect(() => {
    dispatch(resetShipmentsState())
    dispatch(resetOverviewState())
    dispatch(resetAnalyticsState())
    dispatch(resetTransportationsState())
    dispatch(resetScedulesState())
    dispatch(resetBookingState())
  }, [])

  return (
    <Box className="content-center" sx={{ backgroundColor: 'background.paper' }}>
      <AuthIllustrationV1Wrapper>
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CardContent sx={{ p: (theme) => `${theme.spacing(10.5, 1, 8)} !important` }}>
            <Box
              sx={{
                p: [3, 6],
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ width: '100%', maxWidth: 400 }}>
                <Box sx={{ my: 6 }}>
                  <Logo alt="login-illustration" src={`/images/pages/logo.svg`} />
                  <Typography
                    sx={{
                      mb: 1.5,
                      fontWeight: 500,
                      fontSize: '1.625rem',
                      lineHeight: 1.385,
                      textAlign: 'center',
                    }}
                  >
                    {`Welcome to ${themeConfig.templateName}! 👋🏻`}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', textAlign: 'center' }}>
                    Please sign-in to your account and start the adventure
                  </Typography>
                </Box>

                <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      name="email"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          autoFocus
                          label="Email"
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.email)}
                          placeholder="john@example.com"
                        />
                      )}
                    />
                    {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
                  </FormControl>
                  <FormControl fullWidth sx={{ mb: 1.5 }}>
                    <InputLabel htmlFor="auth-login-v2-password" error={Boolean(errors.password)}>
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
                              <IconButton edge="end" onMouseDown={(e) => e.preventDefault()} onClick={() => setShowPassword(!showPassword)}>
                                <Icon icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} fontSize={20} />
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
                  <Box
                    sx={{
                      mb: 1.75,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <FormControlLabel
                      label="Remember Me"
                      control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                    />
                  </Box>
                  <LoadingButton fullWidth size="large" type="submit" variant="contained" sx={{ mb: 4 }} loading={isLoginLoading}>
                    Login
                  </LoadingButton>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography sx={{ color: 'text.secondary', mr: 2 }}>New on our platform?</Typography>
                    <Typography variant="body2">
                      <LinkStyled href="https://signupbeta.kingsofcargo.com/" sx={{ fontSize: '1rem' }}>
                        Request for a BETA access
                      </LinkStyled>
                    </Typography>
                    <hr />
                    <LinkStyled href="/forgot-password">Forgot Password?</LinkStyled>
                  </Box>
                </form>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </AuthIllustrationV1Wrapper>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
