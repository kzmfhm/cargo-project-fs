// ** MUI Imports
import { Box, Card, CardContent, Typography, LinearProgress, Divider, Stack } from '@mui/material'

// ** Redux
import { useAppSelector } from 'src/hooks/useRedux'

const BasicDetails = () => {
  const { transportationJob } = useAppSelector((state) => state.transportation)
  console.log(transportationJob)

  if (transportationJob === null || Object.keys(transportationJob).length === 0) return null

  return (
    <Box sx={{ mt: 3, mb: 3 }}>
      <Card>
        <Typography variant="h6" component="h1" sx={{ pl: 4, pt: 3, pb: 3 }}>
          Basic Details 🌐
        </Typography>

        <Divider sx={{ width: '100%' }} />
        {transportationJob && (
          <CardContent sx={{ pb: 1 }}>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Typography sx={{ mr: 2, fontWeight: 1000 }}>Item:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{transportationJob.item_description || 'N/A'}</Typography>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Typography sx={{ mr: 2, fontWeight: 1000 }} textAlign="right">
                Status:
              </Typography>
              <Typography sx={{ color: 'text.secondary' }} textAlign="right">
                {transportationJob.status}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Typography sx={{ mr: 2, fontWeight: 1000 }}>MBL:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{transportationJob.mbl || 'N/A'}</Typography>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Typography sx={{ mr: 2, fontWeight: 1000 }} textAlign="right">
                Ref:
              </Typography>
              <Typography sx={{ color: 'text.secondary' }} textAlign="right">
                {transportationJob.customer_reference_number || 'N/A'}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Typography sx={{ mr: 2, fontWeight: 1000 }}>Container No:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{transportationJob.container || 'N/A'}</Typography>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Typography sx={{ mr: 2, fontWeight: 1000 }}>Reference No:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{transportationJob.customer_reference_number || 'N/A'}</Typography>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Typography sx={{ mr: 2, fontWeight: 1000 }}>Visibility:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{transportationJob.visibility}</Typography>
            </Stack>
          </CardContent>
        )}
      </Card>
    </Box>
  )
}

export default BasicDetails
