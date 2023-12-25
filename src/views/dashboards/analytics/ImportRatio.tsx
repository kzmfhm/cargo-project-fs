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

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

import { ImportRatioItem } from 'src/db/types/analytics'
import { DataGrid, GridRowParams } from '@mui/x-data-grid'
import { Icon } from '@iconify/react'

import { useTheme } from '@mui/material/styles'
import { useAppSelector } from 'src/hooks/useRedux'

interface CellType {
  row: ImportRatioItem
}

const columns = [
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
    field: 'hsc',
    minWidth: 100,
    maxWidth: 150,
    headerName: 'HSC',
    renderCell: ({ row }: CellType) => {
      const { hsc } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'start' }}>
          <Typography sx={{ color: 'text.primary', fontWeight: 100, fontSize: 15 }}>
            {hsc}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    field: 'qty',
    minWidth: 100,
    maxWidth: 150,
    headerName: 'Qty',
    renderCell: ({ row }: CellType) => {
      const { qty } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'start' }}>
          <Typography sx={{ color: 'text.primary', fontWeight: 100, fontSize: 15 }}>
            {qty}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    field: 'uom',
    minWidth: 100,
    maxWidth: 150,
    headerName: 'UOM',
    renderCell: ({ row }: CellType) => {
      const { uom } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'start' }}>
          <Typography sx={{ color: 'text.primary', fontWeight: 100, fontSize: 15 }}>
            {uom}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    field: 'price',
    minWidth: 100,
    maxWidth: 150,
    headerName: 'Price',
    renderCell: ({ row }: CellType) => {
      const { price } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'start' }}>
          <Typography sx={{ color: 'text.primary', fontWeight: 100, fontSize: 15 }}>
            {price}
          </Typography>
        </Box>
      )
    }
  }
]

const donutColors = {
  series1: '#fdd835',
  series2: '#00d4bd',
  series3: '#826bf8',
  series4: '#1FD5EB',
  series5: '#ffa1a1'
}

const ImportRatio = () => {
  const [open, setOpen] = useState(false)
  const [drilledData, setDrilledData] = useState<ImportRatioItem[]>([])

  const handleEditClose = () => setOpen(false)

  const router = useRouter()
  const [pageSize, setPageSize] = useState(10)

  const handleEvent = (params: GridRowParams) => {
    const { shipmentID: uuid } = params.row
    router.push(`/shipments/${uuid}`)
  }

  const drillDownData = (dataPointIndex: number, todrill: any) => {
    const filteredData = todrill.filter((item: any) => item.dataSet === dataPointIndex)
    setDrilledData(filteredData[0].items)
    setOpen(true)
    return null
  }

  // ** Hook
  const theme = useTheme()

  const { importRatioDrillDownLoading, importRatioDrillDown, importRatioDrillDownError } =
    useAppSelector((state) => state.analytics)

  const defaultFormatter = importRatioDrillDown?.formatter || ''

  const options = {
    chart: {
      events: {
        dataPointSelection: (event: any, chartContext: any, config: any) => {
          drillDownData(
            parseInt(config.dataPointIndex),
            config.w.config.plotOptions.customData
          )
        }
      }
    },
    stroke: { width: 0 },
    labels: ['Raw Materials', 'Goods', 'Parts', 'Machinery'],
    colors: [
      donutColors.series1,
      donutColors.series5,
      donutColors.series3,
      donutColors.series2
    ],
    dataLabels: {
      enabled: true,
      formatter: (val: string) => `${parseInt(val, 10)}%`
    },
    legend: {
      position: 'bottom',
      markers: { offsetX: -3 },
      labels: { colors: theme.palette.text.secondary },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    plotOptions: {
      customData: importRatioDrillDown?.drillDown,
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '1.2rem'
            },
            value: {
              fontSize: '1.2rem',
              color: theme.palette.text.secondary,
              formatter: (val: string) => `${parseInt(val, 10)}`
            },
            total: {
              show: true,
              fontSize: '1.2rem',
              label: 'Raw Materials',
              formatter: () => defaultFormatter,
              color: theme.palette.text.primary
            }
          }
        }
      }
    },

    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  return (
    <Card sx={{ minHeight: '528px', maxHeight: '300px' }}>
      {importRatioDrillDownLoading && <LinearProgress sx={{ height: '2px' }} />}
      {importRatioDrillDownError && (
        <Box sx={{ p: 3 }}>
          <Typography variant="body2" color="error">
            {importRatioDrillDownError}
          </Typography>
        </Box>
      )}
      <CardHeader
        title="Import Ratio"
        subheader="categories"
        subheaderTypographyProps={{
          sx: { color: (theme) => `${theme.palette.text.disabled} !important` }
        }}
      />
      <CardContent>
        <ReactApexcharts
          type="donut"
          height={400}
          options={options as any}
          series={importRatioDrillDown?.series || [0, 0, 0, 0]}
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

export default ImportRatio
