export type DateType = Date | null | undefined

export type UpdateUserFormType = {
  name: string
  phoneNumber: string
  about: string
  address: string
  city: string
  postalCode: string
  country: string
}

export type CommentForm = {
  comment: string
}

export type ReplyFormType = {
  reply: string
}

export type MilestoneFormType = {
  date: DateType
  status: string
  milestone: number | null
  client_action: boolean
  location: string
  vessel: string
  vessel_imo: string
  longitude: number | null
  latitude: number | null
}

export type PartnerSelectType = {
  partner: string
}
