import { useState, useEffect } from 'react'

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

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

import { useRouter } from 'next/router'
import { useAppSelector } from 'src/hooks/useRedux'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

import { ShipmentShippingCompany } from 'src/db/types/analytics'
import { DataGrid, GridRowParams } from '@mui/x-data-grid'
import { Icon } from '@iconify/react'

import TabContext from '@mui/lab/TabContext'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'

import { useAppDispatch } from 'src/hooks/useRedux'
import { getShipingCompany } from 'src/redux/slices/analytics'

interface CellType {
  row: ShipmentShippingCompany
}
interface DataPoint {
  x: string | null
  y: number
}

const columns = [
  {
    flex: 0.1,
    field: 'ref',
    minWidth: 150,
    maxWidth: 250,
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
    minWidth: 150,
    maxWidth: 350,
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
    field: 'line',
    minWidth: 100,
    maxWidth: 150,
    headerName: 'Line',
    renderCell: ({ row }: CellType) => {
      const { line } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'start' }}>
          <Typography sx={{ color: 'text.primary', fontWeight: 100, fontSize: 15 }}>
            {line}
          </Typography>
        </Box>
      )
    }
  }
]

interface ShippingCompanyProps {
  token: string
  partnerID: string
  dateRange: string[]
}

const ShippingCompany = ({ token, partnerID, dateRange }: ShippingCompanyProps) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const [drilledData, setDrilledData] = useState<ShipmentShippingCompany[]>([])
  const [category, setCategory] = useState('')

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCategory(newValue)
    // setCategory(newValue)
  }

  useEffect(() => {
    dispatch(getShipingCompany(token, partnerID, dateRange, category))
  }, [category])

  const handleEditClose = () => setOpen(false)

  const router = useRouter()
  const [pageSize, setPageSize] = useState(10)

  const handleEvent = (params: GridRowParams) => {
    const { id: uuid } = params.row
    router.push(`/shipments/${uuid}`)
  }

  const { shippingCompanyLoading, shippingCompany, shippingCompanyError } =
    useAppSelector((state) => state.analytics)

  function removeNullObjects(arr: DataPoint[]): DataPoint[] {
    return arr.filter((obj) => obj.x !== null)
  }

  const drillDownHandler = (dataPointIndex: number, toDrill: any) => {
    const filteredData = toDrill?.filter((item: any) => item.dataSet === dataPointIndex)
    setDrilledData(filteredData[0].shipments)
    setOpen(true)
    return null
  }

  const series = [
    {
      data: removeNullObjects(shippingCompany?.data || []),
      name: shippingCompany?.drillDown || []
    }
  ]

  const options: ApexOptions = {
    legend: {
      show: false
    },

    colors: ['#52B12C'],

    title: {
      text: category
    },
    chart: {
      events: {
        dataPointSelection: function (event, chartContext, config) {
          drillDownHandler(
            parseInt(config.dataPointIndex),
            config.w.config.series[0].name
          )
        }
      }
    }
  }

  return (
    <Card>
      {shippingCompanyLoading && <LinearProgress sx={{ height: '2px' }} />}
      {shippingCompanyError && (
        <Box sx={{ p: 3 }}>
          <Typography variant="body2" color="error">
            {shippingCompanyError}
          </Typography>
        </Box>
      )}
      <CardHeader
        title="Shipping Company"
        subheaderTypographyProps={{
          sx: { color: (theme) => `${theme.palette.text.disabled} !important` }
        }}
      />
      <CardContent>
        <ReactApexcharts
          type="treemap"
          height={400}
          options={options}
          series={series as any}
        />
        <TabContext value={category}>
          <TabList
            variant="scrollable"
            scrollButtons="auto"
            onChange={handleTabChange}
            aria-label="forced scroll tabs example"
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
          >
            <Tab value="" label="All" />
            <Tab value="Raw Materials" label="Raw Materials" />
            <Tab value="Intermediary Goods" label="Intermediary Goods" />
            <Tab value="Parts" label="Parts" />
            <Tab value="Machinery" label="Machinery" />
          </TabList>
        </TabContext>
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

export default ShippingCompany
