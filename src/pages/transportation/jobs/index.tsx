// ** MUI Imports
import Grid from '@mui/material/Grid'

import TableTransportationJobs from 'src/views/transportation/list/TableTransportationJobs'

const TransportationJobsList = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TableTransportationJobs />
      </Grid>
    </Grid>
  )
}

export default TransportationJobsList
