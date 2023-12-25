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

import { Bar } from 'react-chartjs-2'
import { ChartData, ChartOptions } from 'chart.js'
import { Chart, LinearScale, CategoryScale, BarElement } from 'chart.js'

import { useRouter } from 'next/router'
import { useAppSelector } from 'src/hooks/useRedux'

import { DataGrid, GridRowParams } from '@mui/x-data-grid'
import { ShipmentFclLclAir } from 'src/db/types/analytics'
import { Icon } from '@iconify/react'

Chart.register(LinearScale)
Chart.register(CategoryScale)
Chart.register(BarElement)

interface LclFclProps {
  info: string
  warning: string
  labelColor: string
  borderColor: string
  legendColor: string
}

interface CellType {
  row: ShipmentFclLclAir
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

const LclFcl = (props: LclFclProps) => {
  const [open, setOpen] = useState(false)
  const [drilledData, setDrilledData] = useState<ShipmentFclLclAir[]>([])

  const handleEditClose = () => setOpen(false)

  const router = useRouter()
  const [pageSize, setPageSize] = useState(10)

  const handleEvent = (params: GridRowParams) => {
    const { id: uuid } = params.row
    router.push(`/shipments/${uuid}`)
  }
  // ** Props
  const { info, warning, labelColor, borderColor, legendColor } = props

  const { fclLclLoading, fclLcl, fclLclError } = useAppSelector(
    (state) => state.analytics
  )

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    elements: {
      bar: {
        borderRadius: {
          topRight: 15,
          bottomRight: 15
        }
      }
    },
    layout: {
      padding: { top: -4 }
    },
    scales: {
      x: {
        min: 0,
        grid: {
          drawTicks: false,
          color: borderColor
        },
        ticks: { color: labelColor }
      },
      y: {
        grid: {
          display: false,
          color: borderColor
        },
        ticks: { color: labelColor }
      }
    },
    plugins: {
      legend: {
        align: 'end',
        position: 'top',
        labels: { color: legendColor }
      }
    },
    // eslint-disable-next-line object-shorthand
    onClick: function (evt, element) {
      if (element.length > 0) {
        let filteredData = [] as any

        console.log(element[0].element.options.backgroundColor)

        if (element[0].element.options.backgroundColor === '#FFB302') {
          // FFB302 is the color of the FCL bar in the chart So if the user clicks on the FCL bar, we filter the FCL data
          // Incase of color change, this will break the code, So make sure to change the color here as well
          // TO check the color use this code console.log(element[0].element.options.backgroundColor)
          filteredData = fclLcl?.fcldrillDownData?.filter(
            (item: any) => item.dataSet === element[0].index
          )
          setDrilledData(filteredData[0].shipments)
          setOpen(true)
        } else if (element[0].element.options.backgroundColor === '#00CCE6') {
          // #00CCE6 is the color of the LCL bar

          filteredData = fclLcl?.lcldrillDownData?.filter(
            (item: any) => item.dataSet === element[0].index
          )
          setDrilledData(filteredData[0].shipments)
          setOpen(true)
        } else if (element[0].element.options.backgroundColor === '#110070') {
          filteredData = fclLcl?.airdrillDownData?.filter(
            (item) => item.dataSet === element[0].index
          )
          setDrilledData(filteredData[0].shipments)
          setOpen(true)
        }
      }
    }
  }

  const data: ChartData<'bar'> = {
    labels: fclLcl?.labels,
    datasets: [
      {
        maxBarThickness: 15,
        label: 'FCL',
        backgroundColor: warning,
        borderColor: 'transparent',
        data: fclLcl?.fclCount || []
      },
      {
        maxBarThickness: 15,
        backgroundColor: info,
        label: 'LCL',
        borderColor: 'transparent',
        data: fclLcl?.lclCount || []
      },
      {
        maxBarThickness: 15,
        backgroundColor: '#14027a',
        label: 'AIR',
        borderColor: 'transparent',
        data: fclLcl?.airCount || []
      }
    ]
  }

  return (
    <Card>
      {fclLclLoading && <LinearProgress sx={{ height: '2px' }} />}
      {fclLclError && (
        <Box sx={{ p: 3 }}>
          <Typography variant="body2" color="error">
            {fclLclError}
          </Typography>
        </Box>
      )}
      <CardHeader title="LCL x FCL x AIR" />
      <CardContent>
        <Bar data={data} height={400} options={options} />
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

export default LclFcl
