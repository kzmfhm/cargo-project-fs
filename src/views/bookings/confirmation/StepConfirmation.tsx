// ** Next Import
import Link from 'next/link'

import { format } from 'date-fns'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Theme } from '@mui/material/styles'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
// ** Redux
import { useAppSelector } from 'src/hooks/useRedux'

import { useAuth } from 'src/hooks/useAuth'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Button } from '@mui/material'

const StepConfirmation = () => {
  const { booking } = useAppSelector((state) => state.bookings)
  const auth = useAuth()
  const breakpointMD = useMediaQuery((theme: Theme) => theme.breakpoints.between('sm', 'lg'))

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h4" sx={{ mb: 4 }}>
            Thank You! 😇
          </Typography>
          <Typography sx={{ mb: 4, color: 'text.secondary' }}>
            Your order{' '}
            <Box
              href="/bookings/list"
              component={Link}
              onClick={(e) => e.preventDefault()}
              sx={{ color: 'primary.main', textDecoration: 'none' }}
            >
              {booking?.order_number}
            </Box>{' '}
            has been placed!
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            We sent an email to{' '}
            <Box href="/" component={Link} onClick={(e) => e.preventDefault()} sx={{ color: 'primary.main', textDecoration: 'none' }}>
              {auth.user?.email}
            </Box>{' '}
            with your order confirmation and receipt.
          </Typography>
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
      </Grid>

      <Grid item xs={12} lg={4}>
        {/* Make buttin cetnered */}
        <Box
          sx={{
            display: 'flex',
            ...(breakpointMD ? { justifyContent: 'flex-end' } : {}),
          }}
        >
          <Button fullWidth={!breakpointMD} variant="contained" href="/bookings/list">
            View Bookings
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default StepConfirmation
