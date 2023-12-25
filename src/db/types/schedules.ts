export type SearchFormData = {
  type: string
  origin_id: number | null
  destination_id: number | null
  equipment_type: string
  quantity: string
  weight: number
  commodity: string
  vessel_available_date: string
}

export type ContainerYard = {
  id: number
  city: string
  country: string
  LOCODE: string
}

export type Route = {
  id: number
  origin: ContainerYard
  destination: ContainerYard
  rates: Rate[]
}

export type RateType = {
  id: number
  description: string
  category: string
  UOM: string
  equipment_type: string
  amount: string
}

export type Rate = {
  id: number
  validity_date: string
  ratetypes: RateType[]
  link: string | null
  start_date: string | null
  end_date: string | null
}

export type Sealine = {
  id: number
  carrier_name: string
  scac: string
  logo: string | null
  rates: Rate[]
}

export type Schedule = {
  id: number
  scac: string | null
  carrier_name: string
  service_code: string | null
  service_name: string | null
  terminal_cutoff: string | null
  terminal_cutoff_day: string | null
  vgm_cut_off: string | null
  vgm_cutoff_day: string | null
  vessel_name: string | null
  voyage_number: string | null
  imo_number: string | null
  origin_terminal: string | null
  origin_departure_date_estimated: string
  destination_terminal: string | null
  destination_arrival_date_estimated: string | null
  sealine: Sealine
  route: Route
  route_type: string
  ratetypes: RateType[]
  total_price?: number
  rate?: number
  origin_charges?: number
  destination_charges?: number
  freight_charges?: number
}
