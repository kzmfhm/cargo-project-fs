export type KPIs = {
  clearance: number
  originalDocuments: number
  payments: number
  doIssuance: number
}

type ContainerizedSeries = {
  name: string
  data: number[]
}

export type ContainerizedShipment = {
  id: string
  ref: string
  desc: string
  origin: string
  destination: string
}

type ContainerizedData = {
  dataSet: number
  shipments: ContainerizedShipment[]
}

export type ContainerizedShipments = {
  [x: string]: any
  series: ContainerizedSeries[]
  data: ContainerizedData[][] // 2D array of ContainerizedData
}

export type DemurrageShipment = {
  id: string
  customer_reference_number: string
  item_description: string
  demurrage: number
}

export type Demurrages = {
  totalDemurrage: number
  series: string
  categories: string
  drillDown: {
    dataSet: number
    shipments: DemurrageShipment[]
  }[]
}

export type DetentionShipment = {
  id: string
  customer_reference_number: string
  item_description: string
  detention: number
}

export type Detentions = {
  totalDetention: number
  series: string
  categories: string
  drillDown: {
    dataSet: number
    shipments: DetentionShipment[]
  }[]
}

export type ImportsCleared = {
  importsCleared: number
  data: number[]
}

export type ExportsCleared = {
  exportsCleared: number
  data: number[]
}

export type TotalImportsExports = {
  imports: number
  importsData: number[]
  exports: number
  exportsData: number[]
}

// ** FclLcl

export type ShipmentFclLclAir = {
  id: string
  ref: string
  desc: string
  origin: string
  destination: string
}

type FclLclAirData = {
  dataSet: number
  shipments: ShipmentFclLclAir[]
}

export type FclLcl = {
  lcldrillDownData: FclLclAirData[]
  fcldrillDownData: FclLclAirData[]
  airdrillDownData: FclLclAirData[]
  lclCount: number[]
  fclCount: number[]
  airCount: number[]
  labels: string[]
}

// ** ShippingCompany

type ShippingCompanyData = {
  x: string
  y: number
}

export type ShipmentShippingCompany = {
  id: string
  ref: string
  desc: string
  line: string
}

type ShippingCompanyDataSets = {
  dataSet: number
  shipments: ShipmentShippingCompany[]
}

export type ShippingCompany = {
  data: ShippingCompanyData[]
  drillDown: ShippingCompanyDataSets[]
}

// ** OriginData

type OriginData = {
  x: string
  y: number
}

export type ShipmentOrigin = {
  id: string
  ref: string
  desc: string
  port: string
}

type OriginDataSets = {
  dataSet: number
  shipments: ShipmentOrigin[]
}

export type Origin = {
  data: OriginData[]
  drillDown: OriginDataSets[]
}

// ** Import Ration Types

type ImportRatioSeries = number[]
export type ImportRatioItem = {
  id: string
  shipmentID: string
  desc: string
  hsc: string
  qty: number
  uom: string
  price: number
}

type importRatioDataSet = {
  dataSet: number
  items: ImportRatioItem[]
}

export type ImportRatioDrillDown = {
  formatter: string
  series: ImportRatioSeries
  drillDown: importRatioDataSet[]
}

// ** LineField

export type LineField = {
  currentTotal: number
  currentData: number[]
  previousTotal: number
  previousData: number[]
}

// ** ShippingLinesDetail

export type ShipmentShippingLine = {
  id: string
  customer_reference_number: string
  item_description: string
  shipping_line: string
}

type ShippingLineData = {
  dataSet: number
  shipments: ShipmentShippingLine[]
}

export type ShippingLinesDetail = {
  forMonths: string[]

  aclSeries: number[]
  aclData: ShippingLineData[]

  admiralLineSeries: number[]
  admiralLineData: ShippingLineData[]

  anlSeries: number[]
  anlData: ShippingLineData[]

  aplSeries: number[]
  aplData: ShippingLineData[]

  arkasSeries: number[]
  arkasData: ShippingLineData[]

  avanaLogistekSeries: number[]
  avanaLogistekData: ShippingLineData[]

  blpSigaporeSeries: number[]
  blpSigaporeData: ShippingLineData[]

  ckLineSeries: number[]
  ckLineData: ShippingLineData[]

  cmaCGMSeries: number[]
  cmaCGMData: ShippingLineData[]

  cncLineSeries: number[]
  cncLineData: ShippingLineData[]

  containerShipContazSeries: number[]
  containerShipContazData: ShippingLineData[]

  cordeliaSeries: number[]
  cordeliaData: ShippingLineData[]

  coscoSeries: number[]
  coscoData: ShippingLineData[]

  cosiarmaSeries: number[]
  cosiarmaData: ShippingLineData[]

  culinesSeries: number[]
  culinesData: ShippingLineData[]

  dalSeries: number[]
  dalData: ShippingLineData[]

  dongYoungSeries: number[]
  dongYoungData: ShippingLineData[]

  donginSeries: number[]
  donginData: ShippingLineData[]

  econSeries: number[]
  econData: ShippingLineData[]

  ecuSeries: number[]
  ecuData: ShippingLineData[]

  emiratesSeries: number[]
  emiratesData: ShippingLineData[]

  evergreenSeries: number[]
  evergreenData: ShippingLineData[]

  fescoSeries: number[]
  fescoData: ShippingLineData[]

  goldStarSeries: number[]
  goldStarData: ShippingLineData[]

  grimaldiSeries: number[]
  grimaldiData: ShippingLineData[]

  hamburgSudSeries: number[]
  hamburgSudData: ShippingLineData[]

  hapagSeries: number[]
  hapagData: ShippingLineData[]

  heungSeries: number[]
  heungData: ShippingLineData[]

  hyundaiSeries: number[]
  hyundaiData: ShippingLineData[]

  iclSeries: number[]
  iclData: ShippingLineData[]

  indusCSeries: number[]
  indusCData: ShippingLineData[]

  interasiaSeries: number[]
  interasiaData: ShippingLineData[]

  kambaraSeries: number[]
  kambaraData: ShippingLineData[]

  kmtcSeries: number[]
  kmtcData: ShippingLineData[]

  macsSeries: number[]
  macsData: ShippingLineData[]

  maerskSeries: number[]
  maerskData: ShippingLineData[]

  margusiaSeries: number[]
  margusiaData: ShippingLineData[]

  melMellSeries: number[]
  melMellData: ShippingLineData[]

  matsonSeries: number[]
  matsonData: ShippingLineData[]

  maxiconSeries: number[]
  maxiconData: ShippingLineData[]

  medkonSeries: number[]
  medkonData: ShippingLineData[]

  melfiSeries: number[]
  melfiData: ShippingLineData[]

  messinaSeries: number[]
  messinaData: ShippingLineData[]

  mscSeries: number[]
  mscData: ShippingLineData[]

  namsungSeries: number[]
  namsungData: ShippingLineData[]

  nsomSeries: number[]
  nsomData: ShippingLineData[]

  nileDSeries: number[]
  nileDData: ShippingLineData[]

  nirintSeries: number[]
  nirintData: ShippingLineData[]

  oneLineSeries: number[]
  oneLineData: ShippingLineData[]

  ooclSeries: number[]
  ooclData: ShippingLineData[]

  othersSeries: number[]
  othersData: ShippingLineData[]

  panAsiaSeries: number[]
  panAsiaData: ShippingLineData[]

  panOceanSeries: number[]
  panOceanData: ShippingLineData[]

  pashaHSeries: number[]
  pashaHData: ShippingLineData[]

  pilSeries: number[]
  pilData: ShippingLineData[]

  pslNavSeries: number[]
  pslNavData: ShippingLineData[]

  rclSeries: number[]
  rclData: ShippingLineData[]

  samuderaSeries: number[]
  samuderaData: ShippingLineData[]

  sarjakSeries: number[]
  sarjakData: ShippingLineData[]

  sascoSeries: number[]
  sascoData: ShippingLineData[]

  sciSeries: number[]
  sciData: ShippingLineData[]

  sealandSeries: number[]
  sealandData: ShippingLineData[]

  shalSeries: number[]
  shalData: ShippingLineData[]

  sidraSeries: number[]
  sidraData: ShippingLineData[]

  sinokorSeries: number[]
  sinokorData: ShippingLineData[]

  sinotransSeries: number[]
  sinotransData: ShippingLineData[]

  sitcLineSeries: number[]
  sitcLineData: ShippingLineData[]

  smLineSeries: number[]
  smLineData: ShippingLineData[]

  spilSeries: number[]
  spilData: ShippingLineData[]

  sunmarineSeries: number[]
  sunmarineData: ShippingLineData[]

  swireSeries: number[]
  swireData: ShippingLineData[]

  tarrosSeries: number[]
  tarrosData: ShippingLineData[]

  toteSeries: number[]
  toteData: ShippingLineData[]

  transAsiaSeries: number[]
  transAsiaData: ShippingLineData[]

  transvisonSeries: number[]
  transvisonData: ShippingLineData[]

  tslinesSeries: number[]
  tslinesData: ShippingLineData[]

  turkonSeries: number[]
  turkonData: ShippingLineData[]

  wanHaiSeries: number[]
  wanHaiData: ShippingLineData[]

  wecLinesSeries: number[]
  wecLinesData: ShippingLineData[]

  yangMingSeries: number[]
  yangMingData: ShippingLineData[]

  zimLineSeries: number[]
  zimLineData: ShippingLineData[]

  otherLineSeries: number[]
  otherLineData: ShippingLineData[]
}
