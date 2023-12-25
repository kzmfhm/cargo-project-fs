import { useState, useEffect } from 'react'
import { Partner } from 'src/db/types/accounts'
// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

import { ThemeColor } from 'src/@core/layouts/types'
// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { useAuth } from 'src/hooks/useAuth'
import {
  Box,
  Card,
  Grid,
  CardHeader,
  Typography,
  LinearProgress,
  Alert
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useAppSelector, useAppDispatch } from 'src/hooks/useRedux'
import { getAllPartners } from 'src/redux/slices/accounts'

interface CellType {
  row: Partner
}

// ** renders name column
const renderName = (row: Partner) => {
  return (
    <CustomAvatar
      skin="light"
      sx={{ mr: 2, width: 35, height: 35, fontSize: '0.875rem' }}
      color={'primary' as ThemeColor}
    >
      {getInitials(row.name || 'John Doe')}
    </CustomAvatar>
  )
}

const columns = [
  {
    flex: 0.1,
    field: 'name',
    minWidth: 220,
    headerName: 'Name',
    renderCell: ({ row }: CellType) => {
      const { name } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderName(row)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 700 }}>
              {name}
            </Typography>
          </Box>
        </Box>
      )
    }
  }
]

const UserViewPartners = () => {
  const dispatch = useAppDispatch()

  const [myPartnerPageSize, setMyPartnerPageSize] = useState<number>(5)
  const [allPartnersPageSize, setAllPartnersPageSize] = useState<number>(5)
  const {
    isPartnersLoading,
    partnersError,
    allPartners,
    userData: user
  } = useAppSelector((state) => state.accounts)

  const myPartners = user?.partner || []

  useEffect(() => {
    if (user?.isAdmin) {
      dispatch(getAllPartners(user.token))
    }
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="My Partners"
            titleTypographyProps={{ sx: { mb: [2, 0] } }}
            sx={{
              flexDirection: ['column', 'row'],
              alignItems: ['flex-start', 'center']
            }}
          />
          {myPartners && myPartners.length > 0 ? (
            <DataGrid
              autoHeight
              pagination
              rows={myPartners}
              columns={columns}
              pageSize={myPartnerPageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[5, 10]}
              onPageSizeChange={(size) => setMyPartnerPageSize(size)}
            />
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                m: 2
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {' '}
                No Partners Found{' '}
              </Typography>
            </Box>
          )}
        </Card>
      </Grid>

      {user?.isAdmin && (
        <Grid item xs={12}>
          <Card>
            {isPartnersLoading ? (
              <LinearProgress sx={{ height: '2px' }} />
            ) : partnersError ? (
              <Alert severity="error">{partnersError}</Alert>
            ) : null}
            <CardHeader
              title="All Partners"
              titleTypographyProps={{ sx: { mb: [2, 0] } }}
              sx={{
                flexDirection: ['column', 'row'],
                alignItems: ['flex-start', 'center']
              }}
            />
            {allPartners && allPartners.length > 0 ? (
              <DataGrid
                autoHeight
                pagination
                rows={allPartners}
                columns={columns}
                pageSize={allPartnersPageSize}
                disableSelectionOnClick
                rowsPerPageOptions={[5, 10]}
                onPageSizeChange={(size) => setAllPartnersPageSize(size)}
              />
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  m: 2
                }}
              >
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  {' '}
                  No Partners Found{' '}
                </Typography>
              </Box>
            )}
          </Card>
        </Grid>
      )}
    </Grid>
  )
}

export default UserViewPartners
