// ** MUI Imports
import { Box, Card, Grid, Typography } from '@mui/material'
import { useState } from 'react'
// ** Redux
import { useAppSelector } from 'src/hooks/useRedux'
import { DataGrid } from '@mui/x-data-grid'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import { Timeline } from 'src/db/types/shipments'
import { Icon } from '@iconify/react'

interface CellType {
  row: Timeline
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)

  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  const hours = date.getHours()
  const minutes = ('0' + date.getMinutes()).slice(-2)
  const seconds = ('0' + date.getSeconds()).slice(-2)
  const ampm = hours >= 12 ? 'pm' : 'am'

  const outputDate = `${year}/${month}/${day} ${hours % 12}:${minutes}:${seconds} ${ampm}`
  return outputDate
}

const columns = [
  {
    flex: 0.1,
    field: 'status',
    minWidth: 220,
    headerName: 'PSW Status',
    renderCell: ({ row }: CellType) => {
      const { status } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 700 }}>
              {status}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    field: 'milestone_display',
    minWidth: 220,
    headerName: 'Detail',
    renderCell: ({ row }: CellType) => {
      const { milestone_display } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 100 }}>
              {milestone_display}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    field: 'date',
    minWidth: 220,
    headerName: 'Date',
    renderCell: ({ row }: CellType) => {
      const { date } = row
      const formattedDate = formatDate(date)

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 100 }}>
              {formattedDate}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    field: 'vessel',
    minWidth: 220,
    headerName: 'BL EMPTY RETURN DATE',
    renderCell: ({ row }: CellType) => {
      const { vessel } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 100 }}>
              {vessel}
            </Typography>
          </Box>
        </Box>
      )
    }
  },

  {
    flex: 0.1,
    field: 'calculated-status',
    minWidth: 220,
    headerName: 'status',
    renderCell: ({ row }: CellType) => {
      const { date } = row
      const currentDate = new Date()

      return (
        <>
          {currentDate < new Date(date) ? (
            <Tooltip TransitionComponent={Zoom} title={'Pending ...'} placement="top">
              <Icon icon="maki:cross" />
            </Tooltip>
          ) : (
            <Tooltip TransitionComponent={Zoom} title={'Completed'} placement="top">
              <Icon icon="eva:done-all-fill" />
            </Tooltip>
          )}
        </>
      )
    }
  }
]

const TimelineShared = () => {
  const { shipmentShared: shipment } = useAppSelector((state) => state.shipments)

  const [pageSize, setPageSize] = useState(50)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
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
          Timeline <Icon icon="mdi:chart-timeline-variant" />
        </Typography>
        {shipment?.shipment_timeline && (
          <DataGrid
            autoHeight
            pagination
            rows={shipment?.shipment_timeline}
            columns={columns}
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[5, 10, 20, 50, 100]}
            onPageSizeChange={(size) => setPageSize(size)}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default TimelineShared
