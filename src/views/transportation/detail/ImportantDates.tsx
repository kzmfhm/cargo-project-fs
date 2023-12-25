// ** MUI Imports
import { Card, CardContent, Divider, Typography, Stack } from '@mui/material'

// ** Redux
import { useAppSelector } from 'src/hooks/useRedux'
import { readableTimeStamp } from 'src/utils/readableTimeStamp'

const ImportantDates = () => {
  const { transportationJob } = useAppSelector((state) => state.transportation)
  if (transportationJob === null || Object.keys(transportationJob).length === 0) return null

  return (
    <Card sx={{ mt: 3 }}>
      <Typography variant="h6" component="h1" sx={{ pl: 4, pt: 3, pb: 3 }}>
        Important Dates 🗓️
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
            <Typography sx={{ fontWeight: 1000 }}> Start Time: </Typography>
            <Typography sx={{ color: 'text.secondary', mt: 2 }}>{readableTimeStamp(transportationJob.start_time)}</Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: 1000 }}> End Time: </Typography>
            <Typography sx={{ color: 'text.secondary', mt: 2 }}>
              {transportationJob.end_time ? readableTimeStamp(transportationJob.end_time) : 'N/A'}{' '}
            </Typography>
          </Stack>
        </CardContent>
      )}
    </Card>
  )
}

export default ImportantDates
