import { useState } from 'react'

import { Box, Grid, Typography, TextField, FormControl, FormHelperText, FormControlLabel, Checkbox } from '@mui/material'

import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'

import { MilestoneFormType, DateType } from 'src/db/types/forms'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { postMilestone } from 'src/redux/slices/shipments'
import { useAuth } from 'src/hooks/useAuth'
import LoadingButton from '@mui/lab/LoadingButton'

import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'

// ** Third Party Imports
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

// ** Custom Component Imports
import CustomInput from 'src/@core/components/picker-component'

import milestones from 'src/db/static-data/milestones'
import { Icon } from '@iconify/react'
// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const MilestoneForm = ({ popperPlacement }: { popperPlacement: ReactDatePickerProps['popperPlacement'] }) => {
  // ** States
  const [dateTime, setDateTime] = useState<DateType>(new Date())
  const dispatch = useAppDispatch()

  const router = useRouter()
  const { uuid } = router.query
  const auth = useAuth()
  const token = auth.user?.token as string | ''

  const { isLoadingCreateMilestone, milestoneCreateError } = useAppSelector((state) => state.shipments)

  const defaultValues = {
    date: new Date(),
    status: '',
    milestone: 0,
    client_action: false,
    location: '',
    vessel: '',
    vessel_imo: '',
    longitude: null,
    latitude: null,
  }

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MilestoneFormType>({ defaultValues })

  const onSubmit = (data: MilestoneFormType) => {
    //  change defaultValues.date to dateTime
    data.date = dateTime
    dispatch(postMilestone(token, uuid as string, data))
    reset(defaultValues)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <>
          {milestoneCreateError && (
            <Box sx={{ p: 3 }}>
              <Typography variant="body2" color="error">
                {milestoneCreateError}
              </Typography>
            </Box>
          )}

          <Typography
            variant="h6"
            component="h1"
            sx={{
              pl: 4,
              pt: 3,
              mb: 3,
              flexDirection: ['column', 'row'],
              alignItems: ['flex-start', 'center'],
            }}
          >
            Create Milestone Here <Icon icon="fluent:add-circle-20-filled" />
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <DatePickerWrapper>
              <Grid container spacing={3} padding={3}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <DatePicker
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    selected={dateTime}
                    id="date-time-picker"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    popperPlacement={popperPlacement}
                    onChange={(date: Date) => setDateTime(date)}
                    customInput={<CustomInput label="Date & Time" />}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <FormControl fullWidth>
                    <InputLabel id="milestone" error={Boolean(errors.milestone)} htmlFor="milestone">
                      Milestone
                    </InputLabel>
                    <Controller
                      name="milestone"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          value={value}
                          label="Country"
                          onChange={onChange}
                          error={Boolean(errors.milestone)}
                          labelId="milestone"
                          aria-describedby="milestone"
                        >
                          {milestones.map((milestone) => (
                            <MenuItem key={milestone.value} value={milestone.value}>
                              {milestone.label}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.milestone && (
                      <FormHelperText sx={{ color: 'error.main' }} id="milestone">
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                  <FormControl>
                    <Controller
                      name="client_action"
                      control={control}
                      rules={{ required: false }}
                      render={({ field }) => (
                        <FormControlLabel
                          label="Client Action"
                          sx={errors.client_action ? { color: 'error.main' } : null}
                          control={<Checkbox {...field} name="client_action" sx={errors.client_action ? { color: 'error.main' } : null} />}
                        />
                      )}
                    />
                    {errors.client_action && (
                      <FormHelperText sx={{ color: 'error.main' }} id="client_action">
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <FormControl fullWidth>
                    <Controller
                      name="status"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label="Status"
                          onChange={onChange}
                          placeholder=""
                          error={Boolean(errors.status)}
                          aria-describedby="status"
                        />
                      )}
                    />
                    {errors.status && (
                      <FormHelperText sx={{ color: 'error.main', mb: 3 }} id="status">
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <FormControl fullWidth>
                    <Controller
                      name="location"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label="Location"
                          onChange={onChange}
                          placeholder=""
                          error={Boolean(errors.location)}
                          aria-describedby="location"
                        />
                      )}
                    />
                    {errors.location && (
                      <FormHelperText sx={{ color: 'error.main', mb: 3 }} id="location">
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                  <FormControl fullWidth>
                    <Controller
                      name="vessel"
                      control={control}
                      rules={{ required: false }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label="Vessel"
                          onChange={onChange}
                          placeholder=""
                          error={Boolean(errors.vessel)}
                          aria-describedby="vessel"
                        />
                      )}
                    />
                    {errors.vessel && (
                      <FormHelperText sx={{ color: 'error.main', mb: 3 }} id="vessel">
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                  <FormControl fullWidth>
                    <Controller
                      name="vessel_imo"
                      control={control}
                      rules={{ required: false }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label="Vessel IMO"
                          onChange={onChange}
                          placeholder=""
                          error={Boolean(errors.vessel_imo)}
                          aria-describedby="vessel_imo"
                        />
                      )}
                    />
                    {errors.vessel_imo && (
                      <FormHelperText sx={{ color: 'error.main', mb: 3 }} id="vessel_imo">
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                  <FormControl fullWidth>
                    <Controller
                      name="longitude"
                      control={control}
                      rules={{ required: false }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label="Longitude"
                          onChange={onChange}
                          type="number"
                          placeholder=""
                          error={Boolean(errors.longitude)}
                          aria-describedby="longitude"
                        />
                      )}
                    />
                    {errors.longitude && (
                      <FormHelperText sx={{ color: 'error.main', mb: 3 }} id="longitude">
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                  <FormControl fullWidth>
                    <Controller
                      name="latitude"
                      control={control}
                      rules={{ required: false }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label="Latitude"
                          onChange={onChange}
                          type="number"
                          placeholder=""
                          error={Boolean(errors.latitude)}
                          aria-describedby="latitude"
                        />
                      )}
                    />
                    {errors.latitude && (
                      <FormHelperText sx={{ color: 'error.main', mb: 3 }} id="latitude">
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <LoadingButton variant="outlined" loading={isLoadingCreateMilestone} type="submit" size="medium" sx={{ mt: 3, m: 3 }}>
                  Save
                </LoadingButton>
              </Grid>
            </DatePickerWrapper>
          </form>
        </>
      </Grid>
    </Grid>
  )
}

export default MilestoneForm
