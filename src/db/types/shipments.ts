import { Partner } from './accounts'

export type CustomTagType = {
  val: string
  color: string
}

export type Container = {
  id: number
  container_code: string | null
  container_teu: number | null
  map_url: string | null
  bl_gateout_date: string | null
  bl_emptyreturn_date: string | null
}

export type Timeline = {
  id: number
  location: string | null
  date: string
  milestone_display: string
  status: string | null
  vessel: string | null
}

export type ShipmentInListType = {
  id: string
  carrier: string
  item_description: string | null
  consignment_mode: string
  mbl: string
  lc_number: string
  bank_name: string | null
  container_number: string | null
  customer_reference_number: string
  project_number: string
  consigner_name: string | null
  loading_port: string
  from_country: string
  consignee_name: string | null
  port_destination: string
  to_country: string
  shipping_line: null | string
  GD_Number: null | string
  IGM_virNumber: null | string
  start_date: string | null
  actual_departure: null | string
  actual_arrival: null | string
  end_date: null | string
  is_gated_out: string
  custom_tags_list: CustomTagType[]
}

export type ShipmentInPrivateDetailType = {
  slug: string | null
  lc_number: string | null
  id: string | null
  carrier: string | null
  item_description: string | null
  consignment_mode: string | null
  mbl: string | null
  container_number: string | null
  customer_reference_number: string | null
  shipping_line: string | null
  bl_container_count: number | null
  project_number: string | null
  status: any
  consigner_name: string | null
  loading_port: string | null
  from_country: string | null
  consignee_name: string | null
  port_destination: string | null
  to_country: string | null
  visibility: string | null
  start_date: string | null
  actual_departure: string | null
  actual_arrival: string | null
  end_date: string | null
  first_eta: string | null
  gate_out_date: string | null
  empty_return_date: string | null
  transportation_type: string | null
  agent: null | string
  incoterms: null | string
  volume: null | string
  weight: any
  inland_transportation: null | string
  is_automated: boolean
  request_id: string | null
  live_map_url: string | null
  formated_transit_time: null | string
  vessel_lat: null | number
  vessel_lng: null | number
  message: null | string
  request_status: null | string
  sailing_status: null | string
  GD_Number: null | string
  IGM_vessel: null | string
  IGM_virNumber: null | string
  IGM_Terminal: null | string
  IGM_ETA: null | string
  IGM_ETD: null | string
  milestatus: null | string
  shipment_containers: Container[]
  partners: Partner[]
}

export type ShipmentInPublicDetailType = {
  slug: string | null
  lc_number: string | null
  id: string | null
  carrier: string | null
  item_description: string | null
  consignment_mode: string | null
  mbl: string | null
  container_number: string | null
  customer_reference_number: string | null
  shipping_line: string | null
  bl_container_count: number | null
  project_number: string | null
  status: any
  consigner_name: string | null
  loading_port: string | null
  from_country: string | null
  consignee_name: string | null
  port_destination: string | null
  to_country: string | null
  visibility: string | null
  start_date: string | null
  actual_departure: string | null
  actual_arrival: string | null
  end_date: string | null
  first_eta: string | null
  gate_out_date: string | null
  empty_return_date: string | null
  transportation_type: string | null
  agent: null | string
  incoterms: null | string
  volume: null | string
  weight: any
  inland_transportation: null | string
  milestatus: null | string
  shipment_timeline: Timeline[]
  shipment_containers: Container[]
  partners: Partner[]
}

export type Document = {
  id: number
  document_name: string
  file: string
}

export type Reply = {
  id: number
  time: string
  reply: string
  user: string
  avatar: string | null
  name: string
  badge: string
}

export type Comment = {
  id: number
  time: string
  comment: string
  user: string
  avatar: string | null
  name: string
  replies: Reply[]
  badge: string
}
