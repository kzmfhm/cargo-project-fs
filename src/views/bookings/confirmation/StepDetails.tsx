import React, { useEffect } from 'react'

// ** Next Import
import { Box, Grid, Button, Chip, Divider, CardContent, Typography } from '@mui/material'
// Next router
import { useRouter } from 'next/router'

import { useAppSelector, useAppDispatch } from 'src/hooks/useRedux'
import { setBookingFormRateTypes } from 'src/redux/slices/bookings'

import useMediaQuery from '@mui/material/useMediaQuery'
import { Theme, styled } from '@mui/material/styles'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'
import Stack from '@mui/material/Stack'
import TimelineDot from '@mui/lab/TimelineDot'
import { formatDatetime } from 'src/utils/dateformaters'
import { calculateDateDifference } from 'src/utils/calculateDateDifference'

import { Rate } from 'src/db/types/schedules'
import { BookingRateType } from 'src/db/types/bookings'
// ** Icon Imports
import Icon from 'src/@core/components/icon'

const Timeline = styled(MuiTimeline)<TimelineProps>({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none',
    },
  },
})

const StepDetails = ({ handleNext }: { handleNext: () => void }) => {
  // ** Hooks
  const dispatch = useAppDispatch()
  const { selectedSchedule: schedule, searchFormData } = useAppSelector((state) => state.schedules)
  const { userData } = useAppSelector((state) => state.accounts)

  const getAllRateTypes = () => {
    const rateTypes: BookingRateType[] = []

    if (schedule) {
      let hasRateTypes = schedule.ratetypes.length > 0

      if (hasRateTypes) {
        // Do Calculation with Rate Types
        for (let i = 0; i < schedule.ratetypes.length; i++) {
          let rateType = schedule.ratetypes[i]
          const bookingRateType = {
            description: rateType.description,
            category: rateType.category,
            UOM: rateType.UOM,
            equipment_type: rateType.equipment_type,
            amount: parseFloat(rateType.amount),
            quantity: parseInt(searchFormData?.quantity as string),
          }

          rateTypes.push(bookingRateType as unknown as BookingRateType)
        }
      } else {
        // Do Calculation with sealine first
        // Check if sealine has rates
        let sealinesRates = schedule.sealine.rates
        let routeRates = schedule.route.rates

        if (sealinesRates.length > 0) {
          for (let i = 0; i < sealinesRates.length; i++) {
            let rate = sealinesRates[i]

            // Check if rate.start_date is more than start_date and rate.end_date is less than end_date then use this rate
            if (rate.start_date && rate.end_date) {
              let rate_start_date = new Date(rate.start_date)
              let rate_end_date = new Date(rate.end_date)

              let schedule_etd = new Date(schedule.origin_departure_date_estimated)

              if (rate_start_date <= schedule_etd && rate_end_date >= schedule_etd) {
                // Rate is valid for this schedule and Sealine
                if (rate.link === schedule.service_code) {
                  for (let j = 0; j < rate.ratetypes.length; j++) {
                    let rateType = rate.ratetypes[j]
                    const bookingRateType = {
                      description: rateType.description,
                      category: rateType.category,
                      UOM: rateType.UOM,
                      equipment_type: rateType.equipment_type,
                      amount: parseFloat(rateType.amount),
                      quantity: parseInt(searchFormData?.quantity as string),
                    }

                    rateTypes.push(bookingRateType as unknown as BookingRateType)
                  }
                }
              }
            }
          }
        } else {
          // Do Calculation with route
          if (routeRates.length > 0) {
            for (let i = 0; i < routeRates.length; i++) {
              let rate = routeRates[i]

              if (rate.start_date && rate.end_date) {
                let rate_start_date = new Date(rate.start_date)
                let rate_end_date = new Date(rate.end_date)
                let schedule_etd = new Date(schedule.origin_departure_date_estimated)
                if (rate_start_date <= schedule_etd && rate_end_date >= schedule_etd) {
                  // Rates are valid for this schedule and Route
                  for (let j = 0; j < rate.ratetypes.length; j++) {
                    let rateType = rate.ratetypes[j]
                    const bookingRateType = {
                      description: rateType.description,
                      category: rateType.category,
                      UOM: rateType.UOM,
                      equipment_type: rateType.equipment_type,
                      amount: parseFloat(rateType.amount),
                      quantity: parseInt(searchFormData?.quantity as string),
                    }

                    rateTypes.push(bookingRateType as unknown as BookingRateType)
                  }
                }
              }
            }
          }
        }
      }
    }

    // Get userData from redux store
    const user = userData
    const partners = user?.partner || []

    if (partners.length > 0) {
      let firstPartnerGroup = partners[0].group

      let plateformFee = Number(firstPartnerGroup?.plateform_fee)
      let discount = Number(firstPartnerGroup?.discount)

      if (plateformFee) {
        const bookingRateType = {
          description: 'Platform Fee',
          category: 'PLATFORM',
          UOM: 'PERBL',
          equipment_type: 'ALL',
          amount: plateformFee,
          quantity: searchFormData?.quantity,
        }

        rateTypes.push(bookingRateType as unknown as BookingRateType)
      }

      if (discount) {
        const bookingRateType = {
          description: 'Discount',
          category: 'DISCOUNT',
          UOM: 'PERBL',
          equipment_type: 'ALL',
          amount: discount,
          quantity: Number(searchFormData?.quantity),
        }

        rateTypes.push(bookingRateType as unknown as BookingRateType)
      }
    }

    return rateTypes
  }

  const rateTypes = getAllRateTypes()

  const getFinalPrice = (rateTypes: BookingRateType[]) => {
    let totalPrice = schedule?.total_price || 0

    for (let i = 0; i < rateTypes.length; i++) {
      let rateType = rateTypes[i]

      if (rateType.category === 'PLATFORM') {
        totalPrice += parseFloat(rateType.amount)
      } else if (rateType.category === 'MARGIN') {
        totalPrice += parseFloat(rateType.amount)
      } else if (rateType.category === 'DISCOUNT') {
        totalPrice -= parseFloat(rateType.amount)
      }
    }

    return totalPrice
  }

  // ** Router
  const router = useRouter()

  const handleNextButton = () => {
    handleNext()
    dispatch(setBookingFormRateTypes(rateTypes))
  }

  useEffect(() => {
    if (!schedule) {
      router.push('/bookings/schedules')
    }
  }, [schedule])

  const breakpointMD = useMediaQuery((theme: Theme) => theme.breakpoints.between('sm', 'lg'))

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={8}>
        <Typography variant="h5" sx={{ mb: 4 }}>
          My Vessel Booking Schedule
        </Typography>
        <CardContent sx={{ p: (theme) => `${theme.spacing(3.25, 5.75, 6.25)} !important` }}>
          <Box
            sx={{
              gap: 2,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
              {schedule?.route_type ? (
                <Chip
                  label={schedule?.route_type}
                  // Color if not DIRECT
                  sx={{
                    backgroundColor: schedule?.route_type === 'Direct' ? '' : 'primary.main',
                    color: schedule?.route_type === 'Direct' ? '' : 'White',
                    p: (theme) => `${theme.spacing(0.5, 1.5)} !important`,
                  }}
                />
              ) : null}

              {schedule?.scac ? <Chip sx={{ mx: 2 }} label={schedule?.scac} /> : null}
            </Stack>

            {/* Color if its INDIRECT, with VIA Jebel Ali */}
            <Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
              {calculateDateDifference(
                schedule?.destination_arrival_date_estimated as string,
                schedule?.origin_departure_date_estimated as string,
              )}{' '}
              Days
            </Typography>
          </Box>
          <Timeline>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="secondary">
                  <Icon fontSize="1.25rem" icon="material-symbols:start" />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent
                sx={{
                  mt: 0,
                  mb: (theme) => `${theme.spacing(2)} !important`,
                }}
              >
                <Box
                  sx={{
                    mb: 0.5,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="h6" sx={{ mr: 2 }}>
                    {formatDatetime(schedule?.origin_departure_date_estimated)}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                    ETD
                  </Typography>
                </Box>
                <Typography variant="body2">
                  <span>{schedule?.route.origin.LOCODE} </span>
                  <br />
                  <span>
                    {schedule?.route.origin.city}, {schedule?.route.origin.country}
                  </span>
                </Typography>
                <Divider sx={{ borderStyle: 'dashed', my: (theme) => `${theme.spacing(3)} !important` }} />
                <Typography variant="body2" sx={{ display: 'flex', flexWrap: 'wrap', fontWeight: 500, color: 'text.primary' }}>
                  <Icon fontSize={20} icon="ri:ship-line" /> <span>{schedule?.vessel_name}</span>
                </Typography>
                <Typography variant="body2" sx={{ display: 'flex', flexWrap: 'wrap', fontWeight: 500, color: 'text.primary' }}>
                  <Icon fontSize={20} icon="material-symbols:route-outline" /> <span>{schedule?.scac}</span>
                </Typography>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  <Icon fontSize="1.25rem" icon="tabler:map-pin" />
                </TimelineDot>
              </TimelineSeparator>
              <TimelineContent sx={{ mt: 0, pb: 0 }}>
                <Box
                  sx={{
                    mb: 0.5,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="h6" sx={{ mr: 2 }}>
                    {formatDatetime(schedule?.destination_arrival_date_estimated)}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                    ETA
                  </Typography>
                </Box>
                <Typography variant="body2">
                  <span>{schedule?.route.destination.LOCODE} </span>
                  <br />
                  <span>
                    {schedule?.route.destination.city}, {schedule?.route.destination.country}
                  </span>
                </Typography>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </CardContent>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Box
          sx={{
            mb: 4,
            borderRadius: 1,
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <CardContent>
            <Typography sx={{ mb: 4 }} variant="h6">
              Price Details
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {rateTypes.map((rateType) => (
                <>
                  <Box
                    sx={{
                      mb: 2,
                      gap: 2,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    {searchFormData?.equipment_type === rateType.equipment_type && (
                      <>
                        <Typography>
                          Freight Charges
                          {rateType.UOM === 'PERBL' ? (
                            ' (Per Shipment)'
                          ) : (
                            <> {`(Per Container) ${searchFormData?.quantity} X ${rateType.equipment_type}`}</>
                          )}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{`$ ${
                          rateType.UOM === 'PERBL'
                            ? parseFloat(rateType.amount).toFixed(2)
                            : parseFloat(rateType.amount) * parseInt(searchFormData?.quantity)
                        }`}</Typography>
                      </>
                    )}

                    {/* Map plateform_fee */}

                    {rateType.category === 'PLATFORM' && (
                      <>
                        <Typography>Platform Fee</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{`$ ${parseFloat(rateType.amount).toFixed(2)}`}</Typography>
                      </>
                    )}

                    {/* Map discount */}
                    {rateType.category === 'DISCOUNT' && (
                      <>
                        <Typography>Discount</Typography>
                        <Typography sx={{ color: 'text.warning' }}>{`$ - ${parseFloat(rateType.amount).toFixed(2)}`}</Typography>
                      </>
                    )}
                  </Box>
                </>
              ))}
            </Box>
          </CardContent>
          <Divider sx={{ my: '0 !important' }} />
          <CardContent sx={{ py: (theme) => `${theme.spacing(3.5)} !important` }}>
            <Box
              sx={{
                gap: 2,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>Total</Typography>
              <Typography sx={{ fontWeight: 500 }}>${getFinalPrice(rateTypes)}</Typography>
            </Box>
          </CardContent>
        </Box>
        <Box
          sx={{
            display: 'flex',
            ...(breakpointMD ? { justifyContent: 'flex-end' } : {}),
          }}
        >
          <Button fullWidth={!breakpointMD} variant="contained" onClick={handleNextButton}>
            Book Now
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default StepDetails
