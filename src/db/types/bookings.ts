export type BookingRateType = {
  description: string
  category: string
  UOM: string
  equipment_type: string
  amount: string // as decimal string
  quantity: number
}

export type Booking = {
  id: string
  order_number: string
  slug: string
  clearing_agent: string
  transporter: string
  empty_pickup_location: string
  additional_information: string
  empty_pickup_date: string
  customer_clearance: boolean
  transporation: boolean
  insurance: boolean
  status: string
  created_by: string
  created_at: string
  updated_at: string
  rate_types: BookingRateType[]
  total_price?: number
}

export type BookingFormType = {
  clearing_agent: string
  transporter: string
  additional_information: string
}

export type BookingPostRequestData = {
  schedule_id: number | undefined
  clearing_agent: string
  transporter: string
  empty_pickup_location: string
  additional_information: string
  empty_pickup_date: string
  customer_clearance: boolean
  transporation: boolean
  insurance: boolean
  rate_types: BookingRateType[]
}
