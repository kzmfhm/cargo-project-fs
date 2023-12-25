// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import LinearProgress from '@mui/material/LinearProgress'

import { useState } from 'react'
// ** Redux
import { useAppSelector } from 'src/hooks/useRedux'
import { DataGrid, GridRowParams } from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import { UpcomingShipmentType } from 'src/db/types/overview'

interface CellType {
  row: UpcomingShipmentType
}

const columns = [
  {
    flex: 0.1,
    field: 'customer_reference_number',
    minWidth: 150,
    headerName: 'Ref #',
    renderCell: ({ row }: CellType) => {
      const {
        customer_reference_number,
        item_description // Uncomment after UpcomingShipmentType update
      } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* {renderOrigin(params)} */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              noWrap
              variant="body2"
              sx={{ color: 'text.primary', fontWeight: 600 }}
            >
              {customer_reference_number}
            </Typography>
            <Typography noWrap variant="caption">
              {item_description}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    field: 'actual_arrival',
    minWidth: 100,
    headerName: 'Actual Arrival',
    renderCell: ({ row }: CellType) => {
      const { actual_arrival } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 100 }}>
              {actual_arrival}
            </Typography>
          </Box>
        </Box>
      )
    }
  }
]

const UpcomingShipments = () => {
  const router = useRouter()
  const { upcomingLoading, upcomingShipments, upcomingError } = useAppSelector(
    (state) => state.overview
  )
  const [pageSize, setPageSize] = useState(50)

  const handleEvent = (params: GridRowParams) => {
    const { id: uuid } = params.row
    router.push(`/shipments/${uuid}`)
  }
  return (
    <Card sx={{ mt: 4 }}>
      <CardHeader
        sx={{ pb: 0 }}
        title="Up Coming Shipments 🚀"
        subheader="Tracking Shipments Pending Arrival in My Country"
        subheaderTypographyProps={{ sx: { mt: '0 !important' } }}
      />
      <Grid container spacing={6} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          {upcomingLoading && <LinearProgress sx={{ height: '2px' }} />}
          {upcomingError && (
            <Box sx={{ p: 3 }}>
              <Typography variant="body2" color="error">
                {upcomingError}
              </Typography>
            </Box>
          )}

          {upcomingShipments && upcomingShipments.length > 0 ? (
            <DataGrid
              autoHeight
              pagination
              rows={upcomingShipments}
              columns={columns}
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[5, 10, 20, 50, 100]}
              onPageSizeChange={(size) => setPageSize(size)}
              onRowClick={handleEvent}
            />
          ) : (
            <Box sx={{ p: 3, ml: 3 }}>
              <Typography variant="body1" color="text.secondary">
                Oh, it seems you have no upcoming shipment. It's hard to see this space
                empty, awaiting for more.
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Card>
  )
}

export default UpcomingShipments
