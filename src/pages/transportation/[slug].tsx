// ** React Imports
import { useEffect } from 'react'

// ** Redux
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { getTransportationJob } from 'src/redux/slices/transportation'

import { Grid, Box, LinearProgress, Typography } from '@mui/material'

import { useRouter } from 'next/router'

// ** Custom Components
import BasicDetails from 'src/views/transportation/detail/BasicDetails'
import LinkCard from 'src/views/transportation/detail/LinkCard'
import ImportantDates from 'src/views/transportation/detail/ImportantDates'
import DriverDetails from 'src/views/transportation/detail/DriverDetails'
import TransportationJobMap from 'src/views/transportation/map/'

import { useAuth } from 'src/hooks/useAuth'
import { ScrollableBox } from 'src/map-styles'

const TransportationJobDetailPrivate = () => {
  const dispatch = useAppDispatch()

  const { isLoading, transportationJob, error } = useAppSelector((state) => state.transportation)

  const router = useRouter()
  const { slug } = router.query
  const auth = useAuth()
  const token = auth.user?.token as string | ''

  // For loading the shipment
  useEffect(() => {
    if (slug) {
      dispatch(getTransportationJob(token, slug as string))
    }
  }, [slug])

  if (isLoading) {
    return <LinearProgress sx={{ height: '2px' }} />
  }

  return (
    <>
      {transportationJob === null || Object.keys(transportationJob).length === 0 ? (
        <Box sx={{ p: 3 }}>
          <Typography
            variant="body2"
            color="error"
            sx={{
              fontWeight: 300,
              textAlign: 'center',
            }}
          >
            {error ? error : " We couldn't find the transportation job you're looking for."}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={6}>
          <Grid item xs={12} md={8} xl={9} lg={9}>
            <Box sx={{ mb: 3 }}>
              <TransportationJobMap />
            </Box>
          </Grid>
          <Grid item xs={12} md={4} xl={3} lg={3}>
            <LinkCard />
            <Box sx={{ mb: 3, mt: 3 }}>
              <ScrollableBox>
                <DriverDetails />
                <BasicDetails />
                <ImportantDates />
              </ScrollableBox>
            </Box>
          </Grid>
          <Grid item xs={12} md={8} xl={9} lg={9}></Grid>
          <Grid item xs={12} md={4} xl={3} lg={3}></Grid>
        </Grid>
      )}
    </>
  )
}

export default TransportationJobDetailPrivate
