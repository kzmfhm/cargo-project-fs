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
import { PriorityShipmentType } from 'src/db/types/overview'

import Zoom from '@mui/material/Zoom'
import SplitLongString from 'src/@core/components/split-long-body'
import CustomToolTip from 'src/@core/components/custom-tooltip'

interface CellType {
  row: PriorityShipmentType
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
  },
  {
    flex: 0.1,
    field: 'status',
    minWidth: 100,
    maxWidth: 300,
    headerName: 'status',
    renderCell: ({ row }: CellType) => {
      const { status } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'start' }}>
          <CustomToolTip TransitionComponent={Zoom} title={status} placement="top">
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ color: 'text.primary', fontWeight: 100, fontSize: 15 }}>
                <SplitLongString
                  text={status ? `${status.substring(0, 30)} ` : 'Blank'}
                  lineLength={35}
                />
              </Typography>
            </Box>
          </CustomToolTip>
        </Box>
      )
    }
  }
]

const PriorityShipments = () => {
  const router = useRouter()
  const { priorityLoading, priorityShipments, priorityError } = useAppSelector(
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
        title="Priority Shipments 🧿"
        subheader="Tracking and Managing Extremely Urgent Shipments"
        subheaderTypographyProps={{ sx: { mt: '0 !important' } }}
      />
      <Grid container spacing={6} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          {priorityLoading && <LinearProgress sx={{ height: '2px' }} />}
          {priorityError && (
            <Box sx={{ p: 3 }}>
              <Typography variant="body2" color="error">
                {priorityError}
              </Typography>
            </Box>
          )}

          {priorityShipments && priorityShipments.length > 0 ? (
            <DataGrid
              autoHeight
              pagination
              rows={priorityShipments}
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
                ❗ Looks like you do not have any urgent shipment. If we are wrong, call
                your RM right away to mark any of your upcoming shipment
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Card>
  )
}

export default PriorityShipments
