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
import { getSharedShipment } from 'src/redux/slices/shipments'
import { useRouter } from 'next/router'
import { Card, Divider, Stack } from '@mui/material'

import BasicDetailsShared from 'src/views/shipments/public/BasicDetailsShared'
import PartnersShared from 'src/views/shipments/public/PartnersShared'
import ImportantDatesShared from 'src/views/shipments/public/ImportantDatesShared'
import TimelineShared from 'src/views/shipments/public/TimelineShared'
import ContainersShared from 'src/views/shipments/public/ContainersShared'
import MapShared from 'src/views/shipments/public/MapShared'

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

const ShipmentDetailPublic = () => {
  // ** Hooks
  const router = useRouter()
  const { slug } = router.query

  const dispatch = useAppDispatch()
  const { isLoading, shipmentShared: shipment, error } = useAppSelector((state) => state.shipments)

  useEffect(() => {
    if (slug) {
      dispatch(getSharedShipment(slug as string))
    }
  }, [slug])

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
            <Box sx={{ my: 6 }}>
              <Stack direction="row" spacing={2}>
                <Logo alt="login-illustration" src={`/images/pages/logo.svg`} />
                <Typography
                  sx={{
                    mb: 1.5,
                    pt: 3,
                    fontWeight: 500,
                    fontSize: '2.625rem',
                    lineHeight: 1.385,
                    textAlign: 'center',
                  }}
                >
                  {`${themeConfig.templateName}`}
                </Typography>
              </Stack>
              <Divider />
              {isLoading && <LinearProgress sx={{ height: '2px' }} />}
              {error && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="body2" color="error">
                    {error}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          <Grid container spacing={6}>
            <Grid item md={8} lg={8} xl={8}>
              {shipment && <BasicDetailsShared />}
            </Grid>
            <Grid item md={4} lg={4} xl={4}>
              {shipment && <PartnersShared />}
              {shipment && <ImportantDatesShared />}
            </Grid>
            <Grid item md={8} lg={8} xl={8}>
              {shipment && <TimelineShared />}
              {shipment && <ContainersShared />}
              {shipment && <MapShared />}
            </Grid>
            <Grid item md={4} lg={4} xl={4}></Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

ShipmentDetailPublic.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

ShipmentDetailPublic.guestGuard = true

export default ShipmentDetailPublic
