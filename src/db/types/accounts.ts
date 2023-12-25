// Partner
//-------------------

export type Group = {
  name: string
  plateform_fee: number
  discount: number
}

export type Partner = {
  id: string
  name: string
  group?: Group
}
