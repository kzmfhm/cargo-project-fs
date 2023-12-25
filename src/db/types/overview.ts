export type AtPortShipmentType = {
  id: string
  ref: string
  item_description: string
  demurrageDays: number
  detentionDays: number
  status: string | null
}

export type PriorityShipmentType = {
  id: string
  customer_reference_number: string
  item_description: string
  actual_arrival: string
  status: string | null
}

export type RequireDocumentType = {
  id: string
  customer_reference_number: string
  item_description: string
  lastMilestone: boolean | string
  originalDocuments: boolean
  payOrders: boolean
}

export type UpcomingShipmentType = {
  id: string
  customer_reference_number: string
  item_description: string
  actual_arrival: string
}

export type GatedOutShipmentType = {
  id: string
  ref: string
  item_description: string
  demurrageDays: number | null
  detentionDays: number | null
  daysInClearance: number | null
}
