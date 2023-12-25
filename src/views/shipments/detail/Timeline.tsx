// ** MUI Imports
import { Box, Card, Grid, Typography, LinearProgress, Divider } from '@mui/material'
import { useState, useEffect } from 'react'
// ** Redux
import { useAppSelector, useAppDispatch } from 'src/hooks/useRedux'
import { getTimeline } from 'src/redux/slices/shipments'
import { DataGrid } from '@mui/x-data-grid'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import { Timeline } from 'src/db/types/shipments'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import { useTheme } from '@mui/material/styles'
import MilestoneForm from './MilestoneForm'
// ** Third Party Imports
import { ReactDatePickerProps } from 'react-datepicker'

interface CellType {
  row: Timeline
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)

  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  let hours = date.getHours()
  if (hours === 12) {
    hours = 12
  } else {
    hours = hours % 12
  }
  const minutes = ('0' + date.getMinutes()).slice(-2)
  const seconds = ('0' + date.getSeconds()).slice(-2)
  const ampm = hours >= 12 ? 'pm' : 'am'

  const outputDate = `${year}/${month}/${day} ${hours}:${minutes}:${seconds} ${ampm}`
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

const Timeline = () => {
  // ** Hook
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] =
    direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  const dispatch = useAppDispatch()
  const { isTimelineLoading, shipmentTimeline, timelineError } = useAppSelector(
    (state) => state.shipments
  )

  const [pageSize, setPageSize] = useState(50)

  const router = useRouter()
  const { uuid } = router.query
  const auth = useAuth()
  const token = auth.user?.token as string | ''

  useEffect(() => {
    dispatch(getTimeline(token, uuid as string))
  }, [dispatch])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          {isTimelineLoading && <LinearProgress sx={{ height: '2px' }} />}
          {timelineError && (
            <Box sx={{ p: 3 }}>
              <Typography variant="body2" color="error">
                {timelineError}
              </Typography>
            </Box>
          )}
          {/* This is only available to admin/staff users */}
          {auth?.user?.role === 'admin' ? (
            <>
              <MilestoneForm popperPlacement={popperPlacement} />
              <Divider />
            </>
          ) : null}

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
          {shipmentTimeline && (
            <DataGrid
              autoHeight
              pagination
              rows={shipmentTimeline}
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

export default Timeline
