// ** MUI Imports
import { Box, Card, Grid, Typography, LinearProgress } from '@mui/material'
import { useState } from 'react'
// ** Redux
import { useAppSelector } from 'src/hooks/useRedux'
import { DataGrid } from '@mui/x-data-grid'

import { Container } from 'src/db/types/shipments'
import { Icon } from '@iconify/react'

interface CellType {
  row: Container
}

const columns = [
  {
    flex: 0.1,
    field: 'container_code',
    minWidth: 220,
    headerName: 'Container Code',
    renderCell: ({ row }: CellType) => {
      const { container_code } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 700 }}>
              {container_code}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    field: 'container_teu',
    minWidth: 220,
    headerName: 'Container TEU',
    renderCell: ({ row }: CellType) => {
      const { container_teu } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 100 }}>
              {container_teu}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    field: 'bl_gateout_date',
    minWidth: 220,
    headerName: 'BL Gateout Date',
    renderCell: ({ row }: CellType) => {
      const { bl_gateout_date } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 100 }}>
              {bl_gateout_date}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    field: 'bl_emptyreturn_date',
    minWidth: 220,
    headerName: 'BL EMPTY RETURN DATE',
    renderCell: ({ row }: CellType) => {
      const { bl_emptyreturn_date } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 100 }}>
              {bl_emptyreturn_date}
            </Typography>
          </Box>
        </Box>
      )
    }
  }
]

const Containers = () => {
  const { isLoading, shipment, error } = useAppSelector((state) => state.shipments)

  const [pageSize, setPageSize] = useState(50)

  return (
    <Grid container spacing={6} sx={{ mt: 1 }}>
      <Grid item xs={12}>
        <Card>
          {isLoading && <LinearProgress sx={{ height: '2px' }} />}
          {error && (
            <Box sx={{ p: 3 }}>
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            </Box>
          )}
          <Typography
            variant="h6"
            component="h1"
            sx={{
              pl: 4,
              pt: 3,
              mb: 3,
              flexDirection: ['column', 'row'],
              alignItems: ['flex-start', 'center']
            }}
          >
            Containers <Icon icon="eos-icons:container" />
          </Typography>

          {shipment && (
            <DataGrid
              autoHeight
              pagination
              rows={shipment.shipment_containers}
              columns={columns}
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[5, 10, 20, 50, 100]}
              onPageSizeChange={(size) => setPageSize(size)}
            />
          )}
        </Card>
      </Grid>
    </Grid>
  )
}

export default Containers
