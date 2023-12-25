// ** MUI Imports
import { Card, CardContent, Divider, Typography, Stack } from '@mui/material'

// ** Redux
import { useAppSelector } from 'src/hooks/useRedux'
import { Icon } from '@iconify/react'

const ImportantDates = () => {
  const { shipment } = useAppSelector((state) => state.shipments)
  return (
    <Card sx={{ mt: 3 }}>
      <Typography variant="h6" component="h1" sx={{ pl: 4, pt: 3 }}>
        Important Dates <Icon icon="fluent:important-24-filled" />
      </Typography>
      {shipment && (
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'left',
            flexDirection: 'column'
          }}
        >
          <Divider sx={{ width: '100%' }} />

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: 1000 }}> Start Date: </Typography>
            <Typography sx={{ color: 'text.secondary', mt: 2 }}>
              {shipment.start_date || 'N/A'}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: 1000 }}> Actual Departure: </Typography>
            <Typography sx={{ color: 'text.secondary', mt: 2 }}>
              {shipment.actual_departure || 'N/A'}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: 1000 }}> Actual Arrival: </Typography>
            <Typography sx={{ color: 'text.secondary', mt: 2 }}>
              {shipment.actual_arrival || 'N/A'}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: 1000 }}> First ETA: </Typography>
            <Typography sx={{ color: 'text.secondary', mt: 2 }}>
              {shipment.first_eta || 'N/A'}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: 1000 }}> Gate Out Date: </Typography>
            <Typography sx={{ color: 'text.secondary', mt: 2 }}>
              {shipment.gate_out_date || 'N/A'}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: 1000 }}> Empty Return Date: </Typography>
            <Typography sx={{ color: 'text.secondary', mt: 2 }}>
              {shipment.empty_return_date || 'N/A'}
            </Typography>
          </Stack>
        </CardContent>
      )}
    </Card>
  )
}

export default ImportantDates
