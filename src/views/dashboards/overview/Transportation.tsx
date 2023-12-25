import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer, MarkerClusterer } from '@react-google-maps/api'
// Types
import { LatLngLiteral, DirectionsResult, MapOptions, TransportationJob } from 'src/db/types/transportation'
// MUI
import { Box, Grid, Card, CardContent, Typography, LinearProgress, TextField, Button, Link, Avatar } from '@mui/material'
import Icon from 'src/@core/components/icon'
// Hooks
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import { useSettings } from 'src/@core/hooks/useSettings'
// Redux
import { getInProgressTransportationJobs } from 'src/redux/slices/overview'
import { useAppSelector, useAppDispatch } from 'src/hooks/useRedux'
// Utils
import hasReachedToCoordinate from 'src/utils/hasReachedToCoordinate'
// Map Styles
import { ScrollableBox, MapOverlyTop, MapOverlyBottom } from 'src/map-styles'

const Transportation = () => {
  // ** Hooks
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { settings } = useSettings()

  const auth = useAuth()
  const router = useRouter()
  const mapRef = useRef<GoogleMap>()
  const geocoderRef = useRef<google.maps.Geocoder | null>(null)

  // ** Google Map Loader
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  })

  // ** Memos (Optimizations) for Google Map
  const center = useMemo<LatLngLiteral>(() => {
    return { lat: 24.886362, lng: 67.165304 }
  }, [])

  // ** Map Options for Google Map (I.e disable default UI, zoom control, etc)

  // Map ID's
  // c7ef760c3784ab0a Logistcs 2
  // c200d2b762eb7698 Logistics Styles
  // 3613d63eeb4b3370 Dark Styles
  const mapId = useMemo(() => (settings.mode === 'dark' ? '3613d63eeb4b3370' : 'c200d2b762eb7698'), [settings.mode])
  const options = useMemo<MapOptions>(() => {
    return {
      disableDefaultUI: true,
      zoomControl: false,
      clickableIcons: false,
      mapId,
      zoom: 7,
    }
  }, [settings.mode])

  // ** Redux States
  const { transportationJobsLoading, transportationJobs, transportationJobsError, partnerID } = useAppSelector((state) => state.overview)
  useEffect(() => {
    // Load the in progress transportation jobs
    dispatch(getInProgressTransportationJobs(auth?.user?.token as string, partnerID))
  }, [partnerID]) // Activate this when the API is ready

  //  Callbacks
  const onLoad = useCallback((map: any) => (mapRef.current = map), [])
  const onUnmount = useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  // ** States
  const [map, setMap] = useState<GoogleMap | null>(null)
  const [isVisible, setIsVisible] = useState(true)

  const [containerStyle, setContainerStyle] = useState({
    width: '100%',
    height: '500px',
  })

  const [currentAddress, setCurrentAddress] = useState('')
  const [remainingDistanceToPointB, setRemainingDistanceToPointB] = useState<string>('')

  // Directions State
  const [beforePointADirections, setBeforePointADirections] = useState<DirectionsResult[] | null>(null) // Yellow with  Blue Dots
  const [tentativeRouteDirections, setTentativeRouteDirections] = useState<DirectionsResult | null>(null) // Red Poly Line
  const [followedRouteDirections, setFollowedRouteDirections] = useState<DirectionsResult[] | null>(null) // Blue Poly Line
  const [followedRoutePostPointBDirections, setFollowedRoutePostPointBDirections] = useState<DirectionsResult[] | null>(null) // Light Grey Poly Line

  const [selectedJob, setSelectedJob] = useState<TransportationJob | null>(null)
  const [selectedCard, setSelectedCard] = useState(null as number | null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMapInteracting, setIsMapInteracting] = useState(false)

  // ** Map Directions Renderer
  const directionServices = (job: TransportationJob) => {
    setTentativeRouteDirections(null) // Resetting tentativeRouteDirections state here
    setBeforePointADirections(null) // Resetting beforePointADirections state here
    setFollowedRouteDirections(null) // Resetting followedRouteDirections state here
    setFollowedRoutePostPointBDirections(null) // Resetting followedRoutePostPointBDirections state here

    const service = new google.maps.DirectionsService()
    setSelectedJob(job)
    setIsVisible(true)

    //  ** Start of Pulling Directions

    // Step 1: Pull the tentative route from Point A to Point B
    service.route(
      {
        origin: job.expected_route_waypoints[0]?.location,
        waypoints: [
          {
            location: job.expected_route_waypoints[0]?.location,
            stopover: false,
          },
          {
            location: job.expected_route_waypoints[1]?.location,
            stopover: false,
          },
        ], // A and B waypoints
        destination: /* Second item.location in expected_route_waypoints */ job.expected_route_waypoints[1]?.location || job.destination,

        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          setTentativeRouteDirections(result)
        }
      },
    )

    // Step 2: Pull the followed pre Route, before Location A
    function calculatedEndOfPreRoute() {
      const locationAWaypoint = job.expected_route_waypoints[0]?.location // A waypoint
      // iterate over each followedWaypoints and check if hasReachedToCoordinate returns true for any of the followedWaypoints
      for (let i = 0; i < job.followed_route_waypoints.length; i++) {
        const followedWaypoint = job.followed_route_waypoints[i].location
        if (hasReachedToCoordinate(locationAWaypoint, followedWaypoint)) {
          return followedWaypoint
        }
      }
    }
    const lastWaypointOfPreRouteIndex = job.followed_route_waypoints.findIndex(
      (waypoint) => waypoint.location === calculatedEndOfPreRoute(), //Returns the index of the last reached waypoint or -1 if not found
    )
    const waypointsToGoForPreRoute = job.followed_route_waypoints.slice(0, lastWaypointOfPreRouteIndex + 1)

    for (let i = 0; i < waypointsToGoForPreRoute.length; i += 25) {
      const slicedWaypoints = waypointsToGoForPreRoute.slice(i, i + 25) // Slicing the waypoints into chunks of 25
      service.route(
        {
          origin: slicedWaypoints[0].location, // First Item in a Chunk
          waypoints: slicedWaypoints || [{ location: job.current_location, stopover: false }], // If the slicedWaypoints is empty, then use the current_location as the origin
          destination: slicedWaypoints[slicedWaypoints.length - 1].location, // Last Item in a Chunk
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK' && result) {
            setBeforePointADirections((prev) => [...(prev || []), result])
          }
        },
      )
    }

    // Step 3: Pull the followed route (from the Point A to the last reached waypoint untill Point B)
    function calculatedEndOfFollowedRoute() {
      // Iterates over each waypoint in the followed_route_waypoints route
      const locationAWaypoint = job.expected_route_waypoints[1]?.location // B waypoint
      // Check if any of the followed waypoints matches the expected waypoint
      for (let j = 0; j < job.followed_route_waypoints.length; j++) {
        const followedWaypoint = job.followed_route_waypoints[j].location
        if (hasReachedToCoordinate(locationAWaypoint, followedWaypoint)) {
          return followedWaypoint
        }
      }
    }

    const firstIndexOfPointAToB = waypointsToGoForPreRoute ? waypointsToGoForPreRoute.length - 1 : 0
    const lastReachedWaypointIndex = job.followed_route_waypoints.findIndex(
      (waypoint) => waypoint.location === calculatedEndOfFollowedRoute(), //Returns the index of the last reached waypoint or -1 if not found
    )
    let lastIndexOfPointAToB = lastReachedWaypointIndex + 1
    if (lastReachedWaypointIndex === -1) {
      lastIndexOfPointAToB = job.followed_route_waypoints.length - 1
    }
    const waypointsToGoForPointAToBRoute = job.followed_route_waypoints.slice(firstIndexOfPointAToB, lastIndexOfPointAToB + 1)
    // Create waypoints for direction services request
    const waypoints = waypointsToGoForPointAToBRoute.map((waypoint) => ({
      location: waypoint.location,
      stopover: false,
    }))
    for (let i = 0; i < waypoints.length; i += 25) {
      const slicedWaypoints = waypoints.slice(i, i + 25)
      service.route(
        {
          origin: slicedWaypoints[0].location,
          waypoints: slicedWaypoints || [{ location: job.current_location, stopover: false }],
          destination: slicedWaypoints[slicedWaypoints.length - 1].location,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK' && result) {
            setFollowedRouteDirections((prev) => [...(prev || []), result])
          }
        },
      )
    }

    // Step: 4 Pull the followed route (from the last reached waypoint to the end of the route) if any
    if (lastReachedWaypointIndex !== -1) {
      const followedRoutePostPointBWaypoints = job.followed_route_waypoints.slice(
        lastIndexOfPointAToB - 1,
        job.followed_route_waypoints.length,
      )
      const followedRoutePostPointBWaypointsForDirectionService = followedRoutePostPointBWaypoints.map((waypoint) => ({
        location: waypoint.location,
        stopover: false,
      }))
      for (let i = 0; i < followedRoutePostPointBWaypointsForDirectionService.length; i += 25) {
        const slicedWaypoints = followedRoutePostPointBWaypointsForDirectionService.slice(i, i + 25)
        service.route(
          {
            origin: slicedWaypoints[0].location,
            waypoints: slicedWaypoints || [{ location: job.current_location, stopover: false }],
            destination: slicedWaypoints[slicedWaypoints.length - 1].location,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === 'OK' && result) {
              setFollowedRoutePostPointBDirections((prev) => [...(prev || []), result])
            }
          },
        )
      }
    }

    //  ** End of Pulling Directions (Step 1, 2, 3, 4) ** //

    // Remaining Distance
    const request = {
      origin: calculatedEndOfFollowedRoute() || job.current_location, // Last reached waypoint near Point B
      destination: job.expected_route_waypoints[1].location, // B waypoint
      travelMode: google.maps.TravelMode.DRIVING,
    }
    //@ts-ignore
    service.route(request, (response, status) => {
      if (status === 'OK') {
        //@ts-ignore
        const distance = response.routes[0].legs[0]?.distance.text
        setRemainingDistanceToPointB(distance)
      }
    })
  } // End of directionServices function

  // ** Handlers
  const handleMapDragStart = useCallback(() => {
    setIsMapInteracting(true)
  }, [])

  const handleMapDragEnd = useCallback(() => {
    setIsMapInteracting(false)
  }, [])

  const handleTransporationJobClick = (job: TransportationJob) => {
    setSelectedCard(job.id)
    directionServices(job)
  }

  // ** Filters the jobs based on the search query
  const filteredJobs = useMemo(() => {
    if (searchQuery.trim() === '') {
      return transportationJobs
    }
    return transportationJobs.filter(
      (job) =>
        job.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.customer_reference_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.item_description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery, transportationJobs])

  const matches = useMediaQuery(theme.breakpoints.up('md'))
  //** useEffects
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    const fetchCurrentAddress = () => {
      timeoutId = setTimeout(() => {
        geocoderRef.current = new google.maps.Geocoder()
        geocoderRef.current.geocode(
          {
            location: selectedJob?.current_location,
          },
          (results, status) => {
            if (status === 'OK') {
              if (results && results[0]) {
                setCurrentAddress(results[0].formatted_address)
              } else {
                setCurrentAddress('Address not found')
              }
            } else {
              setCurrentAddress('Geocoder failed')
            }
          },
        )
      }, 1000)
    }
    fetchCurrentAddress()
    return () => {
      clearTimeout(timeoutId)
    }
  }, [selectedJob])

  useEffect(() => {
    if (matches) {
      // If the screen is md or larger then set the height to 700px else set it to 500px (default)
      setContainerStyle({
        ...containerStyle,
        height: '700px', // Update the desired height here for desktop
      })
    } else {
      setContainerStyle({
        ...containerStyle,
        height: '500px', // Update the desired height here for mobile
      })
    }
  }, [matches])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    const hideOverlay = () => {
      setIsVisible(false)
    }
    const showOverlay = () => {
      setIsVisible(true)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(hideOverlay, 3000) // Hide after 3 seconds of inactivity
    }
    showOverlay()
    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <Box position="relative">
      <Grid container spacing={6}>
        <Grid item xs={12} md={3} lg={3} xl={2}>
          {transportationJobsLoading && <LinearProgress sx={{ height: '2px' }} />}
          {transportationJobsError && (
            <Box sx={{ p: 3 }}>
              <Typography variant="body2" color="error">
                {transportationJobsError}
              </Typography>
            </Box>
          )}

          {transportationJobs.length > 0 && (
            <>
              {/* Search Input with Search Icon */}
              <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                size="small"
                sx={{
                  width: '100%',
                  mb: 2,
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Typography
                variant="body2"
                sx={{
                  mb: 2,
                  textAlign: 'right',
                }}
              >
                Active Jobs: {filteredJobs.length}
              </Typography>

              <ScrollableBox>
                {filteredJobs.map((job) => (
                  <Card
                    sx={{
                      '&:hover': {
                        cursor: 'pointer',
                        backgroundImage: `linear-gradient(to right, #145DA0 2%, transparent 2%)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '0 0',
                        transition: 'background-position 0.3s',
                      },
                      mb: 2,
                      backgroundColor: selectedCard === job.id ? '#145DA0' : 'inherit',
                    }}
                    onClick={() => handleTransporationJobClick(job)}
                    key={job.id}
                  >
                    <CardContent>
                      <Typography
                        sx={{
                          color: selectedCard === job.id ? '#fff' : 'text.primary',
                        }}
                      >
                        {job.driver} - {job.vehicle}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography
                            noWrap
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              color: selectedCard === job.id ? '#fff' : 'text.primary',
                            }}
                          >
                            {job.customer_reference_number}
                          </Typography>
                          <Typography
                            noWrap
                            variant="caption"
                            sx={{
                              color: selectedCard === job.id ? '#fff' : 'text.primary',
                            }}
                          >
                            {job.item_description}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </ScrollableBox>
            </>
          )}
        </Grid>
        <Grid item xs={12} md={9} lg={9} xl={10}>
          {transportationJobs.length === 0 ? (
            <>
              <Typography variant="body1" sx={{ pl: 4, pt: 3 }}>
                No Active Jobs were found, to see completed jobs, please click {''}
                <Link
                  sx={{
                    color: 'primary.main',
                  }}
                  onClick={() => router.push('/transportation/jobs/')}
                >
                  here
                </Link>
              </Typography>
            </>
          ) : (
            <>
              <Card>
                {isLoaded && (
                  <GoogleMap
                    key={settings.mode}
                    mapContainerStyle={containerStyle}
                    center={center}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    options={options}
                    onDragStart={handleMapDragStart}
                    onDragEnd={handleMapDragEnd}
                  >
                    {tentativeRouteDirections && (
                      <MapOverlyTop
                        style={{
                          opacity: isVisible && !isMapInteracting ? 1 : 0,
                          background: settings.mode === 'dark' ? '#25293F' : '',
                        }}
                        onMouseMove={() => setIsVisible(true)} // Show overlay when the mouse moves over it
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ mr: 2 }}>
                              <Icon icon="tabler:location" width={34} height={34} />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: 900,
                                }}
                              >
                                Current Location
                              </Typography>
                              <Typography variant="body2">{currentAddress}</Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ mr: 2 }}>
                              <Icon icon="mdi:map-marker-distance" width={24} height={24} />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: 900,
                                }}
                              >
                                Remaining Distance
                              </Typography>
                              <Typography variant="body2">{remainingDistanceToPointB}</Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ mr: 2 }}>
                              <Icon icon="ic:sharp-speed" width={24} height={24} />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: 900,
                                }}
                              >
                                Current Speed
                              </Typography>
                              <Typography variant="body2">{selectedJob?.current_speed} MPH</Typography>
                            </Box>
                          </Box>
                        </Box>
                      </MapOverlyTop>
                    )}

                    {/* Child components, such as markers, info windows, Clusterers, directions etc. */}

                    {tentativeRouteDirections && (
                      <>
                        <DirectionsRenderer
                          directions={tentativeRouteDirections}
                          options={{
                            polylineOptions: {
                              zIndex: 20,
                              strokeColor: '#FF0000',
                              strokeWeight: 0,
                              strokeOpacity: 9,
                              icons: [
                                {
                                  offset: '0',
                                  repeat: '10px',
                                },
                                {
                                  icon: {
                                    path: 'M 0,-1 0,1',
                                    strokeColor: '#145DA0', // Light gray color for the dots
                                    strokeOpacity: 0.5, // Half-transparent dots
                                    scale: 4,
                                  },
                                  offset: '0',
                                  repeat: '20px',
                                },
                              ],
                            },
                            suppressMarkers: false,
                          }}
                        />
                      </>
                    )}

                    {beforePointADirections?.map((route) => (
                      <DirectionsRenderer
                        directions={route}
                        options={{
                          polylineOptions: {
                            zIndex: 50,
                            strokeColor: '#fcba03',
                            strokeWeight: 6,
                            strokeOpacity: 1,
                            icons: [
                              {
                                offset: '0',
                                repeat: '10px',
                              },
                              {
                                icon: {
                                  path: 'M 0,-1 0,1',
                                  strokeColor: '#FF0000', // Light gray color for the dots
                                  strokeOpacity: 0.5, // Half-transparent dots
                                  scale: 4,
                                },
                                offset: '0',
                                repeat: '50px',
                              },
                            ],
                          },
                          suppressMarkers: true,
                        }}
                      />
                    ))}

                    {followedRouteDirections?.map((route) => (
                      <DirectionsRenderer
                        directions={route}
                        options={{
                          polylineOptions: {
                            strokeColor: '#145DA0',
                            zIndex: 60,
                            strokeWeight: 7,
                            strokeOpacity: 1, // Fully opaque line
                          },
                          suppressMarkers: true,
                        }}
                      />
                    ))}

                    {followedRoutePostPointBDirections?.map((route) => (
                      <DirectionsRenderer
                        directions={route}
                        options={{
                          polylineOptions: {
                            zIndex: 70,
                            strokeColor: '#6d717d',
                            strokeWeight: 4,
                            strokeOpacity: 6,
                            icons: [
                              {
                                offset: '0',
                                repeat: '10px',
                              },
                              {
                                icon: {
                                  path: 'M 0,-1 0,1',
                                  strokeColor: '#FF0000',
                                  strokeOpacity: 0.5, // Half-transparent dots
                                  scale: 4,
                                },
                                offset: '0',
                                repeat: '50px',
                              },
                            ],
                          },
                          suppressMarkers: true,
                        }}
                      />
                    ))}

                    {selectedJob ? (
                      <Marker
                        position={selectedJob.current_location}
                        icon={{
                          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                          fillColor: settings.mode === 'dark' ? '#fcba03' : '#145DA0',
                          fillOpacity: 0.8,
                          strokeColor: 'black',
                          strokeWeight: 1,
                          rotation: selectedJob.angle, // Rotate the arrow icon
                          scale: 8, // Adjust the size of the arrow
                        }}
                      />
                    ) : (
                      <MarkerClusterer>
                        {(clusterer: any) => (
                          <>
                            {transportationJobs.map((job) => (
                              <Marker
                                key={job.id}
                                position={job.current_location}
                                clusterer={clusterer}
                                icon={{
                                  path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                                  fillColor: settings.mode === 'dark' ? '#fcba03' : '#145DA0',
                                  fillOpacity: 0.8,
                                  strokeColor: 'black',
                                  strokeWeight: 1,
                                  rotation: job.angle, // Rotate the arrow icon
                                  scale: 8, // Adjust the size of the arrow
                                }}
                                onClick={() => {
                                  handleTransporationJobClick(job)
                                }}
                              />
                            ))}
                          </>
                        )}
                      </MarkerClusterer>
                    )}

                    {tentativeRouteDirections && (
                      <MapOverlyBottom
                        style={{
                          opacity: isVisible && !isMapInteracting ? 1 : 0,
                          background: settings.mode === 'dark' ? '#25293F' : '',
                        }}
                        onMouseMove={() => setIsVisible(true)} // Show overlay when the mouse moves over it
                      >
                        <Box // Box Containing driver and some shipment information (item_description, mbl number, etc)
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ mr: 2 }}>
                              <Avatar
                                alt={selectedJob?.driver}
                                sx={{ width: 40, height: 40 }}
                                src={selectedJob?.driver_avatar || '/images/avatars/1.png'}
                              />
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: 900,
                                }}
                              >
                                {selectedJob?.driver}
                              </Typography>
                              <Typography variant="body2">{selectedJob?.vehicle}</Typography>
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-center',
                              flexDirection: 'column',
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 900,
                              }}
                            >
                              Item Description
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 300,
                              }}
                            >
                              {selectedJob?.item_description || 'N/A'}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-center',
                              flexDirection: 'column',
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 900,
                              }}
                            >
                              MBL
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 300,
                              }}
                            >
                              {selectedJob?.mbl || 'N/A'}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                              flexDirection: 'column',
                            }}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                router.push(`/shipments/${selectedJob?.shipment_id}`)
                              }}
                            >
                              View Shipment Detail
                            </Button>
                          </Box>
                        </Box>
                      </MapOverlyBottom>
                    )}
                  </GoogleMap>
                )}
              </Card>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

Transportation.contentHeightFixed = true

export default Transportation
