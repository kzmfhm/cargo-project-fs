import React, { ChangeEvent, useState, useEffect } from 'react'

import { Box, Card, Typography, CardHeader, Stack, LinearProgress } from '@mui/material'
import { DataGrid, GridColumns, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid'

import TableToolbar from './TableToolbar'
import { useAppSelector } from 'src/hooks/useRedux'
import { Booking } from 'src/db/types/bookings'
import { useRouter } from 'next/router'

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const columns: GridColumns = [
  {
    flex: 0.2,
    minWidth: 200,
    headerName: 'Order No #',
    field: 'order_number',
    renderCell: (params: GridRenderCellParams) => {
      const { order_number } = params?.row
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 900,
                }}
              >
                {order_number}
              </Typography>
            </Box>
          </Box>
        </Box>
      )
    },
  },
  {
    flex: 0.2,
    minWidth: 200,
    headerName: 'Clearing Agent',
    field: 'clearing_agent',
    renderCell: (params: GridRenderCellParams) => {
      const { clearing_agent } = params?.row
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 900,
                }}
              >
                {clearing_agent}
              </Typography>
            </Box>
          </Box>
        </Box>
      )
    },
  },
  {
    flex: 0.2,
    minWidth: 200,
    headerName: 'Transporter',
    field: 'transporter',
    renderCell: (params: GridRenderCellParams) => {
      const { transporter } = params?.row
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 900,
                }}
              >
                {transporter}
              </Typography>
            </Box>
          </Box>
        </Box>
      )
    },
  },
  {
    flex: 0.2,
    minWidth: 200,
    headerName: 'Price',
    field: 'total_price',
    renderCell: (params: GridRenderCellParams) => {
      const { total_price } = params?.row
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 900,
                }}
              >
                {total_price}
              </Typography>
            </Box>
          </Box>
        </Box>
      )
    },
  },
  {
    flex: 0.2,
    minWidth: 200,
    headerName: 'Created By',
    field: 'created_by',
    renderCell: (params: GridRenderCellParams) => {
      const { created_by } = params?.row
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 900,
                }}
              >
                {created_by}
              </Typography>
            </Box>
          </Box>
        </Box>
      )
    },
  },

  //  Add more columns here
]

const TableBookings = () => {
  const { isLoading, error, bookings } = useAppSelector((state) => state.bookings)
  const router = useRouter()
  // ** States
  const [data, setData] = useState<Booking[]>([])
  const [pageSize, setPageSize] = useState<number>(10)
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<Booking[]>([])

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

  useEffect(() => {
    if (bookings) {
      setData(bookings)
    }
  }, [bookings])

  const handleEvent = (params: GridRowParams) => {
    const { order_number: order_number } = params.row
    router.push(`/bookings/${order_number}`)
  }

  return (
    <Card>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
        <CardHeader title="My Bookings 📑" subheader="Accessing Data for All Bookings" />
      </Stack>

      {isLoading && <LinearProgress sx={{ height: '2px' }} />}

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
        getRowId={(row) => row.order_number}
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

export default TableBookings
