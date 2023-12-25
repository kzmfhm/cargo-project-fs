import { createSlice } from '@reduxjs/toolkit'
import axios from 'src/utils/axios'
import { AppDispatch } from '../store'
import { TransportationJob } from 'src/db/types/transportation'

// Define a type for the slice state
interface TransportationJobState {
  isLoading: boolean
  error: string | null

  isShareLoading: boolean
  isShareError: string | null
  isShareSuccess: boolean

  transportationJobs: TransportationJob[] | []
  transportationJob: TransportationJob | null
}

const initialState: TransportationJobState = {
  isLoading: false,
  error: null,

  isShareLoading: false,
  isShareError: null,
  isShareSuccess: false,

  transportationJobs: [],
  transportationJob: null,
}

const slice = createSlice({
  name: 'transportation',
  initialState,
  reducers: {
    getTransportationJobsListStart(state) {
      state.isLoading = true
      state.error = null
      state.transportationJobs = []
    },
    getTransportationJobsListSuccess(state, action) {
      state.transportationJobs = action.payload
      state.isLoading = false
    },

    getTransportationJobsListFailure(state, action) {
      state.isLoading = false
      state.error = action.payload
    },

    getTransportationJobStart(state) {
      state.isLoading = true
      state.error = null
      state.transportationJob = null
    },
    getTransportationJobSuccess(state, action) {
      state.transportationJob = action.payload
      state.isLoading = false
    },

    getTransportationJobFailure(state, action) {
      state.isLoading = false
      state.error = action.payload
    },

    shareTransportationJobStart(state) {
      state.isShareLoading = true
      state.isShareError = null
      state.isShareSuccess = false
    },

    shareTransportationJobSuccess(state, action) {
      state.isShareLoading = false
      state.isShareSuccess = true
      state.transportationJob = action.payload
    },

    shareTransportationJobFailure(state, action) {
      state.isShareLoading = false
      state.isShareError = action.payload
    },

    resetDetailViewState(state) {
      state.isShareLoading = false
      state.isShareError = null
      state.isShareSuccess = false
      state.transportationJob = null
    },

    resetStateSuccess(state) {
      state.isLoading = false
      state.error = null
      state.isShareLoading = false
      state.isShareError = null
      state.isShareSuccess = false
      state.transportationJobs = []
      state.transportationJob = null
    },
  },
})

// Reducer
export default slice.reducer
export const { actions } = slice

// Actions
export function getTransportationJobs(token: string) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.getTransportationJobsListStart())
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios.get('/api/v1/transportation/transportation_jobs', config)
      dispatch(actions.getTransportationJobsListSuccess(response.data))
      console.log(response.data)
    } catch (err: any) {
      dispatch(actions.getTransportationJobsListFailure(err.detail))
    }
  }
}

export function getTransportationJob(token: string, slug: string) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.getTransportationJobStart())

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios.get(`/api/v1/transportation/transportation_job_detail/${slug}`, config)
      dispatch(actions.getTransportationJobSuccess(response.data))
    } catch (err: any) {
      dispatch(actions.getTransportationJobFailure(err.detail))
    }
  }
}

export function shareTransportationJob(token: string, id: string) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.shareTransportationJobStart())

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios.get(`/api/v1/transportation/update_transportation_job_visibility/${id}`, config)
      dispatch(actions.shareTransportationJobSuccess(response.data))
    } catch (err: any) {
      dispatch(actions.shareTransportationJobFailure(err.detail))
    }
  }
}

export function getTransportationJobPublic(slug: string) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.getTransportationJobStart())
      const response = await axios.get(`/api/v1/transportation/transportation_job_public/${slug}`)
      dispatch(actions.getTransportationJobSuccess(response.data))
    } catch (err: any) {
      dispatch(actions.getTransportationJobFailure(err.detail))
    }
  }
}

export function resetTransportationsState() {
  return async (dispatch: AppDispatch) => {
    dispatch(actions.resetStateSuccess())
  }
}

export function resetDetailViewStateInStore() {
  return async (dispatch: AppDispatch) => {
    dispatch(actions.resetDetailViewState())
  }
}
