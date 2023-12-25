// ** React Imports
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
// ** Redux
import { useAppSelector } from 'src/hooks/useRedux'
import { Box, Grid, Chip, Typography, Card } from '@mui/material'
import { useRouter } from 'next/router'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Theme } from '@mui/material/styles'
import BackButton from 'src/@core/components/back-button'
import Icon from 'src/@core/components/icon'

import { Booking } from 'src/db/types/bookings'

const ShipmentDetailPrivate = () => {
  const bookings = useAppSelector((state) => state.bookings.bookings)
  const [booking, setBooking] = useState<Booking | null>(null)
  const breakpointMD = useMediaQuery((theme: Theme) => theme.breakpoints.between('sm', 'lg'))

  const router = useRouter()
  const { order_number } = router.query

  // For loading the booking
  useEffect(() => {
    if (order_number) {
      const booking = bookings.find((b) => b.order_number === order_number)
      setBooking(booking as Booking)
    }
  }, [order_number])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={4}>
        {/* Make buttin cetnered */}
        <Box
          sx={{
            display: 'flex',
            ...(breakpointMD ? { justifyContent: 'flex-end' } : {}),
          }}
        >
          <BackButton />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Card sx={{ p: 3 }}>
          <Box
            sx={{
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Chip label={booking?.status} color="primary" sx={{ mb: 4, mt: 4 }} />

            <Typography sx={{ mb: 4, color: 'text.secondary' }}>
              Order <Box sx={{ color: 'primary.main', textDecoration: 'none' }}>{booking?.order_number}</Box> is {booking?.status}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>We sent an email to with your order confirmation and receipt.</Typography>
            <Typography sx={{ mb: 4, color: 'text.secondary' }}>
              If the email hasn't arrived within two minutes, please check your spam folder to see if the email was routed there.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                '& svg': { color: 'text.secondary' },
              }}
            >
              <Icon icon="tabler:clock" fontSize={20} />
              <Typography sx={{ ml: 1.5, color: 'text.secondary' }}>
                <Typography component="span" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  Time placed: &nbsp; {booking ? format(new Date(booking?.created_at), 'dd MMM yyyy, HH:mm') : 'N/A'}
                </Typography>{' '}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ShipmentDetailPrivate
