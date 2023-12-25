// ** MUI Imports
import { Card, CardContent, LinearProgress, Divider, Typography } from '@mui/material'

// ** Redux
import { useAppSelector } from 'src/hooks/useRedux'
import { Icon } from '@iconify/react'

const PartnersShared = () => {
  const { shipmentShared: shipment } = useAppSelector((state) => state.shipments)
  return (
    <>
      <Typography variant="h6" component="h1" sx={{ pl: 4, pt: 3 }}>
        Partners <Icon icon="carbon:partnership" />
      </Typography>
      {shipment && (
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'left',
            flexDirection: 'column'
          }}
        >
          <Divider sx={{ width: '100%' }} />
          {shipment.partners.map((partner) => (
            <Typography sx={{ fontWeight: 1000, mt: 3 }}> {partner.name}</Typography>
          ))}
        </CardContent>
      )}
    </>
  )
}

export default PartnersShared
