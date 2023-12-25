import { useEffect } from 'react'
import { useAuth } from 'src/hooks/useAuth'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Redux
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { createBooking } from 'src/redux/slices/bookings'
import { resetScedulesState } from 'src/redux/slices/schedules'

const TermsConditions = ({ handleNext }: { handleNext: () => void }) => {
  const dispatch = useAppDispatch()
  const auth = useAuth()
  let token: string = auth.user?.token as string

  const { isLoading, error, bookingFormData, booking, bookingFormRateTypes } = useAppSelector((state) => state.bookings)

  const handleNextButton = () => {
    if (bookingFormData === null) return
    // swap ratetypes in bookingFormData with ratetypes from bookingFormRateTypes
    dispatch(createBooking(token, bookingFormData)) // Get schedules from API
  }

  useEffect(() => {
    if (booking) {
      handleNext()
      dispatch(resetScedulesState())
    }
  }, [booking])

  // TermsConditions

  return (
    <Grid container spacing={6} style={{ textAlign: 'center' }}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Terms & Conditions
          </Typography>
          <Typography sx={{ mb: 4, color: 'text.secondary' }}>Target/Terms & Conditions</Typography>
          <Typography sx={{ color: 'text.secondary' }}>Your Use of This Website is Governed By These Terms & Conditions</Typography>
          <Typography sx={{ mb: 4, color: 'text.secondary' }}>
            Welcome to Target.com. These Terms & Conditions apply to the Target website located at www.target.com and all other sites,
            mobile sites, services, applications, platforms and tools where these Terms & Conditions appear or are linked (collectively, the
            "Site"). As used in these Terms & Conditions, "Target", "us" or "we" refers to Target Corporation and its subsidiaries and
            affiliates. Please read the following Terms & Conditions carefully as they affect your legal rights. These Terms & Conditions
            contain an arbitration agreement that requires the use of arbitration on an individual basis to resolve disputes rather than
            jury or any other court proceedings, or class actions of any kind. The arbitration agreement is set forth in the “Arbitration
            Agreement” section below.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {error && (
          <Box sx={{ pl: 5 }}>
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          </Box>
        )}

        <LoadingButton variant="contained" sx={{ mr: 3.5 }} onClick={handleNextButton} loading={isLoading}>
          Accept
        </LoadingButton>
      </Grid>
    </Grid>
  )
}

export default TermsConditions
