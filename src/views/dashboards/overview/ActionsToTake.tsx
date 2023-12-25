import { useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import LinearProgress from '@mui/material/LinearProgress'
import CustomChip from 'src/@core/components/mui/chip'
import { useRouter } from 'next/router'
import { useAppSelector } from 'src/hooks/useRedux'
import { DataGrid, GridRowParams } from '@mui/x-data-grid'
import { RequireDocumentType } from 'src/db/types/overview'

import Zoom from '@mui/material/Zoom'
import SplitLongString from 'src/@core/components/split-long-body'
import CustomToolTip from 'src/@core/components/custom-tooltip'

interface CellType {
  row: RequireDocumentType
}

const columns = [
  {
    flex: 0.1,
    field: 'customer_reference_number',
    minWidth: 180,
    maxWidth: 180,
    headerName: 'Ref #',
    renderCell: ({ row }: CellType) => {
      const {
        customer_reference_number,
        item_description // Uncomment after UpcomingShipmentType update
      } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* {renderOrigin(params)} */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              noWrap
              variant="body2"
              sx={{ color: 'text.primary', fontWeight: 600 }}
            >
              {customer_reference_number}
            </Typography>
            <Typography noWrap variant="caption">
              {item_description}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    field: 'originalDocuments',
    minWidth: 120,
    maxWidth: 120,
    headerName: 'Docs',
    renderCell: ({ row }: CellType) => {
      const { originalDocuments } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CustomChip
              variant="outlined"
              label={originalDocuments ? 'Received' : 'Pending'}
              color={originalDocuments ? 'success' : 'error'}
            />
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    field: 'payOrders',
    minWidth: 120,
    maxWidth: 120,
    headerName: 'Payment',
    renderCell: ({ row }: CellType) => {
      const { payOrders } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CustomChip
              variant="outlined"
              label={payOrders ? 'Received' : 'Pending'}
              color={payOrders ? 'success' : 'error'}
            />
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    field: 'lastMilestone',
    minWidth: 200,
    headerName: 'Other',
    renderCell: ({ row }: CellType) => {
      const { lastMilestone } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomToolTip
            TransitionComponent={Zoom}
            title={lastMilestone ? lastMilestone : 'No Action Required'}
            placement="top"
          >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ color: 'text.primary', fontWeight: 100, fontSize: 15 }}>
                <SplitLongString
                  text={lastMilestone ? `${lastMilestone}` : 'No Action Required'}
                  lineLength={20}
                />
              </Typography>
            </Box>
          </CustomToolTip>
        </Box>
      )
    }
  },
]

const ActionsToTake = () => {
  const router = useRouter()
  const { requireDocumentsLoading, requireDocuments, requireDocumentsError } =
    useAppSelector((state) => state.overview)

  const [pageSize, setPageSize] = useState(50)

  const handleEvent = (params: GridRowParams) => {
    const { id: uuid } = params.row
    router.push(`/shipments/${uuid}`)
  }

  return (
    <Card sx={{ mt: 4 }}>
      <CardHeader
        sx={{ pb: 0 }}
        title="Actions to Take ⚠️"
        subheader="My Tasks for Upcoming and Current Shipments"
        subheaderTypographyProps={{ sx: { mt: '0 !important' } }}
      />
      <Grid container spacing={6} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          {requireDocumentsLoading && <LinearProgress sx={{ height: '2px' }} />}
          {requireDocumentsError && (
            <Box sx={{ p: 3 }}>
              <Typography variant="body2" color="error">
                {requireDocumentsError}
              </Typography>
            </Box>
          )}

          {requireDocuments && requireDocuments.length > 0 ? (
            <DataGrid
              autoHeight
              pagination
              rows={requireDocuments}
              columns={columns}
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[5, 10, 20, 50, 100]}
              onPageSizeChange={(size) => setPageSize(size)}
              onRowClick={handleEvent}
            />
          ) : (
            <Box sx={{ p: 3, ml: 3 }}>
              <Typography variant="body1" color="text.secondary">
                No Action Required
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Card>
  )
}

export default ActionsToTake
