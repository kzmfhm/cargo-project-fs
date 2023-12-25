// ** React Imports
import { useState, useMemo } from 'react'

import { useAuth } from 'src/hooks/useAuth'
import {
  getSchedules,
  setSearchFormData,
  refillScedules,
  setOriginCharges,
  setDestinationCharges,
  setFreightCharges,
} from 'src/redux/slices/schedules'

import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { resetBookingState } from 'src/redux/slices/bookings'
// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import MenuItem from '@mui/material/MenuItem'
import LinearProgress from '@mui/material/LinearProgress'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import LoadingButton from '@mui/lab/LoadingButton'
import Checkbox from '@mui/material/Checkbox'

import { useForm, Controller } from 'react-hook-form'

import { SearchFormData } from 'src/db/types/schedules'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'

import { format } from 'date-fns'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component Imports
import PickersComponent from 'src/@core/components/mui/picker-component'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Imports
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

// ** Types
import { DateType } from 'src/db/types/others'
import { Divider, Typography } from '@mui/material'

interface Origin {
  id: number
  title: string
}

interface Destination {
  id: number
  title: string
}

const SearchForm = ({ popperPlacement }: { popperPlacement: ReactDatePickerProps['popperPlacement'] }) => {
  const dispatch = useAppDispatch()
  const auth = useAuth()
  const token: string = auth.user?.token as string
  const [originError, setOriginError] = useState('')
  const [destinationError, setDestinationError] = useState('')
  const [weightError, setWeightError] = useState('')
  const { isLoading, routes, isSchedulesLoading, schedules, filteredSchedules, originCharges, destinationCharges, freightCharges } =
    useAppSelector((state) => state.schedules)
  const [selectedOrigin, setSelectedOrigin] = useState<Origin | null>(null)
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)

  const uniqueOriginIds = new Set<number>()
  const origins: Origin[] = routes.reduce((acc: Origin[], route) => {
    if (!uniqueOriginIds.has(route.origin.id)) {
      uniqueOriginIds.add(route.origin.id)

      acc.push({
        id: route.origin.id,
        title: `${route.origin.city}, ${route.origin.country}`,
      })
    }

    return acc
  }, [])

  const getFilteredDestinations = () => {
    if (selectedOrigin) {
      return routes
        .filter((route) => route.origin.id === selectedOrigin.id)
        .map((route) => ({
          id: route.destination.id,
          title: `${route.destination.city}, ${route.destination.country}`,
        }))
    } else {
      return []
    }
  }

  const defaultValues = {
    type: '',
    origin_id: null,
    destination_id: null,
    equipment_type: '20',
    quantity: '1',
    weight: 1,
    commodity: 'FAK,CONSOLIDATED/MIXED LOADS OF ITEMS',
    vessel_available_date: '',
  }

  const [value, setValue] = useState<string>('1')

  const handleChange = (newValue: string) => {
    setValue(newValue)
  }

  const [date, setDate] = useState<DateType>(new Date())

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SearchFormData>({ defaultValues })

  const onSubmit = (data: SearchFormData) => {
    const origin_id = selectedOrigin?.id
    const destination_id = selectedDestination?.id
    const vessel_available_date_str = format(date as Date, 'dd-MM-yyyy') as string

    let hasError = false

    if (!origin_id) {
      setOriginError('Please select origin')
      hasError = true
    } else {
      setOriginError('')
    }

    if (!destination_id) {
      setDestinationError('Please select destination')
      hasError = true
    } else {
      setDestinationError('')
    }

    if (!data.weight) {
      setWeightError('Please mention weight')
      hasError = true
    } else if (data.weight <= 0) {
      setWeightError('Weight should be greater than or equal to 1')
      hasError = true
    } else {
      setWeightError('')
    }

    if (hasError) {
      return
    }

    const queryParams = []

    if (origin_id) {
      queryParams.push(`origin_id=${origin_id}`)
    }

    if (destination_id) {
      queryParams.push(`destination_id=${destination_id}`)
    }

    if (vessel_available_date_str) {
      queryParams.push(`vessel_available_date=${vessel_available_date_str}`)
    }

    const query = queryParams.join('&')
    dispatch(getSchedules(token, query))
    dispatch(setSearchFormData(data))

    console.log('data', data, 'query', query)
  }

  const equipmentType = watch('equipment_type')
  const quantity = watch('quantity')

  useMemo(() => {
    const data = watch()
    dispatch(setSearchFormData(data))
    dispatch(refillScedules(schedules))
  }, [equipmentType, quantity])

  useMemo(() => {
    dispatch(resetBookingState())
  }, [])

  return (
    <Card>
      {isLoading && <LinearProgress sx={{ height: '2px' }} />}
      <TabContext value={value}>
        <TabList
          onChange={(_, newValue) => handleChange(newValue)}
          aria-label="card navigation example"
          sx={{ '& .MuiTab-root': { py: 3.5 } }}
        >
          <Tab value="1" label="FCL" icon={<Icon icon="lucide:container" />} />
          <Tab disabled value="2" label="LCL" icon={<Icon icon="material-symbols:pallet-outline" />} />
          <Tab disabled value="3" label="AIR" icon={<Icon icon="pepicons-print:airplane" />} />
          <Tab disabled value="4" label="LAND" icon={<Icon icon="mdi:truck-cargo-container" />} />
        </TabList>
        <CardContent>
          <TabPanel value="1" sx={{ p: 0 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <DatePickerWrapper>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <CustomAutocomplete
                      fullWidth
                      options={origins}
                      id="origin"
                      getOptionLabel={(option) => option.title || ''}
                      value={selectedOrigin}
                      onChange={(_, newValue) => {
                        setSelectedOrigin(newValue)
                        setSelectedDestination(null)
                        setOriginError('') // Clear the origin error when the field is changed
                      }}
                      renderInput={(params) => (
                        <CustomTextField {...params} label="Origin" placeholder="Karachi, Pakistan" error={!!originError} />
                      )}
                    />
                    <FormHelperText sx={{ color: 'error.main' }}>{originError}</FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomAutocomplete
                      fullWidth
                      options={getFilteredDestinations()}
                      id="destination"
                      getOptionLabel={(option) => option.title || ''}
                      value={selectedDestination}
                      onChange={(_, newValue) => {
                        setSelectedDestination(newValue)
                        setDestinationError('') // Clear the destination error when the field is changed
                      }}
                      renderInput={(params) => (
                        <CustomTextField {...params} label="Destination" placeholder="Shanghai, China" error={!!destinationError} />
                      )}
                    />
                    <FormHelperText sx={{ color: 'error.main' }}>{destinationError}</FormHelperText>
                  </Grid>
                  <Grid item xs={6} md={1.5}>
                    <FormControl fullWidth>
                      <Controller
                        name="equipment_type"
                        control={control}
                        render={({ field }) => (
                          <CustomTextField select label="Equipment Type" {...field}>
                            <MenuItem value={'20'}>DRY 20</MenuItem>
                            <MenuItem value={'40'}>DRY 40</MenuItem>
                            <MenuItem value={'40H'}>DRY 40H</MenuItem>
                          </CustomTextField>
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={1}>
                    <FormControl fullWidth>
                      <Controller
                        name="quantity"
                        control={control}
                        rules={{
                          required: true,
                          validate: (value) => (parseInt(value, 10) > 0 && /^[0-9]+$/.test(value)) || 'Invalid quantity',
                        }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            value={value}
                            label="Quantity"
                            fullWidth
                            onChange={(e) => {
                              // Ensure the entered value is a positive integer or an empty string
                              const inputValue = e.target.value
                              if (/^\d*$/.test(inputValue)) {
                                onChange(inputValue)
                              }
                            }}
                            placeholder=""
                            type="number"
                            error={Boolean(errors.quantity)}
                          />
                        )}
                      />
                      {errors.quantity && <FormHelperText sx={{ color: 'error.main' }}>{errors.quantity.message}</FormHelperText>}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={1.5}>
                    <FormControl fullWidth>
                      <Controller
                        name="weight"
                        control={control}
                        rules={{ required: false }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            value={value}
                            label="Cargo Weight KGs"
                            fullWidth
                            onChange={(e) => {
                              // Ensure the value is not negative
                              const newValue = Math.max(parseFloat(e.target.value), 0)
                              onChange(newValue)
                              setWeightError('')
                            }}
                            placeholder=""
                            type="number"
                            error={!!errors.weight || !!weightError} // Include weightError in error check
                          />
                        )}
                      />
                      <FormHelperText sx={{ color: 'error.main' }}>{weightError}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <DatePicker
                      selected={date}
                      id="vessel_available_date"
                      popperPlacement={popperPlacement}
                      onChange={(date: Date) => setDate(date)}
                      placeholderText="Click to select a date"
                      dateFormat="dd/MM/yyyy"
                      customInput={<PickersComponent label="Vessel Available Date" />}
                      minDate={new Date()}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomTextField
                      disabled
                      fullWidth
                      label="Commodity"
                      id="commodity"
                      defaultValue="FAK,CONSOLIDATED/MIXED LOADS OF ITEMS"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon fontSize="1.25rem" icon="iconoir:commodity" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Divider
                    sx={{
                      mt: 4,
                      mb: 4,
                      color: 'primary.main',
                    }}
                  />
                  <p id="originCharges">
                    <Checkbox
                      checked={originCharges}
                      onChange={() => dispatch(setOriginCharges(!originCharges))}
                      value="originCharges"
                      size="small"
                      sx={{
                        color: 'primary.main',
                        ml: 3,
                      }}
                    />
                    Origin Charges
                  </p>
                  <p id="destinationCharges">
                    <Checkbox
                      checked={destinationCharges}
                      onChange={() => dispatch(setDestinationCharges(!destinationCharges))}
                      value="destinationCharges"
                      size="small"
                      sx={{
                        color: 'primary.main',
                        ml: 3,
                      }}
                    />
                    Destination Charges
                  </p>
                  <p id="freightCharges">
                    <Checkbox
                      checked={freightCharges}
                      onChange={() => dispatch(setFreightCharges(!freightCharges))}
                      value="freightCharges"
                      size="small"
                      sx={{
                        color: 'primary.main',
                        ml: 3,
                      }}
                    />
                    Freight Charges
                  </p>

                  <Grid item xs={11}>
                    <LoadingButton type="submit" variant="contained" loading={isSchedulesLoading}>
                      Search
                    </LoadingButton>
                  </Grid>
                  <Grid item xs={1}>
                    <FormHelperText>
                      <Typography variant="body2" sx={{ color: 'primary', fontSize: 16, fontWeight: 600 }}>
                        {filteredSchedules.length > 0 ? filteredSchedules.length : schedules.length} Results
                      </Typography>
                    </FormHelperText>
                  </Grid>
                </Grid>
              </DatePickerWrapper>
            </form>
          </TabPanel>
        </CardContent>
      </TabContext>
    </Card>
  )
}

export default SearchForm
