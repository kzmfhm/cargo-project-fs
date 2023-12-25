import React, { ChangeEvent, useState, useEffect } from 'react'

import {
  Box,
  Button,
  Card,
  Typography,
  CardHeader,
  Stack,
  LinearProgress
} from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import {
  DataGrid,
  GridColumns,
  GridRenderCellParams,
  GridRowParams
} from '@mui/x-data-grid'

import CustomChip from 'src/@core/components/mui/chip'
import TableToolbar from './TableToolbar'

import { ShipmentInListType, CustomTagType } from 'src/db/types/shipments'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { getImports } from 'src/redux/slices/shipments'

import { differenceFromToday, percentageCalculator } from './utils'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'

import SplitLongString from 'src/@core/components/split-long-body'
import CustomToolTip from 'src/@core/components/custom-tooltip'

const renderProgressOld = (params: GridRenderCellParams) => {
  const row = params.row
  const actual_arrival = new Date(row.actual_arrival)
  const actual_departure = new Date(row.actual_departure)
  // const calculatedDaysValue = calculatedDays(actual_departure, actual_arrival)
  const percentage = percentageCalculator(actual_departure, actual_arrival)
  const differenceFromTodayValue = differenceFromToday(actual_departure)
  return (
    <>
      {row.actual_arrival && row.actual_departure ? (
        <Tooltip
          TransitionComponent={Zoom}
          title={`${percentage}% - ${differenceFromTodayValue} days`}
          placement="top"
        >
          <LinearProgress
            variant="determinate"
            value={percentage}
            sx={{ width: '10rem' }}
          />
        </Tooltip>
      ) : (
        <LinearProgress variant="determinate" value={5} sx={{ width: '10rem' }} />
      )}
    </>
  )
}

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const columns: GridColumns = [
  {
    flex: 0.2,
    minWidth: 300,
    headerName: 'Item Description',
    field: 'item_description',
    renderCell: (params: GridRenderCellParams) => {
      const { item_description } = params?.row
      return (
        <CustomToolTip
          TransitionComponent={Zoom}
          title={item_description}
          placement="top"
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ color: 'text.primary', fontWeight: 100, fontSize: 15 }}>
              <SplitLongString text={item_description} lineLength={30} />
            </Typography>
          </Box>
        </CustomToolTip>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    headerName: 'REF',
    field: 'customer_reference_number',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {params.row.customer_reference_number}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: 'Project No',
    field: 'project_number',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {params.row.project_number}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 200,
    headerName: 'LC No',
    field: 'lc_number',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {params.row.lc_number}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 100,
    headerName: 'Bank',
    field: 'bank_name',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {params.row.bank_name}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 75,
    headerName: 'Mode',
    field: 'consignment_mode',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {params.row.consignment_mode}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: 'MBL',
    field: 'mbl',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {params.row.mbl}
      </Typography>
    )
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: 'from_country',
    headerName: 'Origin',
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* {renderOrigin(params)} */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              noWrap
              variant="body2"
              sx={{ color: 'text.primary', fontWeight: 600 }}
            >
              {row.loading_port} - {row.from_country}
            </Typography>
            <Typography noWrap variant="caption">
              {row.consigner_name}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.275,
    minWidth: 200,
    field: 'to_country',
    headerName: 'Destination',
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* {renderDestination(params)} */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              noWrap
              variant="body2"
              sx={{ color: 'text.primary', fontWeight: 600 }}
            >
              {row.port_destination} - {row.to_country}
            </Typography>
            <Typography noWrap variant="caption">
              {row.consignee_name}
            </Typography>
          </Box>
        </Box>
      )
    }
  },

  {
    flex: 0.2,
    minWidth: 120,
    headerName: 'TD',
    field: 'td',
    renderCell: (params: GridRenderCellParams) => renderProgressOld(params)
  },
  {
    flex: 0.2,
    minWidth: 300,
    headerName: 'Status',
    field: 'status',
    renderCell: (params: GridRenderCellParams) => {
      return (
        <>
          {/* Will render chips here */}

          {params.row.custom_tags_list.map((tag: CustomTagType) => {
            return <CustomChip label={tag.val} />
          })}
        </>
      )
    }
  },

  {
    flex: 0.2,
    minWidth: 120,
    headerName: 'Start Date',
    field: 'start_date',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {params.row.start_date}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: 'Actual departure',
    field: 'actual_departure',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {params.row.actual_departure}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: 'Actual arrival',
    field: 'actual_arrival',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {params.row.actual_arrival}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: 'End date',
    field: 'end_date',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {params.row.end_date}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 140,
    field: 'is_gated_out',
    headerName: 'Is Gated Out',
    renderCell: (params: GridRenderCellParams) => {
      const color = params.row.is_gated_out === 'true' ? 'success' : 'error'
      const title = params.row.is_gated_out === 'true' ? 'Yes' : 'No'

      return (
        <CustomChip
          rounded
          size="small"
          skin="light"
          color={color}
          label={title}
          sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
        />
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: 'Carrier',
    field: 'carrier',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {params.row.carrier}
      </Typography>
    )
  }
]

const defaultColumns = [
  'item_description',
  'customer_reference_number',
  'from_country',
  'to_country',
  'is_gated_out',
  'td'
]

const getDefaultColumns = () => {
  return columns.filter((item) => defaultColumns.includes(item.field))
}

const TableShipmentImports = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { isLoading, shipmentsImport, error } = useAppSelector((state) => state.shipments)

  const auth = useAuth()

  // ** States
  const [data, setData] = useState<ShipmentInListType[]>(shipmentsImport)
  // const [data, setData] = useState<ShipmentInListType[]>(rows)
  const [showAllColumns, setShowAllColumns] = useState<boolean>(false)

  const [pageSize, setPageSize] = useState<number>(10)
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<ShipmentInListType[]>([])

  let token: string = auth.user?.token as string

  useEffect(() => {
    dispatch(getImports(token))
  }, [])

  useEffect(() => {
    if (shipmentsImport) {
      setData(shipmentsImport)
    }
  }, [shipmentsImport])

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = data.filter((row) => {
      return Object.keys(row).some((field) => {
        // @ts-ignore
        return searchRegex.test(row[field]?.toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  const handleEvent = (params: GridRowParams) => {
    const { id: uuid } = params.row
    router.push(`/shipments/${uuid}`)
  }

  return (
    <Card>
      {isLoading && <LinearProgress sx={{ height: '2px' }} />}

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2 }}
      >
        <CardHeader title="My Import Shipments 🚢" subheader="Accessing Data for All Import Shipments"/>

        <Button onClick={() => setShowAllColumns(!showAllColumns)} color="inherit">
          {showAllColumns ? 'Show default Columns' : 'Show All Columns'}
        </Button>
      </Stack>
      {error && (
        <Box sx={{ pl: 5 }}>
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        </Box>
      )}

      <DataGrid
        autoHeight
        pagination
        columns={showAllColumns ? columns : getDefaultColumns()}
        checkboxSelection
        pageSize={pageSize}
        rowsPerPageOptions={[7, 10, 25, 50, 100]}
        components={{ Toolbar: TableToolbar }}
        disableSelectionOnClick
        rows={filteredData.length ? filteredData : data}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        componentsProps={{
          baseButton: {
            variant: 'outlined'
          },
          toolbar: {
            value: searchText,
            clearSearch: () => handleSearch(''),
            onChange: (event: ChangeEvent<HTMLInputElement>) =>
              handleSearch(event.target.value)
          }
        }}
        onRowClick={handleEvent}
      />
    </Card>
  )
}

export default TableShipmentImports
