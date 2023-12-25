// ** React Imports
import { SyntheticEvent, useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiTab, { TabProps } from '@mui/material/Tab'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import CircularProgress from '@mui/material/CircularProgress'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// **  Components Imports
import UserViewBilling from 'src/views/profile/UserViewBilling'
import UserViewPartners from 'src/views/profile/UserViewPartners'
import UserViewSecurity from 'src/views/profile/UserViewSecurity'
import UserViewConnection from 'src/views/profile/UserViewConnection'
import UserViewNotification from 'src/views/profile/UserViewNotification'

interface Props {
  tab: string
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

const UserViewRight = ({ tab }: Props) => {
  // ** State
  const [activeTab, setActiveTab] = useState<string>(tab)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  return (
    <TabContext value={activeTab}>
      <TabList
        variant="scrollable"
        scrollButtons="auto"
        onChange={handleChange}
        aria-label="forced scroll tabs example"
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Tab
          value="partners"
          label="Partners"
          icon={<Icon fontSize="1.125rem" icon="tabler:user-check" />}
        />
        <Tab
          value="security"
          label="Security"
          icon={<Icon fontSize="1.125rem" icon="tabler:lock" />}
        />
        <Tab
          value="billing-plan"
          label="Billing & Plan"
          icon={<Icon fontSize="1.125rem" icon="tabler:currency-dollar" />}
        />
        <Tab
          value="notification"
          label="Notification"
          icon={<Icon fontSize="1.125rem" icon="tabler:bell" />}
        />
        <Tab
          value="connection"
          label="Connection"
          icon={<Icon fontSize="1.125rem" icon="tabler:link" />}
        />
      </TabList>
      <Box sx={{ mt: 6 }}>
        {isLoading ? (
          <Box
            sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}
          >
            <CircularProgress sx={{ mb: 4 }} />
            <Typography>Loading...</Typography>
          </Box>
        ) : (
          <>
            <TabPanel sx={{ p: 0 }} value="partners">
              <UserViewPartners />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="security">
              <UserViewSecurity />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="billing-plan">
              <UserViewBilling />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="notification">
              <UserViewNotification />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="connection">
              <UserViewConnection />
            </TabPanel>
          </>
        )}
      </Box>
    </TabContext>
  )
}

export default UserViewRight
