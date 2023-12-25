import { Grid, CardContent } from '@mui/material'

// ** Redux
import { useAppSelector } from 'src/hooks/useRedux'

const MapShared = () => {
  const { shipmentShared: shipment } = useAppSelector((state) => state.shipments)
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        {shipment && (
          <CardContent>
            <iframe
              src={`https://shipsgo.com/iframe/where-is-my-container/${shipment.container_number}`}
              id="IframeShipsgoLiveMap"
              style={{ minHeight: 750, height: '100%', width: '100%' }}
            ></iframe>
          </CardContent>
        )}
      </Grid>
    </Grid>
  )
}

export default MapShared
