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

import { useRouter } from 'next/router'

import { useAppSelector } from 'src/hooks/useRedux'
import { useTheme } from '@mui/material/styles'
// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

import { ContainerizedShipment } from 'src/db/types/analytics'
import { DataGrid, GridRowParams } from '@mui/x-data-grid'
import { Icon } from '@iconify/react'

interface CellType {
  row: ContainerizedShipment
}

const columnColors = {
  bg: '#fff',
  series1: '#826af9',
  series2: '#d2b0ff'
}

const columns = [
  {
    flex: 0.1,
    field: 'ref',
    minWidth: 150,
    headerName: 'Ref #',
    renderCell: ({ row }: CellType) => {
      const { ref } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ color: 'text.primary', fontWeight: 100, fontSize: 15 }}>
            {ref}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    field: 'desc',
    minWidth: 100,
    headerName: 'Item Description',
    renderCell: ({ row }: CellType) => {
      const { desc } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 100 }}>
              {desc}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    field: 'origin',
    minWidth: 100,
    maxWidth: 150,
    headerName: 'Origin',
    renderCell: ({ row }: CellType) => {
      const { origin } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'start' }}>
          <Typography sx={{ color: 'text.primary', fontWeight: 100, fontSize: 15 }}>
            {origin}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    field: 'destination',
    minWidth: 100,
    maxWidth: 150,
    headerName: 'Destination',
    renderCell: ({ row }: CellType) => {
      const { destination } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'start' }}>
          <Typography sx={{ color: 'text.primary', fontWeight: 100, fontSize: 15 }}>
            {destination}
          </Typography>
        </Box>
      )
    }
  }
]

const ContainerizedShipments = () => {
  const [open, setOpen] = useState(false)
  const [drilledData, setDrilledData] = useState<ContainerizedShipment[]>([])

  const handleEditClose = () => setOpen(false)

  const router = useRouter()
  const [pageSize, setPageSize] = useState(10)

  const handleEvent = (params: GridRowParams) => {
    const { id: uuid } = params.row
    router.push(`/shipments/${uuid}`)
  }

  const drillDownHandler = (dataPointIndex: number, toDrill: any) => {
    const filteredData = toDrill?.filter((item: any) => item.dataSet === dataPointIndex)
    setDrilledData(filteredData[0].shipments)
    setOpen(true)
    return null
  }

  // ** Hook
  const theme = useTheme()

  const {
    containerizedShipmentsLoading,
    containerizedShipments,
    containerizedShipmentsError
  } = useAppSelector((state) => state.analytics)

  const staticData = [
    {
      name: '20FT',
      data: [0, 0, 0, 0],
      toDrill: []
    },
    {
      name: '40FT',
      data: [0, 0, 0, 0],
      toDrill: []
    }
  ]

  const series = containerizedShipments ? containerizedShipments.series : staticData

  const options = {
    chart: {
      offsetX: -10,
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false },
      events: {
        dataPointSelection: (event: any, chartContext: any, config: any) => {
          if (config.seriesIndex === 0) {
            drillDownHandler(
              config.dataPointIndex,
              config.w.config.plotOptions.customData[0]
            )
          } else {
            drillDownHandler(
              config.dataPointIndex,
              config.w.config.plotOptions.customData[1]
            )
          }
        }
      }
    },

    fill: { opacity: 1 },
    dataLabels: { enabled: false },
    colors: [columnColors.series1, columnColors.series2],
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      labels: { colors: theme.palette.text.secondary },
      markers: {
        offsetY: 1,
        offsetX: -3
      },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    stroke: {
      show: true,
      colors: ['transparent']
    },
    plotOptions: {
      customData: containerizedShipments?.data,
      bar: {
        columnWidth: '15%',
        colors: {
          backgroundBarRadius: 10,
          backgroundBarColors: [
            columnColors.bg,
            columnColors.bg,
            columnColors.bg,
            columnColors.bg,
            columnColors.bg
          ]
        }
      }
    },
    grid: {
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
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
      categories: ['KICT', 'SAPT', 'PICT', 'QICT'],
      crosshairs: {
        stroke: { color: theme.palette.divider }
      },
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '35%'
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      {containerizedShipmentsLoading && <LinearProgress sx={{ height: '2px' }} />}
      {containerizedShipmentsError && (
        <Box sx={{ p: 3 }}>
          <Typography variant="body2" color="error">
            {containerizedShipmentsError}
          </Typography>
        </Box>
      )}
      <CardHeader
        title="Containerized Shipments"
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />
      <CardContent>
        {containerizedShipments ? (
          <ReactApexcharts
            type="bar"
            height={400}
            options={options as any}
            series={series as any}
          />
        ) : (
          <ReactApexcharts
            type="bar"
            height={400}
            options={options as any}
            series={staticData as any}
          />
        )}
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

export default ContainerizedShipments
