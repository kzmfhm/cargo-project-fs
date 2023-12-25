// ** MUI Imports
import { Card, CardContent, Divider, Typography, Stack, Box, Grid } from '@mui/material'

// ** Redux
import { useAppSelector } from 'src/hooks/useRedux'
import Avatar from '@mui/material/Avatar'

const DriverDetails = () => {
  const { transportationJob } = useAppSelector((state) => state.transportation)
  if (transportationJob === null || Object.keys(transportationJob).length === 0) return null
  return (
    <Box sx={{ mt: 3, mb: 3 }}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <Typography variant="h6" component="h1" sx={{ pl: 4, pt: 3, pb: 3 }}>
              Driver 👨🏻‍✈️
            </Typography>
            <Divider sx={{ width: '100%' }} />
            {transportationJob && (
              <CardContent
                sx={{
                  display: 'flex',
                  alignItems: 'left',
                  flexDirection: 'column',
                }}
              >
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ mr: 2 }}>
                        <Avatar
                          alt={transportationJob.driver}
                          sx={{ width: 40, height: 40 }}
                          src={transportationJob.driver_avatar || '/images/avatars/1.png'}
                        />
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 900,
                          }}
                        >
                          {transportationJob.driver}
                        </Typography>
                        <Typography variant="body2">{transportationJob.vehicle}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DriverDetails
