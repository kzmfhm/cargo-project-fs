import { useState } from 'react'

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  Stack,
  Button,
  Typography,
  LinearProgress
} from '@mui/material'

import { ApexOptions } from 'apexcharts'

import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { useAppSelector } from 'src/hooks/useRedux'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

import { DetentionShipment } from 'src/db/types/analytics'
import { DataGrid, GridRowParams } from '@mui/x-data-grid'
import { Icon } from '@iconify/react'

import { convertStringToArray } from 'src/utils/stringToArray'

interface CellType {
  row: DetentionShipment
}

const columns = [
  {
    flex: 0.1,
    field: 'ref',
    minWidth: 150,
    headerName: 'Ref #',
    renderCell: ({ row }: CellType) => {
      const { customer_reference_number } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ color: 'text.primary', fontWeight: 100, fontSize: 15 }}>
            {customer_reference_number}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    field: 'item_description',
    minWidth: 100,
    headerName: 'Item Description',
    renderCell: ({ row }: CellType) => {
      const { item_description } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 100 }}>
              {item_description}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    field: 'detention',
    minWidth: 100,
    maxWidth: 150,
    headerName: 'Detention',
    renderCell: ({ row }: CellType) => {
      const { detention } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'start' }}>
          <Typography sx={{ color: 'text.primary', fontWeight: 100, fontSize: 15 }}>
            {detention}
          </Typography>
        </Box>
      )
    }
  }
]

const Detention = () => {
  const [open, setOpen] = useState(false)
  const [drilledData, setDrilledData] = useState<DetentionShipment[]>([])

  const handleEditClose = () => setOpen(false)

  const router = useRouter()
  const [pageSize, setPageSize] = useState(10)

  const handleEvent = (params: GridRowParams) => {
    const { id: uuid } = params.row
    router.push(`/shipments/${uuid}`)
  }

  // ** Hook
  const { detentionsLoading, detentions, detentionsError } = useAppSelector(
    (state) => state.analytics
  )

  const drillDownHandler = (data: any, dataPointIndex: number) => {
    const filteredData = detentions?.drillDown.filter(
      (item) => item.dataSet === dataPointIndex
    )
    if (filteredData) {
      setDrilledData((filteredData[0]?.shipments as DetentionShipment[]) || [])
    }
    setOpen(true)
    return null
  }

  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      events: {
        dataPointSelection: (event, chartContext, config) => {
          drillDownHandler(
            config.w.config.series[0].data,
            parseInt(config.dataPointIndex)
          )
        }
      }
    },
    colors: ['#00cfe8'],
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        borderRadius: 8,
        barHeight: '30%',
        horizontal: true,
        startingShape: 'rounded'
      }
    },
    grid: {
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: false }
      },
      padding: {
        top: -10
      }
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      categories: detentions?.categories
        ? convertStringToArray(detentions?.categories || '')
        : [],
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    }
  }

  return (
    <Card>
      {detentionsLoading && <LinearProgress sx={{ height: '2px' }} />}
      {detentionsError && (
        <Box sx={{ p: 3 }}>
          <Typography variant="body2" color="error">
            {detentionsError}
          </Typography>
        </Box>
      )}
      <CardHeader
        title="Detention"
        subheader={detentions?.totalDetention}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />
      <CardContent>
        <ReactApexcharts
          type="bar"
          height={400}
          options={options}
          series={[
            {
              data: detentions?.series
                ? convertStringToArray(detentions?.series || '')
                : []
            }
          ]}
        />
      </CardContent>
      <Dialog
        open={open}
        onClose={handleEditClose}
        aria-labelledby="user-view-edit"
        aria-describedby="user-view-edit-description"
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 950 } }}
      >
        <Card>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ p: 2 }}
          >
            <CardHeader title="Shipments" />

            <Button onClick={handleEditClose} color="primary" size="small">
              <Icon fontSize="2.025rem" icon="radix-icons:cross-2" />
            </Button>
          </Stack>
          <DataGrid
            autoHeight
            pagination
            rows={drilledData || []}
            columns={columns}
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[5, 10]}
            onPageSizeChange={(size) => setPageSize(size)}
            onRowClick={handleEvent}
          />
        </Card>
      </Dialog>
    </Card>
  )
}

export default Detention
