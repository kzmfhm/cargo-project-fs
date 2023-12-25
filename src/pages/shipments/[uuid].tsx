// ** React Imports
import { SyntheticEvent, useState, useEffect } from 'react'

// ** Redux
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { getShipment } from 'src/redux/slices/shipments'

import { Grid, Box } from '@mui/material'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import { useRouter } from 'next/router'

// ** Custom Components
import BasicDetails from 'src/views/shipments/detail/BasicDetails'
import Timeline from 'src/views/shipments/detail/Timeline'
import Containers from 'src/views/shipments/detail/Containers'
import Map from 'src/views/shipments/detail/Map'
import Comments from 'src/views/shipments/detail/Comments'
import Files from 'src/views/shipments/detail/Files'

import LinkCard from 'src/views/shipments/detail/LinkCard'
import Partners from 'src/views/shipments/detail/Partners'
import ImportantDates from 'src/views/shipments/detail/ImportantDates'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import { useAuth } from 'src/hooks/useAuth'

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

const ShipmentDetailPrivate = () => {
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState<string>('basic')
  const shipment = useAppSelector((state) => state.shipments.shipment)

  const router = useRouter()
  const { uuid } = router.query

  const auth = useAuth()
  const token = auth.user?.token as string | ''

  // For loading the shipment
  useEffect(() => {
    if (uuid) {
      dispatch(getShipment(token, uuid as string))
    }
  }, [uuid])

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={8} xl={9} lg={9}>
        <TabContext value={activeTab}>
          <TabList
            variant="scrollable"
            scrollButtons="auto"
            onChange={handleChange}
            aria-label="forced scroll tabs example"
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
          >
            <Tab
              value="basic"
              label="Basic Details"
              icon={<Icon fontSize="1.125rem" icon="bxs:ship" />}
            />
            <Tab
              value="timeline__containers"
              label="Timeline & Containers"
              icon={<Icon fontSize="1.125rem" icon="ic:baseline-timeline" />}
            />
            <Tab
              value="map"
              label="Map"
              icon={<Icon fontSize="1.125rem" icon="mdi:map-marker-multiple" />}
            />
            <Tab
              value="comments"
              label="Comments"
              icon={<Icon fontSize="1.125rem" icon="dashicons:admin-comments" />}
            />
            <Tab
              value="files"
              label="Files"
              icon={<Icon fontSize="1.125rem" icon="simple-icons:files" />}
            />
          </TabList>
          <Box sx={{ mt: 6 }}>
            <TabPanel sx={{ p: 0 }} value="basic">
              <BasicDetails />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="timeline__containers">
              <Timeline />
              <Containers />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="map">
              <Map />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="comments">
              <Comments />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="files">
              <Files />
            </TabPanel>
          </Box>
        </TabContext>
      </Grid>
      <Grid item xs={12} md={4} xl={3} lg={3}>
        <LinkCard slug={shipment?.slug ? shipment?.slug : ''} />
        <Partners />
        <ImportantDates />
      </Grid>
    </Grid>
  )
}

export default ShipmentDetailPrivate
