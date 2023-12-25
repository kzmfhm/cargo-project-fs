// ** React Imports
import { useState, useEffect } from 'react'

// ** Redux
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { updateUser } from 'src/redux/slices/accounts'
import { countries } from 'src/db/fixtures/countries'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Types
import { UserDataType } from 'src/context/types'
import { UpdateUserFormType } from 'src/db/types/forms'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import FormHelperText from '@mui/material/FormHelperText'
import LoadingButton from '@mui/lab/LoadingButton'

import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

import { ThemeColor } from 'src/@core/layouts/types'
import { getInitials } from 'src/@core/utils/get-initials'

import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'

const UserViewLeft = () => {
  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)

  const {
    userUpdateLoading,
    userUpdateError,
    userUpdateSuccess,
    userData: user
  } = useAppSelector((state) => state.accounts)

  const dispatch = useAppDispatch()

  const auth = useAuth()

  const defaultValues = {
    name: user?.name || '',
    phoneNumber: user?.phoneNumber || '',
    about: user?.about || '',
    address: user?.address || '',
    city: user?.city || '',
    postalCode: user?.postalCode || '',
    country: user?.country || ''
  }

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateUserFormType>({ defaultValues })

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  const onSubmit = (data: UpdateUserFormType) => {
    dispatch(updateUser(user?.token ? user.token : '', data))
    auth.updateUserData(user as UserDataType)
  }

  useEffect(() => {
    if (userUpdateSuccess) {
      handleEditClose()
    }
  }, [userUpdateSuccess])

  useEffect(() => {
    if (userUpdateError) {
      toast.error('Error Updating Profile')
    }
  }, [userUpdateError])

  if (user) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent
              sx={{
                pt: 13.5,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
              }}
            >
              {user.avatar ? (
                <CustomAvatar
                  src={user.avatar}
                  variant="rounded"
                  alt={user.name}
                  sx={{ width: 100, height: 100, mb: 4 }}
                />
              ) : (
                <CustomAvatar
                  skin="light"
                  variant="rounded"
                  color={'primary' as ThemeColor}
                  sx={{ width: 100, height: 100, mb: 4, fontSize: '3rem' }}
                >
                  {getInitials(user.name)}
                </CustomAvatar>
              )}
              <Typography variant="h5" sx={{ mb: 3 }}>
                {user.name}
              </Typography>
              <CustomChip
                rounded
                skin="light"
                size="small"
                label={user.role}
                color="error"
                sx={{ textTransform: 'capitalize' }}
              />
            </CardContent>

            <Divider sx={{ my: '0 !important', mx: 6 }} />

            <CardContent sx={{ pb: 4 }}>
              <Typography
                variant="body2"
                sx={{ color: 'text.disabled', textTransform: 'uppercase' }}
              >
                Details
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500 }}>Phone Number:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {' '}
                    {user?.phoneNumber ? user.phoneNumber : 'Not Set'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500 }}>Email:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{user.email}</Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500 }}>About:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{user.about}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500 }}>Address:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {user.address}, {user.city}, {user.country}, {user.postalCode}
                  </Typography>
                </Box>
              </Box>

              <Button variant="contained" sx={{ mr: 2 }} onClick={handleEditClickOpen}>
                Edit
              </Button>
            </CardContent>

            <Dialog
              open={openEdit}
              onClose={handleEditClose}
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
                Edit User Information
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
                  Updating user details will receive a privacy audit.
                </DialogContentText>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <Controller
                          name="name"
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              label="Full Name"
                              onChange={onChange}
                              placeholder="Enter your full name"
                              error={Boolean(errors.name)}
                              aria-describedby="name"
                            />
                          )}
                        />
                        {errors.name && (
                          <FormHelperText sx={{ color: 'error.main' }} id="name">
                            This field is required
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <Controller
                          name="phoneNumber"
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              label="Phone Number"
                              onChange={onChange}
                              placeholder="Enter your phone number"
                              error={Boolean(errors.phoneNumber)}
                              aria-describedby="phone-number"
                            />
                          )}
                        />
                        {errors.phoneNumber && (
                          <FormHelperText sx={{ color: 'error.main' }} id="phone-number">
                            This field is required
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <Controller
                          name="about"
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              label="About"
                              onChange={onChange}
                              multiline
                              // Default minimum rows
                              minRows={3}
                              placeholder="Something nice about yourself"
                              error={Boolean(errors.about)}
                              aria-describedby="about"
                            />
                          )}
                        />
                        {errors.about && (
                          <FormHelperText sx={{ color: 'error.main' }} id="about">
                            This field is required
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <Controller
                          name="address"
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              onChange={onChange}
                              label="Address"
                              multiline
                              placeholder="e,g: 100 Water Plant Avenue, Building 1303 Wake Island"
                              error={Boolean(errors.address)}
                              aria-describedby="address"
                            />
                          )}
                        />
                        {errors.address && (
                          <FormHelperText sx={{ color: 'error.main' }} id="address">
                            This field is required
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <Controller
                          name="postalCode"
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              onChange={onChange}
                              type="number"
                              label="Postal Code"
                              placeholder="403114"
                              error={Boolean(errors.postalCode)}
                              aria-describedby="postalCode"
                            />
                          )}
                        />
                        {errors.postalCode && (
                          <FormHelperText sx={{ color: 'error.main' }} id="postalCode">
                            This field is required
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <Controller
                          name="city"
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              onChange={onChange}
                              label="City"
                              placeholder="Your city ..."
                              error={Boolean(errors.postalCode)}
                              aria-describedby="city"
                            />
                          )}
                        />
                        {errors.city && (
                          <FormHelperText sx={{ color: 'error.main' }} id="city">
                            This field is required
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="country"
                          error={Boolean(errors.country)}
                          htmlFor="country"
                        >
                          Country
                        </InputLabel>
                        <Controller
                          name="country"
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <Select
                              value={value}
                              label="Country"
                              onChange={onChange}
                              error={Boolean(errors.country)}
                              labelId="country"
                              aria-describedby="country"
                            >
                              {countries.map((country) => (
                                <MenuItem key={country.name} value={country.name}>
                                  {country.name}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />
                        {errors.country && (
                          <FormHelperText sx={{ color: 'error.main' }} id="country">
                            This field is required
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
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
                      loading={userUpdateLoading}
                      type="submit"
                    >
                      Submit
                    </LoadingButton>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleEditClose}
                    >
                      Cancel
                    </Button>
                  </DialogActions>
                </form>
              </DialogContent>
            </Dialog>
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default UserViewLeft
