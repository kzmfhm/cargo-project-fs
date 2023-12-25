// ** React Imports
import { useState, useMemo, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import {
  setFilteredSchedules,
  setIsPriceFilterActive,
  setPriceSortOrder,
  setAvailibitySortOrder,
  setDataIsBeingFiltered,
  sortSchedulesAccordingToPrice,
} from 'src/redux/slices/schedules'
import {
  Card,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Checkbox,
  Stack,
  CardHeader,
  Switch,
  FormGroup,
  FormControlLabel,
} from '@mui/material'

import { Icon } from '@iconify/react'

const SearchResultsFilters = () => {
  // ** Store Vars
  const dispatch = useAppDispatch()
  const { schedules, priceSortOrder, availibitySortOrder, searchFormData, originCharges, destinationCharges, freightCharges } =
    useAppSelector((state) => state.schedules)

  // ** State
  const [resetKey, setResetKey] = useState<number>(0) //  Key for re-rendering

  // Step 1: Create a states for service, route, carrier names, checkboxes
  const [serviceCheckboxes, setServiceCheckboxes] = useState<Record<string, boolean>>({})
  const [routeCheckboxes, setRouteCheckboxes] = useState<Record<string, boolean>>({})
  const [carrierNameCheckboxes, setCarrierNameCheckboxes] = useState<Record<string, boolean>>({})
  const [originTerminalCheckboxes, setOriginTerminalCheckboxes] = useState<Record<string, boolean>>({})

  // Step 2: Extract and filter unique service codes from schedules
  const uniqueServiceCodes = useMemo(() => {
    const serviceCodesSet = new Set<string>()
    schedules.forEach((schedule) => {
      if (schedule.service_code) {
        serviceCodesSet.add(schedule.service_code)
      }
    })
    return Array.from(serviceCodesSet)
  }, [schedules])

  const uniqueCarrierNames = useMemo(() => {
    const carrierNamesSet = new Set<string>()
    schedules.forEach((schedule) => {
      if (schedule?.carrier_name) {
        carrierNamesSet.add(schedule?.carrier_name)
      }
    })
    return Array.from(carrierNamesSet)
  }, [schedules])

  const uniqueOriginTerminals = useMemo(() => {
    const originTerminalsSet = new Set<string>()
    schedules.forEach((schedule) => {
      if (schedule.origin_terminal) {
        originTerminalsSet.add(schedule.origin_terminal)
      }
    })
    return Array.from(originTerminalsSet)
  }, [schedules])

  // Step: 3 Handle Checkboxes
  const handleCarrierNamesCheckBoxChange = (carrierName: string) => {
    setCarrierNameCheckboxes((prevState) => ({
      ...prevState,
      [carrierName]: !prevState[carrierName],
    }))
  }

  const handleServiceCheckboxChange = (serviceCode: string) => {
    setServiceCheckboxes((prevState) => ({
      ...prevState,
      [serviceCode]: !prevState[serviceCode],
    }))
  }

  const handleRouteCheckboxChange = (routeType: string) => {
    setRouteCheckboxes((prevState) => ({
      ...prevState,
      [routeType]: !prevState[routeType],
    }))
  }

  const handleOriginTerminalCheckboxChange = (originTerminal: string) => {
    setOriginTerminalCheckboxes((prevState) => ({
      ...prevState,
      [originTerminal]: !prevState[originTerminal],
    }))
  }

  // Step: 4 Create a memoized function to filter schedules based on selected filters
  const filteredSchedules = useMemo(() => {
    const selectedServiceCodes = Object.keys(serviceCheckboxes).filter((code) => serviceCheckboxes[code])
    const selectedRouteTypes = Object.keys(routeCheckboxes).filter((type) => routeCheckboxes[type])

    const selectedCarrierNames = Object.keys(carrierNameCheckboxes).filter((name) => carrierNameCheckboxes[name])
    const selectedOriginTerminals = Object.keys(originTerminalCheckboxes).filter((terminal) => originTerminalCheckboxes[terminal])

    return schedules.filter((schedule) => {
      const serviceCodeMatch = selectedServiceCodes.length === 0 || selectedServiceCodes.includes(schedule.service_code || '')
      const routeTypeMatch = selectedRouteTypes.length === 0 || selectedRouteTypes.includes(schedule.route_type || '')
      const carrierNameMatch = selectedCarrierNames.length === 0 || selectedCarrierNames.includes(schedule.carrier_name || '')
      const originTerminalMatch = selectedOriginTerminals.length === 0 || selectedOriginTerminals.includes(schedule.origin_terminal || '')
      dispatch(setDataIsBeingFiltered(true))
      return serviceCodeMatch && routeTypeMatch && carrierNameMatch && originTerminalMatch
    })
  }, [serviceCheckboxes, routeCheckboxes, carrierNameCheckboxes, originTerminalCheckboxes, schedules])

  // Step: 5 Dispatch filtered schedules to the store
  useEffect(() => {
    // Sort filteredSchedules based on priceSortOrder and availibitySortOrder
    let sortedSchedules = [...filteredSchedules]
    dispatch(setIsPriceFilterActive(true))

    // Update the Pricing Filtere

    if (availibitySortOrder) {
      // Sort by availibity in ascending order
      sortedSchedules.sort((a, b) => {
        const dateA = new Date(a?.origin_departure_date_estimated || '').getTime()
        const dateB = new Date(b?.origin_departure_date_estimated || '').getTime()
        return dateA - dateB
      })
    } else {
      // Sort by availibity in descending order
      sortedSchedules.sort((a, b) => {
        const dateA = new Date(a?.origin_departure_date_estimated || '').getTime()
        const dateB = new Date(b?.origin_departure_date_estimated || '').getTime()
        return dateB - dateA
      })
    }

    dispatch(setFilteredSchedules(sortedSchedules))
  }, [filteredSchedules, availibitySortOrder])

  // Sorting for Price
  useEffect(() => {
    dispatch(sortSchedulesAccordingToPrice())
  }, [priceSortOrder, originCharges, destinationCharges, freightCharges, searchFormData])

  // Cleanup function
  const handleResetAll = () => {
    dispatch(setDataIsBeingFiltered(false))
    setServiceCheckboxes({})
    setRouteCheckboxes({})
    dispatch(setFilteredSchedules([]))
    dispatch(setPriceSortOrder(false))
    setResetKey((prevKey) => prevKey + 1)
  }

  return (
    <>
      <Card className="card-action card-reload" style={{ borderRadius: '1%' }} key={resetKey}>
        <Accordion
          sx={{
            boxShadow: 'none',
          }}
          defaultExpanded={true}
        >
          <AccordionSummary
            id="panel-header-1"
            aria-controls="panel-content-1"
            expandIcon={<Icon fontSize="1.25rem" icon="tabler:chevron-down" />}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
              <CardHeader title="Filters" sx={{ marginLeft: -6 }} />
            </Stack>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              marginLeft: 1,
            }}
          >
            <Divider />
            <h5>Sorting</h5>
            <div>
              <FormGroup row sx={{ mt: 4 }}>
                <FormControlLabel
                  value="start"
                  label="Cheapest"
                  labelPlacement="end"
                  sx={{ mr: 4 }}
                  control={<Switch checked={priceSortOrder} onChange={() => dispatch(setPriceSortOrder(!priceSortOrder))} />}
                />
              </FormGroup>
              <FormGroup row sx={{ mt: 4 }}>
                <FormControlLabel
                  value="start"
                  label="Earliest"
                  labelPlacement="end"
                  sx={{ mr: 4 }}
                  control={<Switch checked={availibitySortOrder} onChange={() => dispatch(setAvailibitySortOrder(!availibitySortOrder))} />}
                />
              </FormGroup>
            </div>
            <Divider />

            <h5>Shipping Line</h5>
            {/* Shipping line is a carrier name */}
            {/* Step 4: Create checkboxes for unique carrier names */}
            {uniqueCarrierNames.map((carrierName) => (
              <p key={carrierName} id={`carrierNameFilter-${carrierName}`}>
                <Checkbox
                  checked={carrierNameCheckboxes[carrierName]}
                  onChange={() => handleCarrierNamesCheckBoxChange(carrierName)}
                  value={carrierName}
                  size="small"
                />
                {carrierName}
              </p>
            ))}
            <Divider />

            <h5>Origin terminal</h5>
            {/* Step 5: Create checkboxes for unique origin terminals */}
            {uniqueOriginTerminals.map((originTerminal) => (
              <p key={originTerminal} id={`originTerminalFilter-${originTerminal}`}>
                <Checkbox
                  checked={originTerminalCheckboxes[originTerminal]}
                  onChange={() => handleOriginTerminalCheckboxChange(originTerminal)}
                  value={originTerminal}
                  size="small"
                />
                {originTerminal}
              </p>
            ))}

            <h5>Route</h5>
            {/* Step 3: Create checkboxes for unique route types */}
            <p id="chuckFilter">
              <Checkbox
                checked={routeCheckboxes['Direct']}
                onChange={() => handleRouteCheckboxChange('Direct')}
                value="Direct"
                size="small"
              />
              Direct
            </p>
            <Divider />
            <h5>Service</h5>
            {/* Step 3: Create checkboxes for unique service codes */}
            {uniqueServiceCodes.map((serviceCode) => (
              <p key={serviceCode} id={`chuckFilter-${serviceCode}`}>
                <Checkbox
                  checked={serviceCheckboxes[serviceCode]}
                  onChange={() => handleServiceCheckboxChange(serviceCode)}
                  value={serviceCode}
                  size="small"
                />
                {serviceCode}
              </p>
            ))}

            <Divider />

            <Button
              sx={{
                mt: 4,

                color: 'primary.main',
              }}
              color="inherit"
              onClick={handleResetAll}
            >
              Reset All
            </Button>
          </AccordionDetails>
        </Accordion>
      </Card>
    </>
  )
}

export default SearchResultsFilters
