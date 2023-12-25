// ** React Imports
import { useState } from 'react'

// Next router
import { useRouter } from 'next/router'

// ** Store Vars
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { setSelectedSchedule } from 'src/redux/slices/schedules'

// ** MUI Imports
import Box from '@mui/material/Box'

import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid, { GridProps } from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import Stack from '@mui/material/Stack'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'

import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'

import { Schedule } from 'src/db/types/schedules'
import { formatDatetime } from 'src/utils/dateformaters'
import { calculateDateDifference } from 'src/utils/calculateDateDifference'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// Styled Grid component
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  [theme.breakpoints.up('md')]: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}))

// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none',
    },
  },
})

// Define the interface for props
interface SearchedRouteCardProps {
  schedule: Schedule
  // Add any additional props specific to SearchedRouteCard here
}

const SearchedRouteCard: React.FC<SearchedRouteCardProps> = ({ schedule }) => {
  // ** Router
  const router = useRouter()

  // ** Store Vars
  const dispatch = useAppDispatch()
  const { originCharges, destinationCharges, freightCharges } = useAppSelector((state) => state.schedules)

  // ** State
  const [collapse, setCollapse] = useState<boolean>(false)

  const handleClick = () => {
    setCollapse(!collapse)
  }

  const isBookButtonDisabled = schedule.total_price === 0

  return (
    <Card>
      <Grid container spacing={6}>
        <StyledGrid item md={3} xs={12}>
          <CardContent
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              width={125}
              alt="Shipping Line Logo"
              src={schedule.sealine.logo ? schedule.sealine.logo : `/images/pages/image-not-found.jpeg`}
            />
          </CardContent>
        </StyledGrid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            pt: ['0 !important', '0 !important', '1.5rem !important'],
            pl: ['1.5rem !important', '1.5rem !important', '0 !important'],
          }}
        >
          <CardContent
            sx={{
              p: (theme) => `${theme.spacing(1, 5.75, 0)} !important`,
            }}
          >
            <Box
              sx={{
                gap: 2,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
                <Chip
                  label={schedule.route_type}
                  // Color if not DIRECT
                  sx={{
                    backgroundColor: schedule.route_type === 'Direct' ? '' : 'primary.main',
                    color: schedule.route_type === 'Direct' ? '' : 'White',
                    p: (theme) => `${theme.spacing(0.5, 1.5)} !important`,
                  }}
                />
              </Stack>

              {/* Color if its INDIRECT, with VIA Jebel Ali */}
              <Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
                {calculateDateDifference(
                  schedule?.destination_arrival_date_estimated as string,
                  schedule?.origin_departure_date_estimated as string,
                )}{' '}
                Days
              </Typography>
            </Box>
            <Timeline>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="secondary">
                    <Icon fontSize="1.25rem" icon="material-symbols:start" />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent
                  sx={{
                    mt: -5,
                    mb: (theme) => `${theme.spacing(-1.85)} !important`,
                  }}
                >
                  <Box
                    sx={{
                      mb: -1.5,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="h6" sx={{ mr: 1 }}>
                      {formatDatetime(schedule.origin_departure_date_estimated)}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                      ETD
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    <span>
                      {schedule.route.origin.city}, {schedule.route.origin.country}
                    </span>
                  </Typography>
                  <Divider
                    sx={{
                      borderStyle: 'dashed',
                      my: (theme) => `${theme.spacing(1)} !important`,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      fontWeight: 500,
                      color: 'text.primary',
                    }}
                  >
                    <Icon fontSize={20} icon="ri:ship-line" /> <span>{schedule.vessel_name}</span>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      fontWeight: 500,
                      color: 'text.primary',
                    }}
                  >
                    <Icon fontSize={20} icon="material-symbols:route-outline" /> <span>{schedule.scac}</span>
                  </Typography>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary">
                    <Icon fontSize="1.25rem" icon="tabler:map-pin" />
                  </TimelineDot>
                </TimelineSeparator>
                <TimelineContent sx={{ mt: 0, pb: 0 }}>
                  <Box
                    sx={{
                      mb: -1.5,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="h6" sx={{ mr: 2 }}>
                      {formatDatetime(schedule.destination_arrival_date_estimated)}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                      ETA
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    <span>
                      {schedule.route.destination.city}, {schedule.route.destination.country}
                    </span>
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </CardContent>
          <CardActions className="card-action-dense">
            <Box
              sx={{
                mt: -10,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Button onClick={handleClick}>Details</Button>
              <IconButton size="small" onClick={handleClick}>
                <Icon fontSize="1.875rem" icon={collapse ? 'tabler:chevron-up' : 'tabler:chevron-down'} />
              </IconButton>
            </Box>
          </CardActions>
          <Collapse in={collapse}>
            <Divider sx={{ m: '0 !important' }} />
            <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12}>
                  <Box
                    sx={{
                      mb: 6.75,
                      display: 'flex',
                      alignItems: 'center',
                      '& svg': { color: 'primary.main', mr: 2.75 },
                    }}
                  >
                    <Icon icon="solar:document-bold" fontSize={20} />
                    <Typography sx={{ fontWeight: 500, color: 'text.primary' }}>SI Cutoff:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{formatDatetime(schedule.vgm_cut_off)}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      '& svg': { color: 'primary.main', mr: 2.75 },
                    }}
                  >
                    <Icon icon="streamline:travel-places-anchor-anchor-marina-harbor-port" fontSize={20} />
                    <Typography sx={{ fontWeight: 500, color: 'text.primary' }}>Port Cutoff:</Typography>{' '}
                    <Typography sx={{ color: 'text.secondary' }}>{formatDatetime(schedule.terminal_cutoff)}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Collapse>
        </Grid>
        <Grid
          item
          md={3}
          xs={12}
          sx={{
            pt: ['0 !important', '1.5rem !important'],
            pl: ['1.5rem !important', '0 !important'],
          }}
        >
          <CardContent
            sx={{
              height: '100%',
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'action.hover',
              p: (theme) => `${theme.spacing(9, 5, 16)} !important`,
            }}
          >
            <div>
              <Box
                sx={{
                  mb: 0.5,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6">$</Typography>
                <Typography
                  variant="h6"
                  sx={{
                    lineHeight: 1,
                    fontWeight: 600,
                    fontSize: '2.5rem !important',
                  }}
                >
                  {schedule.total_price}
                </Typography>
                <Typography variant="h6">USD</Typography>
              </Box>
              <Typography
                sx={{
                  mb: 2.75,
                  display: 'flex',
                  color: 'text.secondary',
                  flexDirection: 'column',
                }}
              >
                {/* <span>Per Container</span> */}
              </Typography>

              <Tooltip
                sx={{
                  mb: 2.75,
                  display: 'flex',
                  color: 'text.secondary',
                  flexDirection: 'column',
                }}
                title={isBookButtonDisabled ? 'Booking is unavailable' : ''}
                disableFocusListener
              >
                <span>
                  <Button
                    variant="contained"
                    onClick={() => {
                      if (!isBookButtonDisabled) {
                        router.push('/bookings/confirmation')
                        dispatch(setSelectedSchedule(schedule))
                      }
                    }}
                    disabled={isBookButtonDisabled}
                  >
                    Book Now
                  </Button>
                </span>
              </Tooltip>
            </div>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default SearchedRouteCard
