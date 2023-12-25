// ** MUI Imports
import { Box, Card, CardContent, Grid, Typography, LinearProgress } from '@mui/material'

// ** Redux
import { useAppSelector } from 'src/hooks/useRedux'

const BasicDetailsShared = () => {
  const {
    isLoading,
    shipmentShared: shipment,
    error
  } = useAppSelector((state) => state.shipments)
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        {isLoading && <LinearProgress sx={{ height: '2px' }} />}
        {error && (
          <Box sx={{ p: 3 }}>
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          </Box>
        )}
        {shipment && (
          <CardContent sx={{ pb: 1 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'left' }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8} xl={9} lg={9}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={{ mr: 2, fontWeight: 1000 }}>Consigner:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        {shipment.consigner_name || 'N/A'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4} xl={3} lg={3}>
                    <Box>
                      <Typography sx={{ mr: 2, fontWeight: 1000 }} textAlign="right">
                        Consignee:
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }} textAlign="right">
                        {shipment.consignee_name || 'N/A'}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'left', pt: 4 }}>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={8} xl={9} lg={9}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={{ mr: 2, fontWeight: 1000 }}>
                        Loading Port:
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        {shipment.loading_port || 'N/A'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4} xl={3} lg={3}>
                    <Box>
                      <Typography sx={{ mr: 2, fontWeight: 1000 }} textAlign="right">
                        Port Of Destination:
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }} textAlign="right">
                        {shipment.port_destination || 'N/A'}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'left', pt: 4 }}>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={8} xl={9} lg={9}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={{ mr: 2, fontWeight: 1000 }}>
                        From Country:
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        {shipment.from_country || 'N/A'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4} xl={3} lg={3}>
                    <Box>
                      <Typography sx={{ mr: 2, fontWeight: 1000 }} textAlign="right">
                        To Country:
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }} textAlign="right">
                        {shipment.to_country || 'N/A'}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'left', pt: 4 }}>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={8} xl={9} lg={9}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={{ mr: 2, fontWeight: 1000 }}>Item:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        {shipment.item_description || 'N/A'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4} xl={3} lg={3}>
                    <Box>
                      <Typography sx={{ mr: 2, fontWeight: 1000 }} textAlign="right">
                        Consignment Mode:
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }} textAlign="right">
                        {shipment.consignment_mode || 'N/A'}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'left', pt: 4 }}>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={8} xl={9} lg={9}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={{ mr: 2, fontWeight: 1000 }}>MBL:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        {shipment.mbl || 'N/A'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4} xl={3} lg={3}>
                    <Box>
                      <Typography sx={{ mr: 2, fontWeight: 1000 }} textAlign="right">
                        Project No:
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }} textAlign="right">
                        {shipment.project_number || 'N/A'}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'left', pt: 4 }}>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={8} xl={9} lg={9}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={{ mr: 2, fontWeight: 1000 }}>LC No:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        {shipment.lc_number || 'N/A'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4} xl={3} lg={3}>
                    <Box>
                      <Typography sx={{ mr: 2, fontWeight: 1000 }} textAlign="right">
                        Shipping Line:
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }} textAlign="right">
                        {shipment.shipping_line || 'N/A'}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'left', pt: 4 }}>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={8} xl={9} lg={9}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={{ mr: 2, fontWeight: 1000 }}>
                        Container No:
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        {shipment.container_number || 'N/A'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4} xl={3} lg={3}>
                    <Box>
                      <Typography sx={{ mr: 2, fontWeight: 1000 }} textAlign="right">
                        Visibility:
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }} textAlign="right">
                        {shipment.visibility || 'N/A'}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'left', pt: 4 }}>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={8} xl={9} lg={9}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={{ mr: 2, fontWeight: 1000 }}>
                        Reference No:
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        {shipment.customer_reference_number || 'N/A'}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </CardContent>
        )}
      </Grid>
    </Grid>
  )
}

export default BasicDetailsShared
