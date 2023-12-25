// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** MUI Components
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'

import { styled } from '@mui/material/styles'

// ** Configs
import themeConfig from 'src/configs/themeConfig'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { getTransportationJobPublic } from 'src/redux/slices/transportation'

import { useRouter } from 'next/router'
import { Card, Stack } from '@mui/material'

import BasicDetails from 'src/views/transportation/detail/BasicDetails'
import ImportantDates from 'src/views/transportation/detail/ImportantDates'
import DriverDetails from 'src/views/transportation/detail/DriverDetails'
import TransportationJobMap from 'src/views/transportation/map/'

import { ScrollableBox } from 'src/map-styles'

// ** Styled Components
const Logo = styled('img')(({ theme }) => ({
  zIndex: 1,
  maxHeight: '15%',
  maxWidth: '15%',
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 50,
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 50,
  },
}))

const TransportationDetailPublic = () => {
  // ** Hooks
  const router = useRouter()
  const { slug } = router.query

  const dispatch = useAppDispatch()
  const { isLoading, transportationJob, error } = useAppSelector((state) => state.transportation)

  useEffect(() => {
    if (slug) {
      dispatch(getTransportationJobPublic(slug as string))
    }
  }, [slug])

  if (isLoading) {
    return <LinearProgress sx={{ height: '2px' }} />
  }

  return (
    <Box className="" sx={{ backgroundColor: 'background.paper' }}>
      <Card
        sx={{
          height: '100%',
          width: '100%',
          p: 10,
        }}
      >
        <CardContent sx={{ p: (theme) => `${theme.spacing(10.5, 1, 8)} !important` }}>
          <Box sx={{ width: '100%' }}>
            <Box>
              <Stack direction="row" spacing={2}>
                <Logo alt="login-illustration" src={`/images/pages/logo.svg`} />
                <Typography
                  sx={{
                    mb: 1.5,
                    pt: 0,
                    fontWeight: 500,
                    fontSize: '2.625rem',
                    lineHeight: 1.385,
                    textAlign: 'center',
                  }}
                >
                  {`${themeConfig.templateName}`}
                </Typography>
              </Stack>
            </Box>
          </Box>
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
                  <Box sx={{ mb: 3, mt: 3 }}>
                    <ScrollableBox>
                      <DriverDetails />
                      <BasicDetails />
                      <ImportantDates />
                    </ScrollableBox>
                  </Box>
                </Grid>
              </Grid>
            )}
          </>
        </CardContent>
      </Card>
    </Box>
  )
}

TransportationDetailPublic.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

TransportationDetailPublic.guestGuard = true

export default TransportationDetailPublic
