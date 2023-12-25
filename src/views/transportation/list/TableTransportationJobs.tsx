import React, { ChangeEvent, useState, useEffect } from 'react'

import { Box, Card, Typography, CardHeader, Stack, LinearProgress } from '@mui/material'
import Zoom from '@mui/material/Zoom'
import { DataGrid, GridColumns, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid'
import Avatar from '@mui/material/Avatar'

import CustomChip from 'src/@core/components/mui/chip'
import TableToolbar from './TableToolbar'

import { TransportationJob } from 'src/db/types/transportation'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { getTransportationJobs, resetDetailViewStateInStore } from 'src/redux/slices/transportation'

import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'

import SplitLongString from 'src/@core/components/split-long-body'
import CustomToolTip from 'src/@core/components/custom-tooltip'

import { readableTimeStamp } from 'src/utils/readableTimeStamp'

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const columns: GridColumns = [
  {
    flex: 0.2,
    minWidth: 200,
    headerName: 'Driver',
    field: 'driver',
    renderCell: (params: GridRenderCellParams) => {
      const { driver, driver_avatar, vehicle } = params?.row
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ mr: 2 }}>
              <Avatar alt={driver} sx={{ width: 40, height: 40 }} src={driver_avatar || '/images/avatars/1.png'} />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 900,
                }}
              >
                {driver}
              </Typography>
              <Typography variant="body2">{vehicle}</Typography>
            </Box>
          </Box>
        </Box>
      )
    },
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: 'Container',
    field: 'container',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {params.row.container}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 300,
    headerName: 'Item Description',
    field: 'item_description',
    renderCell: (params: GridRenderCellParams) => {
      const { item_description } = params?.row
      return (
        <CustomToolTip TransitionComponent={Zoom} title={item_description} placement="top">
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ color: 'text.primary', fontWeight: 100, fontSize: 15 }}>
              <SplitLongString text={item_description} lineLength={30} />
            </Typography>
          </Box>
        </CustomToolTip>
      )
    },
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
    ),
  },

  {
    flex: 0.2,
    minWidth: 120,
    headerName: 'Start Time',
    field: 'start_time',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {readableTimeStamp(params.row.start_time)}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: 'End Time',
    field: 'end_time',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {params.row.end_time ? readableTimeStamp(params.row.end_time) : 'N/A'}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 140,
    field: 'status',
    headerName: 'Status',
    renderCell: (params: GridRenderCellParams) => {
      const color = params.row.status === 'Active' ? 'error' : 'warning'

      return (
        <CustomChip
          rounded
          size="small"
          skin="light"
          color={color}
          label={params.row.status}
          sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
        />
      )
    },
  },
]

const TableTransportationJobs = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { isLoading, transportationJobs, error } = useAppSelector((state) => state.transportation)

  const auth = useAuth()

  // ** States
  const [data, setData] = useState<TransportationJob[]>(transportationJobs)
  const [pageSize, setPageSize] = useState<number>(10)
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<TransportationJob[]>([])

  let token: string = auth.user?.token as string

  useEffect(() => {
    dispatch(getTransportationJobs(token))
    dispatch(resetDetailViewStateInStore())
  }, [])

  useEffect(() => {
    if (transportationJobs) {
      setData(transportationJobs)
    }
  }, [transportationJobs])

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
    const { slug: slug } = params.row
    router.push(`/transportation/${slug}`)
  }

  return (
    <Card>
      {isLoading && <LinearProgress sx={{ height: '2px' }} />}

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
        <CardHeader title="My Transportation Jobs 🚚" subheader="Accessing Data for All Transportation Jobs" />
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
        columns={columns}
        checkboxSelection
        pageSize={pageSize}
        rowsPerPageOptions={[7, 10, 25, 50, 100]}
        components={{ Toolbar: TableToolbar }}
        disableSelectionOnClick
        rows={filteredData.length ? filteredData : data}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        componentsProps={{
          baseButton: {
            variant: 'outlined',
          },
          toolbar: {
            value: searchText,
            clearSearch: () => handleSearch(''),
            onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value),
          },
        }}
        onRowClick={handleEvent}
      />
    </Card>
  )
}

export default TableTransportationJobs
