// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

import CardContent from '@mui/material/CardContent'

import { useAppSelector } from 'src/hooks/useRedux'
import LinearProgress from '@mui/material/LinearProgress'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const LineField = () => {
  const { lineFieldLoading, lineField, lineFieldError } = useAppSelector(
    (state) => state.analytics
  )
  // ** Hook
  const theme = useTheme()

  const series = [
    {
      name: 'This Fiscal Year',
      data: lineField?.currentData || []
    },
    {
      name: 'Last Fiscal Year',
      data: lineField?.previousData || []
    }
  ]

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: false },
      offsetX: -10
    },
    colors: ['#d0ccff', '#ebe9f1'],
    stroke: { curve: 'straight' },
    dataLabels: { enabled: false },
    markers: {
      strokeWidth: 2,
      strokeOpacity: 1,
      colors: ['#082e87', '#dddcde'],
      strokeColors: ['#fff']
    },
    grid: {
      padding: { top: -10 },
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      }
    },
    tooltip: {
      custom(data: any) {
        return `<div class='bar-chart'>
          <span>${data.series[data.seriesIndex][data.dataPointIndex]}</span>
        </div>`
      }
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      crosshairs: {
        stroke: { color: theme.palette.divider }
      },
      labels: {
        style: { colors: theme.palette.text.disabled }
      },
      tickPlacement: 'on',
      categories: [
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun'
      ]
    }
  }

  return (
    <Card>
      <CardHeader
        title="Line Field"
        subheader="Type-Import"
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
        action={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ mr: 5 }}>
              This Fiscal Year
            </Typography>
            <CustomChip
              skin="light"
              color="success"
              sx={{ fontWeight: 500, borderRadius: 1, fontSize: '0.875rem', mr: 3 }}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1 } }}>
                  <span>{lineField?.currentTotal}</span>
                </Box>
              }
            />
            <Typography variant="body2" sx={{ mr: 5 }}>
              Last Fiscal Year
            </Typography>
            <CustomChip
              skin="light"
              color="error"
              sx={{ fontWeight: 500, borderRadius: 1, fontSize: '0.875rem' }}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1 } }}>
                  <span>{lineField?.previousTotal}</span>
                </Box>
              }
            />
          </Box>
        }
      />
      <CardContent>
        <ReactApexcharts type="line" height={400} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default LineField
