import Grid from '@mui/material/Grid'

import TableShipmentImports from 'src/views/shipments/list/TableShipmentImports'

const ShipmentsImport = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TableShipmentImports />
      </Grid>
    </Grid>
  )
}

export default ShipmentsImport
