import { createSlice } from '@reduxjs/toolkit'
import axios from 'src/utils/axios'
import { AppDispatch } from '../store'
import { fiscalYearStart, today } from 'src/utils/dateRangeManagers'

import {
  KPIs,
  ContainerizedShipments,
  Demurrages,
  Detentions,
  ImportsCleared,
  ExportsCleared,
  TotalImportsExports,
  FclLcl,
  ShippingCompany,
  Origin,
  LineField,
  ImportRatioDrillDown,
  ShippingLinesDetail
} from 'src/db/types/analytics'

// Define a type for the slice state
interface OverviewState {
  partnerID: string
  dateRange: string[] // ["2021-01-01", "2022-01-31"]

  // KPIs
  kpisLoading: boolean
  kpis: KPIs | null
  kpisError: string | null

  // Containerized Shipments
  containerizedShipmentsLoading: boolean
  containerizedShipments: ContainerizedShipments | null
  containerizedShipmentsError: string | null

  // Demurrages
  demurragesLoading: boolean
  demurrages: Demurrages | null
  demurragesError: string | null

  // Detentions
  detentionsLoading: boolean
  detentions: Detentions | null
  detentionsError: string | null

  // Imports Cleared
  importsClearedLoading: boolean
  importsCleared: ImportsCleared | null
  importsClearedError: string | null

  // Exports Cleared
  exportsClearedLoading: boolean
  exportsCleared: ExportsCleared | null
  exportsClearedError: string | null

  // Total Imports & Exports
  totalImportsExportsLoading: boolean
  totalImportsExports: TotalImportsExports | null
  totalImportsExportsError: string | null

  // FCL & LCL
  fclLclLoading: boolean
  fclLcl: FclLcl | null
  fclLclError: string | null

  // Shipping Company
  shippingCompanyLoading: boolean
  shippingCompany: ShippingCompany | null
  shippingCompanyError: string | null

  // Origin
  originLoading: boolean
  origin: Origin | null
  originError: string | null

  // Line Field
  lineFieldLoading: boolean
  lineField: LineField | null
  lineFieldError: string | null

  // Import Ration
  importRatioDrillDownLoading: boolean
  importRatioDrillDown: ImportRatioDrillDown | null
  importRatioDrillDownError: string | null

  // Shipping Lines Detail
  shippingLinesDetailLoading: boolean
  shippingLinesDetail: ShippingLinesDetail | null
  shippingLinesDetailError: string | null
}

const initialState: OverviewState = {
  partnerID: 'undefined', // 'undefined' is a string
  dateRange: [fiscalYearStart(), today()],

  // KPIs
  kpisLoading: false,
  kpis: null,
  kpisError: null,

  // Containerized Shipments
  containerizedShipmentsLoading: false,
  containerizedShipments: null,
  containerizedShipmentsError: null,

  // Demurrages
  demurragesLoading: false,
  demurrages: null,
  demurragesError: null,

  // Detentions
  detentionsLoading: false,
  detentions: null,
  detentionsError: null,

  // Imports Cleared
  importsClearedLoading: false,
  importsCleared: null,
  importsClearedError: null,

  // Exports Cleared
  exportsClearedLoading: false,
  exportsCleared: null,
  exportsClearedError: null,

  // Total Imports & Exports
  totalImportsExportsLoading: false,
  totalImportsExports: null,
  totalImportsExportsError: null,

  // FCL & LCL
  fclLclLoading: false,
  fclLcl: null,
  fclLclError: null,

  // Shipping Company
  shippingCompanyLoading: false,
  shippingCompany: null,
  shippingCompanyError: null,

  // Origin
  originLoading: false,
  origin: null,
  originError: null,

  // Line Field
  lineFieldLoading: false,
  lineField: null,
  lineFieldError: null,

  // Import Ration
  importRatioDrillDownLoading: false,
  importRatioDrillDown: null,
  importRatioDrillDownError: null,

  // Shipping Lines Detail
  shippingLinesDetailLoading: false,
  shippingLinesDetail: null,
  shippingLinesDetailError: null
}

const slice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setPartnerID(state, action) {
      state.partnerID = action.payload
    },

    resetStateSuccess(state) {
      state.partnerID = 'undefined'
      state.dateRange = [fiscalYearStart(), today()]

      // KPIs
      state.kpisLoading = false
      state.kpis = null
      state.kpisError = null

      // Containerized Shipments
      state.containerizedShipmentsLoading = false
      state.containerizedShipments = null
      state.containerizedShipmentsError = null

      // Demurrages
      state.demurragesLoading = false
      state.demurrages = null
      state.demurragesError = null

      // Detentions
      state.detentionsLoading = false
      state.detentions = null
      state.detentionsError = null

      // Imports Cleared
      state.importsClearedLoading = false
      state.importsCleared = null
      state.importsClearedError = null

      // Exports Cleared
      state.exportsClearedLoading = false
      state.exportsCleared = null
      state.exportsClearedError = null

      // Total Imports & Exports
      state.totalImportsExportsLoading = false
      state.totalImportsExports = null
      state.totalImportsExportsError = null

      // FCL & LCL
      state.fclLclLoading = false
      state.fclLcl = null
      state.fclLclError = null

      // Shipping Company
      state.shippingCompanyLoading = false
      state.shippingCompany = null
      state.shippingCompanyError = null

      // Origin
      state.originLoading = false
      state.origin = null
      state.originError = null

      // Line Field
      state.lineFieldLoading = false
      state.lineField = null
      state.lineFieldError = null

      // Import Ration
      state.importRatioDrillDownLoading = false
      state.importRatioDrillDown = null
      state.importRatioDrillDownError = null

      // Shipping Lines Detail
      state.shippingLinesDetailLoading = false
      state.shippingLinesDetail = null
      state.shippingLinesDetailError = null
    },

    setDateRange(state, action) {
      state.dateRange = action.payload
    },

    // KPIs
    getKPIsStart(state) {
      state.kpisLoading = true
    },
    getKPIsSuccess(state, action) {
      state.kpisLoading = false
      state.kpis = action.payload
      state.kpisError = null
    },
    getKPIsError(state, action) {
      state.kpisLoading = false
      state.kpisError = action.payload
    },

    // Containerized Shipments
    getContainerizedShipmentsStart(state) {
      state.containerizedShipmentsLoading = true
    },
    getContainerizedShipmentsSuccess(state, action) {
      state.containerizedShipmentsLoading = false
      state.containerizedShipments = action.payload
      state.containerizedShipmentsError = null
    },
    getContainerizedShipmentsError(state, action) {
      state.containerizedShipmentsLoading = false
      state.containerizedShipmentsError = action.payload
    },

    // Demurrages
    getDemurragesStart(state) {
      state.demurragesLoading = true
    },
    getDemurragesSuccess(state, action) {
      state.demurragesLoading = false
      state.demurrages = action.payload
      state.demurragesError = null
    },
    getDemurragesError(state, action) {
      state.demurragesLoading = false
      state.demurragesError = action.payload
    },

    // Detentions
    getDetentionsStart(state) {
      state.detentionsLoading = true
    },
    getDetentionsSuccess(state, action) {
      state.detentionsLoading = false
      state.detentions = action.payload
      state.detentionsError = null
    },
    getDetentionsError(state, action) {
      state.detentionsLoading = false
      state.detentionsError = action.payload
    },

    // Imports Cleared
    getImportsClearedStart(state) {
      state.importsClearedLoading = true
    },
    getImportsClearedSuccess(state, action) {
      state.importsClearedLoading = false
      state.importsCleared = action.payload
      state.importsClearedError = null
    },
    getImportsClearedError(state, action) {
      state.importsClearedLoading = false
      state.importsClearedError = action.payload
    },

    // Exports Cleared
    getExportsClearedStart(state) {
      state.exportsClearedLoading = true
    },
    getExportsClearedSuccess(state, action) {
      state.exportsClearedLoading = false
      state.exportsCleared = action.payload
      state.exportsClearedError = null
    },
    getExportsClearedError(state, action) {
      state.exportsClearedLoading = false
      state.exportsClearedError = action.payload
    },

    // Total Imports & Exports
    getTotalImportsExportsStart(state) {
      state.totalImportsExportsLoading = true
    },
    getTotalImportsExportsSuccess(state, action) {
      state.totalImportsExportsLoading = false
      state.totalImportsExports = action.payload
      state.totalImportsExportsError = null
    },
    getTotalImportsExportsError(state, action) {
      state.totalImportsExportsLoading = false
      state.totalImportsExportsError = action.payload
    },

    // FCL & LCL
    getFCLLCLStart(state) {
      state.fclLclLoading = true
    },
    getFCLLCLSuccess(state, action) {
      state.fclLclLoading = false
      state.fclLcl = action.payload
      state.fclLclError = null
    },
    getFCLLCLError(state, action) {
      state.fclLclLoading = false
      state.fclLclError = action.payload
    },

    // Shipping Company
    getShippingCompanyStart(state) {
      state.shippingCompanyLoading = true
    },
    getShippingCompanySuccess(state, action) {
      state.shippingCompanyLoading = false
      state.shippingCompany = action.payload
      state.shippingCompanyError = null
    },
    getShippingCompanyError(state, action) {
      state.shippingCompanyLoading = false
      state.shippingCompanyError = action.payload
    },

    // Origin
    getOriginStart(state) {
      state.originLoading = true
    },
    getOriginSuccess(state, action) {
      state.originLoading = false
      state.origin = action.payload
      state.originError = null
    },
    getOriginError(state, action) {
      state.originLoading = false
      state.originError = action.payload
    },

    // Line Field
    getLineFieldStart(state) {
      state.lineFieldLoading = true
    },
    getLineFieldSuccess(state, action) {
      state.lineFieldLoading = false
      state.lineField = action.payload
      state.lineFieldError = null
    },
    getLineFieldError(state, action) {
      state.lineFieldLoading = false
      state.lineFieldError = action.payload
    },

    // Import Ratio
    getImportRatioStart(state) {
      state.importRatioDrillDownLoading = true
    },
    getImportRatioSuccess(state, action) {
      state.importRatioDrillDownLoading = false
      state.importRatioDrillDown = action.payload
      state.importRatioDrillDownError = null
    },
    getImportRatioError(state, action) {
      state.importRatioDrillDownLoading = false
      state.importRatioDrillDownError = action.payload
    },

    // Shipping Lines Detail
    getShippingLinesDetailStart(state) {
      state.shippingLinesDetailLoading = true
    },

    getShippingLinesDetailSuccess(state, action) {
      state.shippingLinesDetailLoading = false
      state.shippingLinesDetail = action.payload
      state.shippingLinesDetailError = null
    },
    getShippingLinesDetailError(state, action) {
      state.shippingLinesDetailLoading = false
      state.shippingLinesDetailError = action.payload
    }
  }
})

// Reducer
export default slice.reducer
export const { actions } = slice

// Actions

export const setPartnerID = (partnerID: string) => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.setPartnerID(partnerID))
}

export const resetAnalyticsState = () => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.resetStateSuccess())
}

export const setDateRange = (dateRange: string[]) => async (dispatch: AppDispatch) => {
  dispatch(slice.actions.setDateRange(dateRange))
}

export const getKIPIs =
  (token: string, partnerID: string, dateRange: string[]) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(slice.actions.getKPIsStart())

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.post(
        `/api/v1/analytics/kpis/${partnerID}`,
        { dateRange },
        config
      )
      dispatch(slice.actions.getKPIsSuccess(response.data))
    } catch (err: any) {
      dispatch(slice.actions.getKPIsError(err.detail ? err.detail : err.message))
    }
  }

export const getContainerizedShipments =
  (token: string, partnerID: string, dateRange: string[]) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(slice.actions.getContainerizedShipmentsStart())

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.post(
        `/api/v1/analytics/containerized_shipments/${partnerID}`,
        { dateRange },
        config
      )
      dispatch(slice.actions.getContainerizedShipmentsSuccess(response.data))
    } catch (err: any) {
      dispatch(
        slice.actions.getContainerizedShipmentsError(
          err.detail ? err.detail : err.message
        )
      )
    }
  }

export const getDemurrages =
  (token: string, partnerID: string, dateRange: string[]) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(slice.actions.getDemurragesStart())
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.post(
        `/api/v1/analytics/demurrages/${partnerID}`,
        { dateRange },
        config
      )
      dispatch(slice.actions.getDemurragesSuccess(response.data))
    } catch (err: any) {
      dispatch(slice.actions.getDemurragesError(err.detail ? err.detail : err.message))
    }
  }

export const getDetentions =
  (token: string, partnerID: string, dateRange: string[]) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(slice.actions.getDetentionsStart())
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.post(
        `/api/v1/analytics/detentions/${partnerID}`,
        { dateRange },
        config
      )
      dispatch(slice.actions.getDetentionsSuccess(response.data))
    } catch (err: any) {
      dispatch(slice.actions.getDetentionsError(err.detail ? err.detail : err.message))
    }
  }

export const getImportsCleared =
  (token: string, partnerID: string, dateRange: string[]) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(slice.actions.getImportsClearedStart())
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.post(
        `/api/v1/analytics/imports_cleared/${partnerID}`,
        { dateRange },
        config
      )
      dispatch(slice.actions.getImportsClearedSuccess(response.data))
    } catch (err: any) {
      dispatch(
        slice.actions.getImportsClearedError(err.detail ? err.detail : err.message)
      )
    }
  }

export const getExportsCleared =
  (token: string, partnerID: string, dateRange: string[]) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(slice.actions.getExportsClearedStart())
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.post(
        `/api/v1/analytics/exports_cleared/${partnerID}`,
        { dateRange },
        config
      )
      dispatch(slice.actions.getExportsClearedSuccess(response.data))
    } catch (err: any) {
      dispatch(
        slice.actions.getExportsClearedError(err.detail ? err.detail : err.message)
      )
    }
  }

export const getTotalImportsExports =
  (token: string, partnerID: string, dateRange: string[]) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(slice.actions.getTotalImportsExportsStart())
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.post(
        `/api/v1/analytics/imports_exports/${partnerID}`,
        { dateRange },
        config
      )
      dispatch(slice.actions.getTotalImportsExportsSuccess(response.data))
    } catch (err: any) {
      dispatch(
        slice.actions.getTotalImportsExportsError(err.detail ? err.detail : err.message)
      )
    }
  }

export const getFclLcl =
  (token: string, partnerID: string, dateRange: string[]) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(slice.actions.getFCLLCLStart())
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.post(
        `/api/v1/analytics/lcl_fcl_shipments/${partnerID}`,
        { dateRange },
        config
      )
      dispatch(slice.actions.getFCLLCLSuccess(response.data))
    } catch (err: any) {
      dispatch(slice.actions.getFCLLCLError(err.detail ? err.detail : err.message))
    }
  }

export const getShipingCompany =
  (token: string, partnerID: string, dateRange: string[], category: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(slice.actions.getShippingCompanyStart())
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      let itemCategory = category
      const response = await axios.post(
        `/api/v1/analytics/shipping_company_data/${partnerID}`,
        { dateRange, itemCategory },
        config
      )
      dispatch(slice.actions.getShippingCompanySuccess(response.data))
    } catch (err: any) {
      dispatch(
        slice.actions.getShippingCompanyError(err.detail ? err.detail : err.message)
      )
    }
  }

export const getOrigin =
  (token: string, partnerID: string, dateRange: string[], category: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(slice.actions.getOriginStart())
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      let itemCategory = category
      const response = await axios.post(
        `/api/v1/analytics/origin_data/${partnerID}`,
        { dateRange, itemCategory },
        config
      )
      dispatch(slice.actions.getOriginSuccess(response.data))
    } catch (err: any) {
      dispatch(slice.actions.getOriginError(err.detail ? err.detail : err.message))
    }
  }

export const getLineField =
  (token: string, partnerID: string, dateRange: string[]) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(slice.actions.getLineFieldStart())
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.post(
        `/api/v1/analytics/line_field/${partnerID}`,
        { dateRange },
        config
      )
      dispatch(slice.actions.getLineFieldSuccess(response.data))
    } catch (err: any) {
      dispatch(slice.actions.getLineFieldError(err.detail ? err.detail : err.message))
    }
  }

export const getImportRatio =
  (token: string, partnerID: string, dateRange: string[]) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(slice.actions.getImportRatioStart())
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.post(
        `/api/v1/analytics/import_ratio/${partnerID}`,
        { dateRange },
        config
      )
      dispatch(slice.actions.getImportRatioSuccess(response.data))
    } catch (err: any) {
      dispatch(slice.actions.getImportRatioError(err.detail ? err.detail : err.message))
    }
  }

export const getShippingLinesDetail =
  (token: string, partnerID: string, dateRange: string[]) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(slice.actions.getShippingLinesDetailStart())
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.post(
        `/api/v1/analytics/shipping_line_details/${partnerID}`,
        { dateRange },
        config
      )
      dispatch(slice.actions.getShippingLinesDetailSuccess(response.data))
    } catch (err: any) {
      dispatch(
        slice.actions.getShippingLinesDetailError(err.detail ? err.detail : err.message)
      )
    }
  }
