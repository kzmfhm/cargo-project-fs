import { createSlice } from '@reduxjs/toolkit'
import axios from 'src/utils/axios'
import { AppDispatch } from '../store'

import {
  ShipmentInListType,
  ShipmentInPrivateDetailType,
  ShipmentInPublicDetailType,
  Timeline,
  Document,
  Comment
  // Reply
} from 'src/db/types/shipments'
import { UUIDType } from 'src/db/types/others'
import { MilestoneFormType } from 'src/db/types/forms'

// Define a type for the slice state
interface ShipmentsState {
  isLoading: boolean
  isTimelineLoading: boolean
  isDocumentsLoading: boolean
  isFileUploading: boolean
  isCommentLoading: boolean
  isReplyToCommentLoading: boolean
  isLoadingShipmentShare: boolean
  isLoadingCreateMilestone: boolean

  error: string | null
  timelineError: string | null
  documentsError: string | null
  fileUploadError: string | null
  commentError: string | null
  replyToCommentError: string | null
  shipmentShareError: string | null
  milestoneCreateError: string | null

  shipmentShareSuccess: boolean | null
  shipmentsImport: ShipmentInListType[] | []
  shipmentsExport: ShipmentInListType[] | []
  shipment: ShipmentInPrivateDetailType | null
  shipmentShared: ShipmentInPublicDetailType | null
  shipmentTimeline: Timeline[] | null
  shipmentDocuments: Document[] | null
  shipmentComments: Comment[] | null
  uuidOfCurrentShipment: UUIDType | null
}

const initialState: ShipmentsState = {
  isLoading: false,
  isTimelineLoading: false,
  isDocumentsLoading: false,
  isFileUploading: false,
  isCommentLoading: false,
  isReplyToCommentLoading: false,
  isLoadingShipmentShare: false,
  isLoadingCreateMilestone: false,

  error: null,
  timelineError: null,
  documentsError: null,
  fileUploadError: null,
  commentError: null,
  replyToCommentError: null,
  shipmentShareError: null,
  milestoneCreateError: null,

  shipmentShareSuccess: null,
  shipmentsImport: [],
  shipmentsExport: [],
  shipment: null,
  shipmentShared: null,
  shipmentTimeline: null,
  shipmentDocuments: null,
  shipmentComments: null,
  uuidOfCurrentShipment: null
}

const slice = createSlice({
  name: 'shipments',
  initialState,
  reducers: {
    getShipmentsStart(state) {
      state.isLoading = true
      state.error = null
      state.shipment = null
      state.shipmentsImport = []
      state.shipmentsExport = []
    },
    getImportShipmentsSuccess(state, action) {
      state.shipmentsImport = action.payload
      state.isLoading = false
    },
    getExportShipmentsSuccess(state, action) {
      state.shipmentsExport = action.payload
      state.isLoading = false
    },
    getShipmentSuccess(state, action) {
      state.shipment = action.payload
      state.isLoading = false
    },

    getTimelineStart(state) {
      state.isTimelineLoading = true
      state.timelineError = null
      state.shipmentTimeline = null
    },

    getDocumentsStart(state) {
      state.isDocumentsLoading = true
      state.documentsError = null
      state.shipmentDocuments = null
    },

    startFileUpload(state) {
      state.isFileUploading = true
      state.fileUploadError = null
    },

    startCommentLoading(state) {
      state.isCommentLoading = true
      state.commentError = null
    },

    startReplyToCommentLoading(state) {
      state.isReplyToCommentLoading = true
      state.replyToCommentError = null
    },

    getTimelineSuccess(state, action) {
      state.shipmentTimeline = action.payload
      state.isTimelineLoading = false
    },

    fileUploadSuccess(state, action) {
      state.isFileUploading = false
      state.shipmentDocuments = action.payload
    },

    getDocumentsSuccess(state, action) {
      state.shipmentDocuments = action.payload
      state.isDocumentsLoading = false
    },

    getCommentsSuccess(state, action) {
      state.shipmentComments = action.payload
      state.isCommentLoading = false
    },

    replyToCommentSuccess(state, action) {
      state.isReplyToCommentLoading = false
      state.shipmentComments = action.payload
    },

    fileUplaodError(state, action) {
      state.fileUploadError = action.payload
      state.isFileUploading = false
    },
    getTimelineFailure(state, action) {
      state.timelineError = action.payload
      state.isTimelineLoading = false
    },

    getDocumentsFailure(state, action) {
      state.documentsError = action.payload
      state.isDocumentsLoading = false
    },

    getCommentsFailure(state, action) {
      state.commentError = action.payload
      state.isCommentLoading = false
    },

    replyToCommentFailure(state, action) {
      state.replyToCommentError = action.payload
      state.isReplyToCommentLoading = false
    },

    setUUIDOfCurrentShipment(state, action) {
      state.uuidOfCurrentShipment = action.payload
    },
    getShipmentsFailure(state, action) {
      state.isLoading = false
      state.error = action.payload
      state.shipmentsImport = []
      state.shipmentsExport = []
      state.shipment = null
    },

    startShipmentShare(state) {
      state.isLoadingShipmentShare = true
      state.shipmentShareError = null
      state.shipmentShareSuccess = null
    },

    shipmentShareSuccess(state, action) {
      state.isLoadingShipmentShare = false
      state.shipment = action.payload
      state.shipmentShareSuccess = true
    },

    shipmentShareFailure(state, action) {
      state.isLoadingShipmentShare = false
      state.shipmentShareError = action.payload
    },

    startCreateMilestone(state) {
      state.isLoadingCreateMilestone = true
      state.milestoneCreateError = null
    },

    createMilestoneSuccess(state, action) {
      state.isLoadingCreateMilestone = false
      state.shipmentTimeline = action.payload
    },

    createMilestoneFailure(state, action) {
      state.isLoadingCreateMilestone = false
      state.milestoneCreateError = action.payload
    },

    getSharedShipmentDetailSuccess(state, action) {
      state.shipmentShared = action.payload
      state.isLoading = false
    },

    resetStateSuccess(state) {
      state.isLoading = false
      state.isTimelineLoading = false
      state.isDocumentsLoading = false
      state.isFileUploading = false
      state.isCommentLoading = false
      state.isReplyToCommentLoading = false
      state.isLoadingShipmentShare = false
      state.isLoadingCreateMilestone = false

      state.error = null
      state.timelineError = null
      state.documentsError = null
      state.fileUploadError = null
      state.commentError = null
      state.replyToCommentError = null
      state.shipmentShareError = null
      state.milestoneCreateError = null

      state.shipmentShareSuccess = null
      state.shipmentsImport = []
      state.shipmentsExport = []
      state.shipment = null
      state.shipmentTimeline = null
      state.shipmentDocuments = null
      state.shipmentComments = null
      state.uuidOfCurrentShipment = null
    }
  }
})

// Reducer
export default slice.reducer
export const { actions } = slice

// Actions
export function getImports(token: string) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.getShipmentsStart())
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.get('/api/v1/shipments/list/IMPORT', config)
      dispatch(actions.getImportShipmentsSuccess(response.data))
    } catch (err: any) {
      dispatch(actions.getShipmentsFailure(err.detail))
    }
  }
}

export function getExports(token: string) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.getShipmentsStart())
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.get('/api/v1/shipments/list/EXPORT', config)
      dispatch(actions.getExportShipmentsSuccess(response.data))
    } catch (err: any) {
      dispatch(actions.getShipmentsFailure(err.detail))
    }
  }
}

export function getShipment(token: string, uuid: string) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.getShipmentsStart())

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.get(`/api/v1/shipments/detail/${uuid}/`, config)
      dispatch(actions.getShipmentSuccess(response.data))
    } catch (err: any) {
      dispatch(actions.getShipmentsFailure(err.detail))
    }
  }
}

export function getSharedShipment(slug: string) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.getShipmentsStart())

      const response = await axios.get(`/api/v1/shipments/get_public_shipment/${slug}/`)
      dispatch(actions.getSharedShipmentDetailSuccess(response.data))
    } catch (err: any) {
      dispatch(actions.getShipmentsFailure(err.detail))
    }
  }
}

export function getTimeline(token: string, uuid: string) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.getTimelineStart())

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.get(`/api/v1/shipments/milestones/${uuid}/`, config)
      dispatch(actions.getTimelineSuccess(response.data))
    } catch (err: any) {
      dispatch(actions.getTimelineFailure(err.detail))
    }
  }
}

export function getDocuments(token: string, uuid: string) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.getDocumentsStart())

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.get(`/api/v1/shipments/get_documents/${uuid}/`, config)
      dispatch(actions.getDocumentsSuccess(response.data))
    } catch (err: any) {
      dispatch(actions.getDocumentsFailure(err.detail))
    }
  }
}

export function uploadDocument(token: string, uuid: string, filename: string, file: any) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.startFileUpload())

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      }
      const data = new FormData()
      data.append('file', file)
      const response = await axios.post(
        `/api/v1/shipments/upload_document/${uuid}/${filename}/`,
        data,
        config
      )
      dispatch(actions.fileUploadSuccess(response.data))
    } catch (err: any) {
      dispatch(actions.fileUplaodError(err.detail))
    }
  }
}

export function postReply(token: string, uuid: string, id: number, reply: string) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.startReplyToCommentLoading())

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.post(
        `/api/v1/shipments/reply_to_comment/${uuid}/${id}/`,
        { reply },
        config
      )
      dispatch(actions.replyToCommentSuccess(response.data))
    } catch (err: any) {
      dispatch(actions.replyToCommentFailure(err.detail))
    }
  }
}

export function postComment(token: string, uuid: string, comment: string) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.startCommentLoading())

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.post(
        `/api/v1/shipments/comments/${uuid}/`,
        { comment },
        config
      )
      dispatch(actions.getCommentsSuccess(response.data))
    } catch (err: any) {
      dispatch(actions.getCommentsFailure(err.detail))
    }
  }
}

export function getComments(token: string, uuid: string) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.startCommentLoading())

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.get(`/api/v1/shipments/comments/${uuid}/`, config)
      dispatch(actions.getCommentsSuccess(response.data))
    } catch (err: any) {
      dispatch(actions.getCommentsFailure(err.detail))
    }
  }
}

export function setUUIDOfCurrentShipment(uuid: UUIDType) {
  return async (dispatch: AppDispatch) => {
    dispatch(actions.setUUIDOfCurrentShipment(uuid))
  }
}

export function resetShipmentsState() {
  return async (dispatch: AppDispatch) => {
    dispatch(actions.resetStateSuccess())
  }
}

export function allowShipmentSharing(token: string, uuid: string) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.startShipmentShare())

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.patch(
        `/api/v1/shipments/allow_shipment_sharing/${uuid}/`,
        {},
        config
      )
      dispatch(actions.shipmentShareSuccess(response.data))
    } catch (err: any) {
      dispatch(actions.shipmentShareFailure(err.detail))
    }
  }
}

export function postMilestone(token: string, uuid: string, data: MilestoneFormType) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.startCreateMilestone())

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.post(
        `/api/v1/shipments/milestones/${uuid}/`,
        data,
        config
      )
      dispatch(actions.createMilestoneSuccess(response.data))
    } catch (err: any) {
      dispatch(actions.createMilestoneFailure(err.detail))
    }
  }
}
