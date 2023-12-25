// ** React Imports
import { useEffect, useState } from 'react'
import { Grid, TextField, FormControl, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import PriorityShipments from 'src/views/dashboards/overview/PriorityShipments'
import ActionsToTake from 'src/views/dashboards/overview/ActionsToTake'
import ShipmentsAtPort from 'src/views/dashboards/overview/ShipmentsAtPort'
import UpcomingShipments from 'src/views/dashboards/overview/UpcomingShipments'
import GatedOutShipments from 'src/views/dashboards/overview/GatedOutShipments'

import Transportation from 'src/views/dashboards/overview/Transportation'
// ** Custom Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import {
  setPartnerID,
  getGatedOutShipments,
  getUpcomingShipments,
  getRequireDocuments,
  getPriorityShipments,
  getAtPortShipments
} from 'src/redux/slices/overview'

import { useAuth } from 'src/hooks/useAuth'
import ComingSoon from 'src/@core/components/coming-soon'

import Autocomplete from '@mui/material/Autocomplete'

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

const OverviewDashboard = () => {
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState<string>('imports')
  const { partnerID } = useAppSelector((state) => state.overview)
  const { allPartners } = useAppSelector((state) => state.accounts)

  const auth = useAuth()

  const getPartnersToRender = () => {
    if (auth?.user?.role === 'admin') {
      return allPartners
    } else {
      return auth?.user?.partner
    }
  }

  const handleOnPartnerChange = (partnerID: string) => {
    dispatch(setPartnerID(partnerID))
  }

  useEffect(() => {
    dispatch(getGatedOutShipments(auth?.user?.token as string, partnerID))
    dispatch(getUpcomingShipments(auth?.user?.token as string, partnerID))
    dispatch(getRequireDocuments(auth?.user?.token as string, partnerID))
    dispatch(getPriorityShipments(auth?.user?.token as string, partnerID))
    dispatch(getAtPortShipments(auth?.user?.token as string, partnerID))
  }, [partnerID])

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue)
  }

  const renderImports = () => {
    return (
      <ApexChartWrapper>
        <KeenSliderWrapper>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <PriorityShipments />
              <UpcomingShipments />
              <ShipmentsAtPort />
            </Grid>
            <Grid item xs={12} md={6}>
              <ActionsToTake />
              <GatedOutShipments />
            </Grid>
          </Grid>
        </KeenSliderWrapper>
      </ApexChartWrapper>
    )
  }

  const renderExports = () => {
    return (
      <ApexChartWrapper>
        <ComingSoon />
      </ApexChartWrapper>
    )
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          '& > *': { maxWidth: 'auto' }
        }}
      >
        <div>
          <FormControl fullWidth sx={{ pt: 1, pb: 2 }}>
            <Autocomplete
              disablePortal
              id="partner"
              size="small"
              value={
                getPartnersToRender()?.find((partner) => partner.id === partnerID) || null
              }
              options={getPartnersToRender() || []}
              getOptionLabel={(option) => option.name}
              sx={{ display: 'flex', width: '100%' }}
              onChange={(event, option) => handleOnPartnerChange(option?.id || '%27%27')}
              renderInput={(params) => <TextField {...params} label="Partners" />}
            />
          </FormControl>
        </div>
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
            {renderImports()}
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="exports">
            {renderExports()}
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="transports">
            <Transportation />
          </TabPanel>
        </Box>
      </TabContext>
    </>
  )
}

export default OverviewDashboard
