// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const TransportJobs = () => {
  return (
    <Card sx={{ minHeight: '230px', maxHeight: '300px' }}>
      <CardContent>
        <Box
          sx={{
            gap: 2,
            mb: 6,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <Typography variant="h5">Transportation Jobs</Typography>
            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              X#X
            </Typography>
          </div>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TransportJobs
