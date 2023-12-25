import { createSlice } from '@reduxjs/toolkit'
import axios from 'src/utils/axios'
import { AppDispatch } from '../store'

import {
  AtPortShipmentType,
  PriorityShipmentType,
  RequireDocumentType,
  UpcomingShipmentType,
  GatedOutShipmentType,
} from 'src/db/types/overview'

import { TransportationJob } from 'src/db/types/transportation'
// import { transportationJobs as mockTransportationJobs } from 'src/db/static-data/transportation'

// Define a type for the slice state
interface OverviewState {
  atPortLoading: boolean
  priorityLoading: boolean
  requireDocumentsLoading: boolean
  upcomingLoading: boolean
  gatedOutLoading: boolean
  transportationJobsLoading: boolean

  atPortShipments: AtPortShipmentType[] | []
  priorityShipments: PriorityShipmentType[] | []
  requireDocuments: RequireDocumentType[] | []
  upcomingShipments: UpcomingShipmentType[] | []
  gatedOutShipments: GatedOutShipmentType[] | []
  transportationJobs: TransportationJob[] | []

  atPortError: string | null
  priorityError: string | null
  requireDocumentsError: string | null
  upcomingError: string | null
  gatedOutError: string | null
  transportationJobsError: string | null

  partnerID: string
}

const initialState: OverviewState = {
  atPortLoading: false,
  priorityLoading: false,
  requireDocumentsLoading: false,
  upcomingLoading: false,
  gatedOutLoading: false,
  transportationJobsLoading: false,

  atPortShipments: [],
  priorityShipments: [],
  requireDocuments: [],
  upcomingShipments: [],
  gatedOutShipments: [],
  transportationJobs: [],

  atPortError: null,
  priorityError: null,
  requireDocumentsError: null,
  upcomingError: null,
  gatedOutError: null,
  transportationJobsError: null,

  partnerID: '%27%27', // Empty string
}

const slice = createSlice({
  name: 'overview',
  initialState,
  reducers: {
    // At Port
    startAtPortLoading(state) {
      state.atPortLoading = true
      state.atPortError = null
    },
    atPortSuccess(state, action) {
      state.atPortLoading = false
      state.atPortShipments = action.payload
    },
    atPortError(state, action) {
      state.atPortLoading = false
      state.atPortError = action.payload
    },

    // Priority
    startPriorityLoading(state) {
      state.priorityLoading = true
      state.priorityError = null
    },
    prioritySuccess(state, action) {
      state.priorityLoading = false
      state.priorityShipments = action.payload
    },
    priorityError(state, action) {
      state.priorityLoading = false
      state.priorityError = action.payload
    },

    // Require Documents
    startRequireDocumentsLoading(state) {
      state.requireDocumentsLoading = true
      state.requireDocumentsError = null
    },
    requireDocumentsSuccess(state, action) {
      state.requireDocumentsLoading = false
      state.requireDocuments = action.payload
    },
    requireDocumentsError(state, action) {
      state.requireDocumentsLoading = false
      state.requireDocumentsError = action.payload
    },

    // Upcoming
    startUpcomingLoading(state) {
      state.upcomingLoading = true
      state.upcomingError = null
    },

    upcomingSuccess(state, action) {
      state.upcomingLoading = false
      state.upcomingShipments = action.payload
    },

    upcomingError(state, action) {
      state.upcomingLoading = false
      state.upcomingError = action.payload
    },

    // Gated Out
    startGatedOutLoading(state) {
      state.gatedOutLoading = true
      state.gatedOutError = null
    },

    gatedOutSuccess(state, action) {
      state.gatedOutLoading = false
      state.gatedOutShipments = action.payload
    },

    gatedOutError(state, action) {
      state.gatedOutLoading = false
      state.gatedOutError = action.payload
    },

    setPartnerID(state, action) {
      state.partnerID = action.payload
    },

    // Transportation Jobs
    startTransportationJobsLoading(state) {
      state.transportationJobsLoading = true
      state.transportationJobsError = null
    },

    transportationJobsSuccess(state, action) {
      state.transportationJobsLoading = false
      state.transportationJobs = action.payload // mockTransportationJobs // TODO: Remove mock data and uncomment this line action.payload //
    },

    transportationJobsError(state, action) {
      state.transportationJobsLoading = false
      state.transportationJobsError = action.payload
    },

    resetStateSuccess(state) {
      state.atPortLoading = false
      state.priorityLoading = false
      state.requireDocumentsLoading = false
      state.upcomingLoading = false
      state.gatedOutLoading = false
      state.transportationJobsLoading = false

      state.atPortShipments = []
      state.priorityShipments = []
      state.requireDocuments = []
      state.upcomingShipments = []
      state.gatedOutShipments = []
      state.transportationJobs = []

      state.atPortError = null
      state.priorityError = null
      state.requireDocumentsError = null
      state.upcomingError = null
      state.gatedOutError = null
      state.transportationJobsError = null

      state.partnerID = '%27%27' // Empty string
    },
  },
})

// Reducer
export default slice.reducer
export const { actions } = slice

// Actions

export const setPartnerID = (partnerID: string) => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.setPartnerID(partnerID))
}

export const getAtPortShipments = (token: string, partnerID: string) => async (dispatch: AppDispatch) => {
  console.log(partnerID)
  try {
    dispatch(slice.actions.startAtPortLoading())

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.get(`/api/v1/overview/at_port_shipments/${partnerID}`, config)
    dispatch(slice.actions.atPortSuccess(response.data))
  } catch (err: any) {
    dispatch(slice.actions.atPortError(err.detail ? err.detail : err.message))
  }
}

export const getPriorityShipments = (token: string, partnerID: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(slice.actions.startPriorityLoading())

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.get(`/api/v1/overview/priority_shipments/${partnerID}`, config)
    dispatch(slice.actions.prioritySuccess(response.data))
  } catch (err: any) {
    console.log(err)
    dispatch(slice.actions.priorityError(err.detail ? err.detail : err.message))
  }
}

export const getRequireDocuments = (token: string, partnerID: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(slice.actions.startRequireDocumentsLoading())

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.get(`/api/v1/overview/require_documents/${partnerID}`, config)
    dispatch(slice.actions.requireDocumentsSuccess(response.data))
  } catch (err: any) {
    dispatch(slice.actions.requireDocumentsError(err.detail ? err.detail : err.message))
  }
}

export const getUpcomingShipments = (token: string, partnerID: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(slice.actions.startUpcomingLoading())

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.get(`/api/v1/overview/upcoming_shipments/${partnerID}`, config)
    dispatch(slice.actions.upcomingSuccess(response.data))
  } catch (err: any) {
    dispatch(slice.actions.upcomingError(err.detail ? err.detail : err.message))
  }
}

export const getGatedOutShipments = (token: string, partnerID: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(slice.actions.startGatedOutLoading())

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.get(`/api/v1/overview/gated_out_shipments/${partnerID}`, config)
    dispatch(slice.actions.gatedOutSuccess(response.data))
  } catch (err: any) {
    dispatch(slice.actions.gatedOutError(err.detail ? err.detail : err.message))
  }
}

export const getInProgressTransportationJobs = (token: string, partnerID: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(slice.actions.startTransportationJobsLoading())
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.get(`/api/v1/transportation/active_transportation_jobs/${partnerID}`, config)
    dispatch(slice.actions.transportationJobsSuccess(response.data))
  } catch (err: any) {
    dispatch(slice.actions.transportationJobsError(err.detail ? err.detail : err.message))
  }
}

export const resetOverviewState = () => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.resetStateSuccess())
}
