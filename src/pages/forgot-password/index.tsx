// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'
//  next router
import { useRouter } from 'next/router'

import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { Card } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import AuthIllustrationV1Wrapper from 'src/views/pages/auth/AuthIllustrationV1Wrapper'

import { resetPasswordRequestBeforeLogin } from 'src/redux/slices/accounts'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'

import MuiFormControlLabel, {
  FormControlLabelProps
} from '@mui/material/FormControlLabel'
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

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(
  ({ theme }) => ({
    '& .MuiFormControlLabel-label': {
      fontSize: '0.875rem',
      color: theme.palette.text.secondary
    }
  })
)

const schema = yup.object().shape({
  email: yup.string().email().required()
})

const defaultValues = {
  email: ''
}

interface FormData {
  email: string
}

const ForgotPassword = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const {
    resetPasswordRequestBeforeLoginLoading,
    resetPasswordRequestBeforeLoginSuccess,
    resetPasswordRequestBeforeLoginError
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
    const { email } = data
    dispatch(resetPasswordRequestBeforeLogin(email)) // login in store, and user detials will be saved in store
  }

  useEffect(() => {
    if (resetPasswordRequestBeforeLoginSuccess) {
      // redirect to reset verify
      router.push('/reset-password')
    } else if (resetPasswordRequestBeforeLoginError) {
      // show error message
      setError('email', {
        type: 'manual',
        message: resetPasswordRequestBeforeLoginError
      })
    }
  }, [resetPasswordRequestBeforeLoginSuccess, resetPasswordRequestBeforeLoginError])

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
                    Forgot Password? 🔒
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    Enter your email and we&prime;ll send you OTP to reset your password
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
                    {errors.email && (
                      <FormHelperText sx={{ color: 'error.main' }}>
                        {errors.email.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{ mb: 4 }}
                    loading={resetPasswordRequestBeforeLoginLoading}
                  >
                    Send OTP
                  </LoadingButton>
                  <Typography
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '& svg': { mr: 1 }
                    }}
                  >
                    <LinkStyled href="/login">
                      <Icon fontSize="1.25rem" icon="tabler:chevron-left" />
                      <span>Back to login</span>
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

ForgotPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

ForgotPassword.guestGuard = true

export default ForgotPassword
