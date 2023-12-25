import { forwardRef, useEffect, useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import { Grid, Box, TextField, Typography, LinearProgress, Button } from '@mui/material'
import jsPDF from 'jspdf'
import DatePicker from 'react-datepicker'
import format from 'date-fns/format'
import InputAdornment from '@mui/material/InputAdornment'
import { useTheme } from '@mui/material/styles'
import { useAuth } from 'src/hooks/useAuth'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'

import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import FormControl from '@mui/material/FormControl'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import {
  setPartnerID,
  setDateRange,
  getKIPIs,
  getContainerizedShipments,
  getDemurrages,
  getDetentions,
  getImportsCleared,
  getExportsCleared,
  getTotalImportsExports,
  getFclLcl,
  getShipingCompany,
  getOrigin,
  getLineField,
  getImportRatio,
  getShippingLinesDetail
} from 'src/redux/slices/analytics'

// ** Newely Added Components
import KPIs from 'src/views/dashboards/analytics/KPIs'
import TransportJobs from 'src/views/dashboards/analytics/TransportJobs'
import ContainerizedShipments from 'src/views/dashboards/analytics/ContainerizedShipments'
import LclFcl from 'src/views/dashboards/analytics/LclFcl'
import ShippingCompany from 'src/views/dashboards/analytics/ShippingCompany'
import OriginData from 'src/views/dashboards/analytics/OriginData'
import Demurrages from 'src/views/dashboards/analytics/Demurrages'
import Detention from 'src/views/dashboards/analytics/Detention'
import LineField from 'src/views/dashboards/analytics/LineField'
import ImportRatio from 'src/views/dashboards/analytics/ImportRatio'
// import ShippingLines from 'src/views/dashboards/analytics/ShippingLines'
// ** Custom Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CardStatsWithAreaChart from 'src/@core/components/card-statistics/card-stats-with-area-chart'

import { DateType } from 'src/db/types/forms'
// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import ComingSoon from 'src/@core/components/coming-soon'

import Autocomplete from '@mui/material/Autocomplete'

interface PickerProps {
  start: Date | number
  end: Date | number
}

// ** Styled Tab component
const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  flexDirection: 'row',

  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1.5)
  }
}))

const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
  borderBottom: '0 !important',
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius
  }
}))

const AnalyticsDashboard = () => {
  const componentRef = useRef<HTMLDivElement>(null)
  const [shippingCompanyCategory, setShippingCompanyCategory] = useState('All Categories')
  const [originCategory, setOriginCategory] = useState('All Categories')

  const pageSize = [250, 297]

  const generatePdf = async () => {
    if (!componentRef.current) return
    const input = componentRef.current
    const pdf = new jsPDF('p', 'mm', pageSize)
    const canvas = await html2canvas(input)
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pageSize[0], pageSize[1])
    pdf.save(`analytics.pdf`)
  }
  // ** Hook
  const theme = useTheme()

  // ** Colors
  const horizontalBarInfo = '#26c6da'
  const warningColorShade = '#ffbd1f'
  const borderColor = theme.palette.divider
  const labelColor = theme.palette.text.disabled
  const legendColor = theme.palette.text.secondary

  const dispatch = useAppDispatch()
  const {
    partnerID,
    dateRange,

    totalImportsExportsLoading,
    totalImportsExportsError,
    totalImportsExports,

    importsClearedLoading,
    importsClearedError,
    importsCleared,

    exportsClearedLoading,
    exportsClearedError,
    exportsCleared
  } = useAppSelector((state) => state.analytics)
  const { allPartners } = useAppSelector((state) => state.accounts)

  // ** States
  const [activeTab, setActiveTab] = useState<string>('imports')
  const [endDate, setEndDate] = useState<DateType>(null)
  const [startDate, setStartDate] = useState<DateType>(null)

  const auth = useAuth()

  const getPartnersToRender = () => {
    if (auth?.user?.role === 'admin') {
      return allPartners
    } else {
      return auth?.user?.partner || []
    }
  }

  const token = auth?.user?.token || ''

  const handleOnPartnerChange = (partnerID: string) => {
    dispatch(setPartnerID(partnerID))
  }

  const CustomInput = forwardRef((props: PickerProps, ref) => {
    const startDate = props.start !== null ? format(props.start, 'yyyy-MM-dd') : ''
    const endDate = props.end !== null ? ` ${format(props.end, 'yyyy-MM-dd')}` : null

    const value = `${startDate || dateRange[0]} - ${
      endDate !== null ? endDate : dateRange[1]
    }`

    return (
      <TextField
        {...props}
        size="small"
        value={value}
        inputRef={ref}
        sx={{ width: '100%', mt: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="tabler:calendar-event" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Icon icon="tabler:chevron-down" />
            </InputAdornment>
          )
        }}
      />
    )
  })

  const handleOnDateChange = (dates: any) => {
    const [start, end] = dates

    setEndDate(end)
    setStartDate(start)
  }

  function executeApiCalls(token: string, partnerID: string, dateRange: string[]) {
    dispatch(getKIPIs(token, partnerID, dateRange))

    dispatch(getTotalImportsExports(token, partnerID, dateRange))
    dispatch(getImportsCleared(token, partnerID, dateRange))
    dispatch(getExportsCleared(token, partnerID, dateRange))

    dispatch(getContainerizedShipments(token, partnerID, dateRange))
    dispatch(getFclLcl(token, partnerID, dateRange))
    dispatch(getShipingCompany(token, partnerID, dateRange, shippingCompanyCategory))
    dispatch(getOrigin(token, partnerID, dateRange, originCategory))
    dispatch(getDemurrages(token, partnerID, dateRange))
    dispatch(getDetentions(token, partnerID, dateRange))

    dispatch(getLineField(token, partnerID, dateRange))
    dispatch(getImportRatio(token, partnerID, dateRange))
    // dispatch(getShippingLinesDetail(token, partnerID, dateRange))
  }

  useEffect(() => {
    if (startDate && endDate) {
      // Convert dates in to [startDate, endDate] yyyy-mm-dd format
      const startDateFormatted = format(startDate, 'yyyy-MM-dd')
      const endDateFormatted = format(endDate, 'yyyy-MM-dd')
      dispatch(setDateRange([startDateFormatted, endDateFormatted]))
      // Make API Calls here with the new date range
      let dateRange = [startDateFormatted, endDateFormatted]

      executeApiCalls(token, partnerID, dateRange)
    }
  }, [startDate, endDate])

  useEffect(() => {
    executeApiCalls(token, partnerID, dateRange)
  }, [partnerID])

  const renderImports = () => {
    return (
      <KeenSliderWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12} lg={6}>
            <KPIs />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TransportJobs />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            {totalImportsExportsLoading && (
              <LinearProgress
                sx={{
                  height: '1px'
                }}
              />
            )}
            {totalImportsExportsError && (
              <Box sx={{ p: 3 }}>
                <Typography variant="body2" color="error">
                  {totalImportsExportsError}
                </Typography>
              </Box>
            )}
            <CardStatsWithAreaChart
              stats={`${totalImportsExports?.imports || 0}`}
              chartColor="primary"
              avatarColor="primary"
              title="Total Shipments (Type-Import)"
              avatarIcon="fluent:vehicle-ship-24-filled"
              chartSeries={[{ data: totalImportsExports?.importsData || [] }]}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            {importsClearedLoading && (
              <LinearProgress
                sx={{
                  height: '1px'
                }}
              />
            )}
            {importsClearedError && (
              <Box sx={{ p: 3 }}>
                <Typography variant="body2" color="error">
                  {importsClearedError}
                </Typography>
              </Box>
            )}
            <CardStatsWithAreaChart
              stats={`${importsCleared?.importsCleared || 0}`}
              chartColor="primary"
              avatarColor="primary"
              title="Clear Shipments (Type-Import)"
              avatarIcon="fluent:vehicle-ship-24-regular"
              chartSeries={[{ data: importsCleared?.data || [] }]}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            {totalImportsExportsLoading && <LinearProgress sx={{ height: '1px' }} />}
            {totalImportsExportsError && (
              <Box sx={{ p: 3 }}>
                <Typography variant="body2" color="error">
                  {totalImportsExportsError}
                </Typography>
              </Box>
            )}
            <CardStatsWithAreaChart
              stats={`${totalImportsExports?.exports || 0}`}
              chartColor="warning"
              avatarColor="warning"
              title="Total Shipments (Type-Export)"
              avatarIcon="ri:ship-2-fill"
              chartSeries={[{ data: totalImportsExports?.exportsData || [] }]}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            {exportsClearedLoading && <LinearProgress sx={{ height: '1px' }} />}
            {exportsClearedError && (
              <Box sx={{ p: 3 }}>
                <Typography variant="body2" color="error">
                  {exportsClearedError}
                </Typography>
              </Box>
            )}
            <CardStatsWithAreaChart
              stats={`${exportsCleared?.exportsCleared || 0}`}
              chartColor="warning"
              avatarColor="warning"
              title="Cleared Shipments (Type-Export)"
              avatarIcon="ri:ship-2-line"
              chartSeries={[{ data: exportsCleared?.data || [] }]}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ContainerizedShipments />
          </Grid>
          <Grid item xs={12} md={6}>
            <LclFcl
              labelColor={labelColor}
              info={horizontalBarInfo}
              borderColor={borderColor}
              legendColor={legendColor}
              warning={warningColorShade}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ShippingCompany token={token} partnerID={partnerID} dateRange={dateRange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OriginData token={token} partnerID={partnerID} dateRange={dateRange} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Demurrages />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Detention />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LineField />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ImportRatio />
          </Grid>
          <Grid item xs={12} sm={12}>
            {/* <ShippingLines /> */}
          </Grid>
        </Grid>
      </KeenSliderWrapper>
    )
  }

  const renderExports = () => {
    return (
      <KeenSliderWrapper>
        <ComingSoon />
      </KeenSliderWrapper>
    )
  }

  const renderTransports = () => {
    return (
      <KeenSliderWrapper>
        <ComingSoon />
      </KeenSliderWrapper>
    )
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue)
  }

  return (
    <ApexChartWrapper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          '& > *': { maxWidth: 'auto' }
        }}
      >
        <DatePickerWrapper>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <FormControl fullWidth sx={{ pt: 1, pb: 2 }}>
                <Autocomplete
                  disablePortal
                  id="partner"
                  size="small"
                  value={
                    getPartnersToRender()?.find((partner) => partner.id === partnerID) ||
                    null
                  }
                  options={getPartnersToRender() || []}
                  getOptionLabel={(option) => option.name}
                  sx={{ display: 'flex', width: '100%' }}
                  onChange={(event, option) =>
                    handleOnPartnerChange(option?.id || 'undefined')
                  }
                  renderInput={(params) => <TextField {...params} label="Partners" />}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <DatePicker
                selectsRange
                endDate={endDate}
                id="apexchart-bar"
                selected={startDate}
                startDate={startDate}
                onChange={handleOnDateChange}
                placeholderText="Click to select a date"
                customInput={
                  <CustomInput
                    start={startDate as Date | number}
                    end={endDate as Date | number}
                  />
                }
              />
            </Grid>
          </Grid>
        </DatePickerWrapper>
      </Box>
      <TabContext value={activeTab}>
        <TabList
          variant="scrollable"
          scrollButtons="auto"
          onChange={handleTabChange}
          aria-label="forced scroll tabs example"
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value="imports"
            label="Imports"
            icon={<Icon fontSize="1.125rem" icon="fluent:vehicle-ship-24-filled" />}
          />
          <Tab
            value="exports"
            label="Exports"
            icon={<Icon fontSize="1.125rem" icon="ri:ship-2-fill" />}
          />
          <Tab
            value="transports"
            label="Transport"
            icon={<Icon fontSize="1.125rem" icon="icon-park-outline:transporter" />}
          />
        </TabList>
        <Box sx={{ mt: 6 }}>
          <TabPanel sx={{ p: 0 }} value="imports">
            <div ref={componentRef}>{renderImports()}</div>
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="exports">
            {renderExports()}
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="transports">
            {renderTransports()}
          </TabPanel>
        </Box>
      </TabContext>
      <Box sx={{ mt: 6 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={generatePdf}
          startIcon={<Icon icon="ri:printer-fill" />}
        >
          Download Report
        </Button>
      </Box>
    </ApexChartWrapper>
  )
}

export default AnalyticsDashboard
