import { Box, Card, Grid, Typography, LinearProgress, CardContent } from '@mui/material'

// ** Redux
import { useAppSelector } from 'src/hooks/useRedux'

import { Icon } from '@iconify/react'

const Map = () => {
  const { isLoading, shipment, error } = useAppSelector((state) => state.shipments)
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          {isLoading && <LinearProgress sx={{ height: '2px' }} />}
          {error && (
            <Box sx={{ p: 3 }}>
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            </Box>
          )}
          <Typography
            variant="h6"
            component="h1"
            sx={{
              pl: 4,
              pt: 3,
              mb: 3,
              flexDirection: ['column', 'row'],
              alignItems: ['flex-start', 'center']
            }}
          >
            Map <Icon icon="mdi:map-marker-multiple" />
          </Typography>

          {shipment && (
            <CardContent sx={{ p: 0 }}>
              <iframe
                src={`https://shipsgo.com/iframe/where-is-my-container/${shipment.container_number}`}
                id="IframeShipsgoLiveMap"
                style={{ minHeight: 530, height: '100%', width: '100%' }}
              ></iframe>
            </CardContent>
          )}
        </Card>
      </Grid>
    </Grid>
  )
}

export default Map
