// ** React Imports
import { ChangeEvent, useState } from 'react'

// ** Redux
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { setBookingFormData } from 'src/redux/slices/bookings'
import { BookingFormType, BookingPostRequestData } from 'src/db/types/bookings'

import { format } from 'date-fns'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MenuItem from '@mui/material/MenuItem'
import { useForm, Controller } from 'react-hook-form'
// ** Type Imports
import { CustomCheckboxIconsData, CustomCheckboxIconsProps } from 'src/@core/components/custom-checkbox/types'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
// ** Demo Components Imports
import CustomCheckboxIcons from 'src/@core/components/custom-checkbox/icons'

import CustomTextField from 'src/@core/components/mui/text-field'
// ** Custom Component Imports
import PickersComponent from 'src/@core/components/mui/picker-component'
// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Imports
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

interface IconType {
  icon: CustomCheckboxIconsProps['icon']
  iconProps: CustomCheckboxIconsProps['iconProps']
}

const data: CustomCheckboxIconsData[] = [
  {
    value: 'customer_clearance',
    title: 'Customer Clearance',
    isSelected: true,
    content: (
      <>
        <CustomChip size="small" skin="light" label="Free" color="success" sx={{ top: 12, right: 12, position: 'absolute' }} />
        <Typography variant="body2" sx={{ my: 'auto', textAlign: 'center' }}>
          Digital Clearance
        </Typography>
      </>
    ),
  },
  {
    value: 'transporation',
    title: 'Transportation',
    content: (
      <>
        <CustomChip label="$10" size="small" skin="light" color="secondary" sx={{ top: 12, right: 12, position: 'absolute' }} />
        <Typography variant="body2" sx={{ my: 'auto', textAlign: 'center' }}>
          With Live Tracking
        </Typography>
      </>
    ),
  },
  {
    value: 'insurance',
    title: 'Insurance',
    content: (
      <>
        <CustomChip label="$15" size="small" skin="light" color="secondary" sx={{ top: 12, right: 12, position: 'absolute' }} />
        <Typography variant="body2" sx={{ my: 'auto', textAlign: 'center' }}>
          Get your Goods covered
        </Typography>
      </>
    ),
  },
]

const icons: IconType[] = [
  {
    icon: 'emojione-monotone:customs',
    iconProps: { fontSize: '1.75rem', style: { marginBottom: 8 } },
  },
  {
    icon: 'mdi:truck-outline',
    iconProps: { fontSize: '1.75rem', style: { marginBottom: 8 } },
  },
  {
    icon: 'map:insurance-agency',
    iconProps: { fontSize: '1.75rem', style: { marginBottom: 8 } },
  },
]

const StepAddress = ({
  handleNext,
  popperPlacement,
}: {
  handleNext: () => void
  popperPlacement: ReactDatePickerProps['popperPlacement']
}) => {
  const initialSelected: string[] = data.filter((item) => item.isSelected).map((item) => item.value)

  const dispatch = useAppDispatch()

  const { bookingFormRateTypes } = useAppSelector((state) => state.bookings)
  const { selectedSchedule: schedule, searchFormData } = useAppSelector((state) => state.schedules)

  // ** State
  const [selected, setSelected] = useState<string[]>(initialSelected)
  const [date, setDate] = useState<Date | null>(new Date())
  const [emtpyLocationValue, setEmptyLocationValue] = useState<string>('0') // 0: Karachi, Pakistan, 1: Any

  const defaultValues = {
    clearing_agent: '',
    transporter: '',
    additional_information: '',
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    watch,
  } = useForm<BookingFormType>({ defaultValues })
  const formData = watch()

  const breakpointMD = useMediaQuery((theme: Theme) => theme.breakpoints.between('sm', 'lg'))

  const handleChange = (value: string) => {
    if (selected.includes(value)) {
      const updatedArr = selected.filter((item) => item !== value)
      setSelected(updatedArr)
    } else {
      setSelected([...selected, value])
    }
  }

  const handleNextButton = () => {
    if (formData.clearing_agent === '' || formData.transporter === '') {
      // Set error
      setError('clearing_agent', {
        type: 'manual',
        message: 'This field is required',
      })
      setError('transporter', {
        type: 'manual',
        message: 'This field is required',
      })
      return
    } else {
      handleNext()

      const formattedDate = date ? format(date, 'yyyy-MM-dd') : ''
      const equipmentType = searchFormData?.equipment_type
      // Filtered rate types where equipment type matches if category == is not PLATFORM, MARGIN, DISCOUNT

      const filteredRateTypes = bookingFormRateTypes.filter((rateType) => {
        if (rateType.category === 'PLATFORM' || rateType.category === 'MARGIN' || rateType.category === 'DISCOUNT') {
          return rateType
        } else {
          return rateType.equipment_type === equipmentType
        }
      })

      const booking = {
        schedule_id: schedule?.id,
        weight: searchFormData?.weight,
        clearing_agent: formData.clearing_agent,
        transporter: formData.transporter,
        empty_pickup_location: emtpyLocationValue === '0' ? 'Karachi, Pakistan' : 'Any',
        additional_information: formData.additional_information,
        empty_pickup_date: formattedDate,
        customer_clearance: selected.includes('customer_clearance'),
        transporation: selected.includes('transporation'),
        insurance: selected.includes('insurance'),
        rate_types: filteredRateTypes,
      }

      dispatch(setBookingFormData(booking as unknown as BookingPostRequestData))
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <Controller
            name="clearing_agent"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label="Clearing Agent"
                onChange={onChange}
                placeholder="Name of Clearing Agent"
                error={Boolean(errors.clearing_agent)}
                aria-describedby="clearing_agent"
              />
            )}
          />
          {errors.clearing_agent && (
            <FormHelperText sx={{ color: 'error.main', mb: 3 }} id="clearing_agent">
              This field is required
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <Controller
            name="transporter"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label="Transporter"
                onChange={onChange}
                placeholder="Transporter Name"
                error={Boolean(errors.clearing_agent)}
                aria-describedby="transporter"
              />
            )}
          />
          {errors.transporter && (
            <FormHelperText sx={{ color: 'error.main', mb: 3 }} id="transporter">
              This field is required
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextField
          select
          fullWidth
          id="select-cart-condition"
          label="Empty Pickup Location"
          defaultValue="0"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmptyLocationValue(e.target.value)}
          sx={{ mb: 5 }}
        >
          <MenuItem value="0">Karachi, Pakistan</MenuItem>
          <MenuItem value="1">Any</MenuItem>
        </CustomTextField>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <Controller
            name="additional_information"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                multiline
                minRows={4}
                value={value}
                label="Additional Information"
                onChange={onChange}
                sx={{ '&, & .MuiInputBase-root': { height: '100%' } }}
                placeholder="Example: Pickup to be made at 5 AM in morning only"
                aria-describedby="additional_information"
              />
            )}
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <DatePickerWrapper style={{ width: '100%', margin: 0, padding: 0 }}>
          <DatePicker
            selected={date}
            id="empty_return_date"
            popperPlacement={popperPlacement}
            onChange={(date: Date) => setDate(date)}
            placeholderText="Click to select a date"
            dateFormat="dd/MM/yyyy"
            customInput={<PickersComponent label="Empty Return Date" />}
          />
        </DatePickerWrapper>
      </Grid>

      <Grid item xs={12}>
        <Typography sx={{ mt: 6, mb: 4, fontWeight: 500 }}>Choose Extra Services</Typography>
        <Grid container spacing={4}>
          {data.map((item, index) => (
            <CustomCheckboxIcons
              key={index}
              data={data[index]}
              selected={selected}
              icon={icons[index].icon}
              handleChange={handleChange}
              name="custom-checkbox-icons"
              gridProps={{ sm: 4, xs: 12 }}
              iconProps={icons[index].iconProps}
            />
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Box sx={{ display: 'flex', ...(breakpointMD ? { justifyContent: 'flex-end' } : {}) }}>
          <Button fullWidth={!breakpointMD} variant="contained" onClick={handleNextButton}>
            Next
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default StepAddress
