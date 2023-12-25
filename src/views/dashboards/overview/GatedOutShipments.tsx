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
import { GatedOutShipmentType } from 'src/db/types/overview'

interface CellType {
  row: GatedOutShipmentType
}

const columns = [
  {
    flex: 0.1,
    field: 'ref',
    minWidth: 150,
    headerName: 'PO #',
    renderCell: ({ row }: CellType) => {
      const {
        ref,
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
              {ref}
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
    field: 'daysInClearance',
    minWidth: 100,
    headerName: 'Processing Days',
    renderCell: ({ row }: CellType) => {
      const { daysInClearance } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 100 }}>
              {daysInClearance}
            </Typography>
          </Box>
        </Box>
      )
    }
  }
]

const GatedOutShipments = () => {
  const router = useRouter()
  const { gatedOutLoading, gatedOutShipments, gatedOutError } = useAppSelector(
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
        title="Recently Gated Out Shipments 🚐"
        subheader="In last 15 days"
        subheaderTypographyProps={{ sx: { mt: '0 !important' } }}
      />
      <Grid container spacing={6} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          {gatedOutLoading && <LinearProgress sx={{ height: '2px' }} />}
          {gatedOutError && (
            <Box sx={{ p: 3 }}>
              <Typography variant="body2" color="error">
                {gatedOutError}
              </Typography>
            </Box>
          )}

          {gatedOutShipments && gatedOutShipments.length > 0 ? (
            <DataGrid
              autoHeight
              pagination
              rows={gatedOutShipments}
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
                No record found
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Card>
  )
}

export default GatedOutShipments
