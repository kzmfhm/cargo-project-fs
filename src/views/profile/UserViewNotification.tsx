import { useState } from 'react'
import {
  Card,
  CardHeader,
  Typography,
  CardContent,
  Grid,
  Checkbox,
  LinearProgress,
  Box
} from '@mui/material'

// ** Redux
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { updateUserNotifcations } from 'src/redux/slices/accounts'

const UserViewNotification = () => {
  // ** Redux
  const dispatch = useAppDispatch()
  const {
    userNotifcationsLoading,
    userNotifcationsError,
    userNotifcationsSuccess,
    userData: user
  } = useAppSelector((state) => state.accounts)

  // ** States for checkboxes
  const [igmCheck, setIgmCheck] = useState(user?.notifyTracking)
  const [trackingCheck, setTrackingCheck] = useState(user?.notifyTracking)
  const [commentsCheck, setCommentsCheck] = useState(user?.comments_alert_on_emails)
  const [whatsappCheck, setWhatsappCheck] = useState(user?.notifyWhatsapp)

  // ** Constants for endpoints and API calls
  const igmEndpoint = 'toggle-igm-emails-notifications'
  const trackingEndpoint = 'toggle-tracking-notifcations'
  const commentsEndpoint = 'toggle_comments_alert_on_emails'
  const whatsappEndpoint = 'toggle_whatsapp_alerts'
  const token = user?.token ? user.token : ''
  const id = user?.id ? user.id : ''

  const handleIGMCheck = (_e: React.ChangeEvent<HTMLInputElement>) => {
    setIgmCheck(!igmCheck)
    dispatch(updateUserNotifcations(token, id, igmEndpoint))
  }

  const handleTrackingCheck = (_e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingCheck(!trackingCheck)
    dispatch(updateUserNotifcations(token, id, trackingEndpoint))
  }

  const handleCommentsCheck = (_e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentsCheck(!commentsCheck)
    dispatch(updateUserNotifcations(token, id, commentsEndpoint))
  }

  const handleWhatsappCheck = (_e: React.ChangeEvent<HTMLInputElement>) => {
    setWhatsappCheck(!whatsappCheck)
    dispatch(updateUserNotifcations(token, id, whatsappEndpoint))
  }

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        {userNotifcationsLoading && <LinearProgress sx={{ height: '2px' }} />}
        {userNotifcationsError && (
          <Typography color="error" variant="body2">
            {userNotifcationsError}
          </Typography>
        )}
      </Box>
      {userNotifcationsSuccess && (
        <Typography color="success" variant="body2">
          {userNotifcationsSuccess}
        </Typography>
      )}

      <CardHeader title="Notifications" sx={{ pb: 1.5 }} />
      <CardContent>
        <Typography sx={{ mb: 6, color: 'text.secondary' }}>
          You will receive notification for the below selected items.
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            <Checkbox checked={igmCheck} onChange={handleIGMCheck} /> Allow IGM
            notifications via email
          </Grid>
          <Grid item xs={12} md={12}>
            <Checkbox checked={trackingCheck} onChange={handleTrackingCheck} /> Allow
            Tracking notifications via email
          </Grid>
          <Grid item xs={12} md={12}>
            <Checkbox checked={commentsCheck} onChange={handleCommentsCheck} /> Allow
            comments related notifications via email
          </Grid>
          <Grid item xs={12} md={12}>
            <Checkbox checked={whatsappCheck} onChange={handleWhatsappCheck} /> Allow
            Whatsapp notifications
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default UserViewNotification
