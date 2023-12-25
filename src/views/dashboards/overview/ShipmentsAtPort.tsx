import { useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import LinearProgress from '@mui/material/LinearProgress'
import CustomChip from 'src/@core/components/mui/chip'
import { useRouter } from 'next/router'
import { useAppSelector } from 'src/hooks/useRedux'
import { DataGrid, GridRowParams } from '@mui/x-data-grid'

import { AtPortShipmentType } from 'src/db/types/overview'

interface CellType {
  row: AtPortShipmentType
}

const columns = [
  {
    flex: 0.1,
    field: 'ref',
    minWidth: 180,
    maxWidth: 180,
    headerName: 'Ref #',
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
    field: 'demurrageDays',
    minWidth: 100,
    headerName: 'DEM days',
    renderCell: ({ row }: CellType) => {
      const { demurrageDays } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              noWrap
              color={(demurrageDays < 0 && 'error') || 'default'}
              sx={{ fontWeight: 100 }}
            >
              {demurrageDays}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    field: 'detentionDays',
    minWidth: 100,
    headerName: 'DET Days',
    renderCell: ({ row }: CellType) => {
      const { detentionDays } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              noWrap
              color={(detentionDays < 0 && 'error') || 'default'}
              sx={{ fontWeight: 100 }}
            >
              {detentionDays}
            </Typography>
          </Box>
        </Box>
      )
    }
  },

  {
    flex: 0.1,
    field: 'status',
    minWidth: 300,
    headerName: 'status',
    renderCell: ({ row }: CellType) => {
      const { status } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CustomChip
              variant="outlined"
              label={status || 'Blank'}
              color={status ? 'primary' : 'error'}
            />
          </Box>
        </Box>
      )
    }
  }
]

const ShipmentsAtPort = () => {
  const router = useRouter()
  const { atPortLoading, atPortShipments, atPortError } = useAppSelector(
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
        title="Shipments at Port  🚩"
        subheader="Days Left for Demurrage and Detention"
        subheaderTypographyProps={{ sx: { mt: '0 !important' } }}
      />
      <Grid container spacing={6} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          {atPortLoading && <LinearProgress sx={{ height: '2px' }} />}
          {atPortError && (
            <Box sx={{ p: 3 }}>
              <Typography variant="body2" color="error">
                {atPortError}
              </Typography>
            </Box>
          )}

          {atPortShipments && atPortShipments.length > 0 ? (
            <DataGrid
              autoHeight
              pagination
              rows={atPortShipments}
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
                No Shipments At Port
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Card>
  )
}

export default ShipmentsAtPort
