// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useAppSelector } from 'src/hooks/useRedux'
import LinearProgress from '@mui/material/LinearProgress'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

interface DataType {
  icon: string
  stats: number
  title: string
  color: ThemeColor
}

const KPIs = () => {
  const { kpisLoading, kpis, kpisError } = useAppSelector((state) => state.analytics)

  const data: DataType[] = [
    {
      stats: kpis?.clearance || 0,
      title: 'Clearance',
      color: 'primary',
      icon: 'cil:clear-all'
    },
    {
      color: 'info',
      stats: kpis?.originalDocuments || 0,
      title: 'Original Documents',
      icon: 'et:documents'
    },
    {
      color: 'error',
      stats: kpis?.payments || 0,
      title: 'Payments',
      icon: 'fluent:payment-28-regular'
    },
    {
      stats: kpis?.doIssuance || 0,
      color: 'success',
      title: 'DO Issuance',
      icon: 'pajamas:issue-closed'
    }
  ]

  const renderStats = () => {
    return data.map((sale: DataType, index: number) => (
      <Grid item xs={6} md={3} key={index}>
        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomAvatar
            skin="light"
            color={sale.color}
            sx={{ mr: 4, width: 42, height: 42 }}
          >
            <Icon icon={sale.icon} />
          </CustomAvatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6">{sale.stats}</Typography>
            <Typography variant="body2">{sale.title}</Typography>
          </Box>
        </Box>
      </Grid>
    ))
  }

  return (
    <Card sx={{ minHeight: '230px', maxHeight: '300px' }}>
      {kpisLoading && <LinearProgress sx={{ height: '2px' }} />}
      {kpisError && (
        <Box sx={{ p: 3 }}>
          <Typography variant="body2" color="error">
            {kpisError}
          </Typography>
        </Box>
      )}
      <CardHeader
        title="KPIs"
        sx={{ '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }}
        action={
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            In days
          </Typography>
        }
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(0.5)} !important` }}>
        <Grid container spacing={6}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default KPIs
