// ** MUI Imports
import Grid from '@mui/material/Grid'

import TableShipmentExports from 'src/views/shipments/list/TableShipmentExports'

const ShipmentsIExport = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TableShipmentExports />
      </Grid>
    </Grid>
  )
}

export default ShipmentsIExport
