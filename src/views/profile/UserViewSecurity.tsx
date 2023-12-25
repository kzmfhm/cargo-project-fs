// ** React Imports
import { ChangeEvent, useState, useEffect } from 'react'
import {
  Card,
  AlertTitle,
  CardContent,
  InputLabel,
  IconButton,
  FormControl,
  Grid,
  CardHeader,
  OutlinedInput,
  InputAdornment,
  Alert,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  FormHelperText
} from '@mui/material'

import LoadingButton from '@mui/lab/LoadingButton'
import { useAuth } from 'src/hooks/useAuth'
import { useAppSelector, useAppDispatch } from 'src/hooks/useRedux'
import {
  changePassword,
  sendOTPforEmailVerify,
  verifyOTPforEmailVerify
} from 'src/redux/slices/accounts'

import Icon from 'src/@core/components/icon'
import toast from 'react-hot-toast'

interface State {
  newPassword: string
  showNewPassword: boolean
  confirmNewPassword: string
  showConfirmNewPassword: boolean
}

const UserViewSecurity = () => {
  // ** States
  const [openEmailVerification, setOpenEmailVerification] = useState<boolean>(false)
  const [otp, setOtp] = useState<string>('')
  const [OTPValidationError, setOTPValidationError] = useState<string>('')
  // Handle Edit dialog
  const handleOpenDialogue = () => setOpenEmailVerification(true)
  const handleCloseDialogue = () => setOpenEmailVerification(false)

  const dispatch = useAppDispatch()
  const auth = useAuth()
  const { user } = auth

  const {
    passwordChangeLoading,
    passwordChangeError,
    passwordChangeSuccess,
    sendOTPIsLoading,
    sendOTPError,
    sendOTPSuccess,
    verifyOTPIsLoading,
    verifyOTPError,
    verifyOTPSuccess,
    userData
  } = useAppSelector((state) => state.accounts)
  // ** States
  const [values, setValues] = useState<State>({
    newPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showConfirmNewPassword: false
  })
  const [showError, setShowError] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  // Handle Password
  const handleNewPasswordChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }
  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  // Handle Confirm Password
  const handleConfirmNewPasswordChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }
  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  const passwordValidation = () => {
    const password = values.newPassword
    const passwordLength = password.length

    if (passwordLength < 8) {
      setError('Password must be at least 8 characters long')
      setShowError(true)
    }

    if (password !== values.confirmNewPassword) {
      setError('Passwords do not match')
      setShowError(true)
    }
    if (passwordLength >= 8 && password === values.confirmNewPassword) {
      setShowError(false)
    }
  }

  useEffect(() => {
    if (values.newPassword.length > 0 && values.confirmNewPassword.length > 0) {
      passwordValidation()
    }
    if (passwordChangeError) {
      setError(passwordChangeError)
      setShowError(true)
    }
  }, [values, passwordChangeError])

  function handleSubmit() {
    dispatch(changePassword(user?.token || '', values.newPassword || ''))
  }

  function handleSendOTP() {
    dispatch(
      sendOTPforEmailVerify(user?.token || '', userData?.id || '', userData?.email || '')
    )
    setOpenEmailVerification(true)
  }

  const HandleOTPValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value)
  }

  const handleVerifyOTP = () => {
    if (otp.length === 0) {
      setOTPValidationError('Please enter OTP')
    } else {
      dispatch(verifyOTPforEmailVerify(user?.token || '', user?.id || '', otp))
    }
  }

  useEffect(() => {
    if (verifyOTPSuccess) {
      handleCloseDialogue()
      toast.success('Email Verified Successfully')
    }

    if (verifyOTPError) {
      toast.error(verifyOTPError)
    }

    if (sendOTPSuccess) {
      toast.success('OTP Sent Successfully')
    }

    if (sendOTPError) {
      toast.error(sendOTPError)
    }
  }, [sendOTPError, sendOTPSuccess, verifyOTPError, verifyOTPSuccess])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card sx={{ mb: 3 }}>
          <CardHeader title="Account Status" />
          <CardContent>
            <Typography variant="body2" sx={{ color: 'success.main' }}>
              Active
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              ID: {userData?.id}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Email: {userData?.email} <br />{' '}
            </Typography>
            {!user?.isEmailVerified && (
              <LoadingButton onClick={handleSendOTP} loading={sendOTPIsLoading}>
                <Typography variant="body2" color="error.main">
                  Email is Not Verified - Click to Verify
                </Typography>
              </LoadingButton>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Change Password" />
          <CardContent>
            {showError && (
              <Alert icon={false} severity="warning" sx={{ mb: 4 }}>
                <AlertTitle
                  sx={{
                    fontWeight: 500,
                    fontSize: '1.25rem',
                    mb: (theme) => `${theme.spacing(2.5)} !important`
                  }}
                >
                  Important
                </AlertTitle>
                {error}
              </Alert>
            )}

            {passwordChangeSuccess && !showError ? (
              <Alert icon={false} severity="success" sx={{ mb: 4 }}>
                <AlertTitle
                  sx={{
                    fontWeight: 500,
                    fontSize: '1.25rem',
                    mb: (theme) => `${theme.spacing(2.5)} !important`
                  }}
                >
                  Success
                </AlertTitle>
                Password changed successfully!
              </Alert>
            ) : null}

            <form onSubmit={(e) => e.preventDefault()}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="user-view-security-new-password">
                      New Password
                    </InputLabel>
                    <OutlinedInput
                      label="New Password"
                      value={values.newPassword}
                      id="user-view-security-new-password"
                      onChange={handleNewPasswordChange('newPassword')}
                      type={values.showNewPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={handleClickShowNewPassword}
                            onMouseDown={(e) => e.preventDefault()}
                            aria-label="toggle password visibility"
                          >
                            <Icon
                              icon={
                                values.showNewPassword ? 'tabler:eye' : 'tabler:eye-off'
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="user-view-security-confirm-new-password">
                      Confirm New Password
                    </InputLabel>
                    <OutlinedInput
                      label="Confirm New Password"
                      value={values.confirmNewPassword}
                      id="user-view-security-confirm-new-password"
                      type={values.showConfirmNewPassword ? 'text' : 'password'}
                      onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onMouseDown={(e) => e.preventDefault()}
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmNewPassword}
                          >
                            <Icon
                              icon={
                                values.showConfirmNewPassword
                                  ? 'tabler:eye'
                                  : 'tabler:eye-off'
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                    loading={passwordChangeLoading}
                    disabled={
                      !(values.newPassword.length === values.confirmNewPassword.length) ||
                      values.newPassword.length < 8
                    }
                  >
                    Change Password
                  </LoadingButton>
                </Grid>
              </Grid>
            </form>
          </CardContent>
          <Dialog
            open={openEmailVerification}
            onClose={handleCloseDialogue}
            aria-labelledby="user-view-edit"
            aria-describedby="user-view-edit-description"
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
          >
            <DialogTitle
              id="user-view-edit"
              sx={{
                textAlign: 'center',
                fontSize: '1.5rem !important',
                px: (theme) => [
                  `${theme.spacing(5)} !important`,
                  `${theme.spacing(15)} !important`
                ],
                pt: (theme) => [
                  `${theme.spacing(8)} !important`,
                  `${theme.spacing(12.5)} !important`
                ]
              }}
            >
              Comfirm your email
            </DialogTitle>
            <DialogContent
              sx={{
                pb: (theme) => `${theme.spacing(8)} !important`,
                px: (theme) => [
                  `${theme.spacing(5)} !important`,
                  `${theme.spacing(15)} !important`
                ]
              }}
            >
              <DialogContentText
                variant="body2"
                id="user-view-edit-description"
                sx={{ textAlign: 'center', mb: 7 }}
              >
                Email has been sent to your email address.
              </DialogContentText>

              <FormControl fullWidth>
                <TextField
                  value={otp}
                  onChange={HandleOTPValueChange}
                  type="number"
                  label="OTP"
                  placeholder="000000"
                  aria-describedby="postalCode"
                />

                {OTPValidationError && (
                  <FormHelperText sx={{ color: 'error.main' }} id="otp">
                    OTPValidationError
                  </FormHelperText>
                )}
              </FormControl>
              <DialogActions
                sx={{
                  justifyContent: 'center',
                  px: (theme) => [
                    `${theme.spacing(5)} !important`,
                    `${theme.spacing(15)} !important`
                  ],
                  pb: (theme) => [
                    `${theme.spacing(8)} !important`,
                    `${theme.spacing(12.5)} !important`
                  ],
                  p: (theme) => `${theme.spacing(5)} !important`
                }}
              >
                <LoadingButton
                  variant="contained"
                  sx={{ mr: 2 }}
                  loading={verifyOTPIsLoading}
                  onClick={handleVerifyOTP}
                >
                  Submit
                </LoadingButton>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCloseDialogue}
                >
                  Cancel
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserViewSecurity
