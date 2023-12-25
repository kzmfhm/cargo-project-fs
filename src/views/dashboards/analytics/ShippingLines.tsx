import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  Stack,
  Button,
  Typography,
  LinearProgress
} from '@mui/material'
// ** Third Party Imports
import { ApexOptions } from 'apexcharts'
// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import columnColors from 'src/db/fixtures/shippingLineColumnColors'
import { useTheme } from '@mui/material/styles'

// Grid Table Imports
import { DataGrid, GridRowParams } from '@mui/x-data-grid'

// ** Router
import { useRouter } from 'next/router'
import { useAppSelector } from 'src/hooks/useRedux'

import { ShipmentShippingLine } from 'src/db/types/analytics'
import { Icon } from '@iconify/react'

interface CellType {
  row: ShipmentShippingLine
}

const columns = [
  {
    flex: 0.1,
    field: 'customer_reference_number',
    minWidth: 150,
    maxWidth: 300,
    headerName: 'Ref #',
    renderCell: ({ row }: CellType) => {
      const { customer_reference_number } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ color: 'text.primary', fontWeight: 100, fontSize: 15 }}>
            {customer_reference_number}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    field: 'item_description',
    minWidth: 150,
    maxWidth: 300,
    headerName: 'Item Description',
    renderCell: ({ row }: CellType) => {
      const { item_description } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 100 }}>
              {item_description}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    field: 'shipping_line',
    minWidth: 150,
    maxWidth: 300,
    headerName: 'Shipping line',
    renderCell: ({ row }: CellType) => {
      const { shipping_line } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'start' }}>
          <Typography sx={{ color: 'text.primary', fontWeight: 100, fontSize: 15 }}>
            {shipping_line}
          </Typography>
        </Box>
      )
    }
  }
]

const ShippingLines = () => {
  // ** States
  const [open, setOpen] = useState<boolean>(false)
  const [drilledData, setDrilledData] = useState([])
  // Handle Edit dialog
  const handleEditClickOpen = () => setOpen(true)
  const handleEditClose = () => setOpen(false)

  const router = useRouter()
  const [pageSize, setPageSize] = useState(10)

  const handleEvent = (params: GridRowParams) => {
    const { id: uuid } = params.row
    router.push(`/shipments/${uuid}`)
  }

  const { shippingLinesDetailLoading, shippingLinesDetail, shippingLinesDetailError } =
    useAppSelector((state) => state.analytics)
  // ** Hook
  const theme = useTheme()

  const drillDownData = (pertinentData: any, dataPointIndex: number) => {
    // Refactor this code to remove if else statements to some thing better
    console.log('dataPointIndex', dataPointIndex)
    const filteredData = pertinentData.filter(
      (item: any) => item.dataSet === dataPointIndex
    )
    setDrilledData(filteredData[0].shipments)

    setOpen(true)
    return null
  }

  // ** Chart Series
  const series = [
    {
      name: 'ACL',
      data: shippingLinesDetail?.aclSeries || []
    },
    {
      name: 'ADMIRAL',
      data: shippingLinesDetail?.admiralLineSeries || []
    },
    {
      name: 'ANL',
      data: shippingLinesDetail?.anlSeries || []
    },
    {
      name: 'APL',
      data: shippingLinesDetail?.aplSeries || []
    },
    {
      name: 'ARKAS',
      data: shippingLinesDetail?.arkasSeries || []
    },
    {
      name: 'AVANA',
      data: shippingLinesDetail?.avanaLogistekSeries || []
    },
    {
      name: 'BLP',
      data: shippingLinesDetail?.blpSigaporeSeries || []
    },
    {
      name: 'CK',
      data: shippingLinesDetail?.ckLineSeries || []
    },
    {
      name: 'CMA',
      data: shippingLinesDetail?.cmaCGMSeries || []
    },
    {
      name: 'CNC',
      data: shippingLinesDetail?.cncLineSeries || []
    },
    {
      name: 'CSC',
      data: shippingLinesDetail?.containerShipContazSeries || []
    },
    {
      name: 'CORDELIA',
      data: shippingLinesDetail?.cordeliaSeries || []
    },
    {
      name: 'COSCO',
      data: shippingLinesDetail?.coscoSeries || []
    },
    {
      name: 'COSIARMA',
      data: shippingLinesDetail?.cosiarmaSeries || []
    },
    {
      name: 'CULINES',
      data: shippingLinesDetail?.culinesSeries || []
    },
    {
      name: 'DAL',
      data: shippingLinesDetail?.dalSeries || []
    },
    {
      name: 'DONGYOUNG',
      data: shippingLinesDetail?.dongYoungSeries || []
    },
    {
      name: 'DONGIN',
      data: shippingLinesDetail?.donginSeries || []
    },
    {
      name: 'ECON',
      data: shippingLinesDetail?.econSeries || []
    },
    {
      name: 'ECU',
      data: shippingLinesDetail?.ecuSeries || []
    },
    {
      name: 'EMIRATES',
      data: shippingLinesDetail?.emiratesSeries || []
    },
    {
      name: 'EVERGREEN',
      data: shippingLinesDetail?.evergreenSeries || []
    },
    {
      name: 'FESCO',
      data: shippingLinesDetail?.fescoSeries || []
    },
    {
      name: 'GOLDSTAR',
      data: shippingLinesDetail?.goldStarSeries || []
    },
    {
      name: 'GRIMALD',
      data: shippingLinesDetail?.grimaldiSeries || []
    },
    {
      name: 'HAMOURG',
      data: shippingLinesDetail?.hamburgSudSeries || []
    },
    {
      name: 'HAPAG',
      data: shippingLinesDetail?.hapagSeries || []
    },
    {
      name: 'HEUNG',
      data: shippingLinesDetail?.heungSeries || []
    },
    {
      name: 'HYUNDAI',
      data: shippingLinesDetail?.hyundaiSeries || []
    },
    {
      name: 'ICL',
      data: shippingLinesDetail?.iclSeries || []
    },
    {
      name: 'INDUS',
      data: shippingLinesDetail?.indusCSeries || []
    },
    {
      name: 'INTERASIA',
      data: shippingLinesDetail?.interasiaSeries || []
    },
    {
      name: 'KAMBARA',
      data: shippingLinesDetail?.kambaraSeries || []
    },
    {
      name: 'KMTC',
      data: shippingLinesDetail?.kmtcSeries || []
    },
    {
      name: 'MACS',
      data: shippingLinesDetail?.macsSeries || []
    },
    {
      name: 'MAERSK',
      data: shippingLinesDetail?.maerskSeries || []
    },
    {
      name: 'MARGUSIA',
      data: shippingLinesDetail?.margusiaSeries || []
    },
    {
      name: 'MEL',
      data: shippingLinesDetail?.melMellSeries || []
    },
    {
      name: 'MATSON',
      data: shippingLinesDetail?.matsonSeries || []
    },
    {
      name: 'MAXICON',
      data: shippingLinesDetail?.maxiconSeries || []
    },
    {
      name: 'MEDKON',
      data: shippingLinesDetail?.medkonSeries || []
    },
    {
      name: 'MEFI',
      data: shippingLinesDetail?.melfiSeries || []
    },
    {
      name: 'MESSINA',
      data: shippingLinesDetail?.messinaSeries || []
    },
    {
      name: 'MSC',
      data: shippingLinesDetail?.mscSeries || []
    },
    {
      name: 'NAMSUNG',
      data: shippingLinesDetail?.namsungSeries || []
    },
    {
      name: 'NSOM',
      data: shippingLinesDetail?.nsomSeries || []
    },
    {
      name: 'NILE',
      data: shippingLinesDetail?.nileDSeries || []
    },
    {
      name: 'NIRINT',
      data: shippingLinesDetail?.nirintSeries || []
    },
    {
      name: 'ONE',
      data: shippingLinesDetail?.oneLineSeries || []
    },
    {
      name: 'OOCL',
      data: shippingLinesDetail?.ooclSeries || []
    },
    {
      name: 'OTHERS',
      data: shippingLinesDetail?.othersSeries || []
    },
    {
      name: 'PAN ASIA',
      data: shippingLinesDetail?.panAsiaSeries || []
    },
    {
      name: 'PAN OCEAN',
      data: shippingLinesDetail?.panOceanSeries || []
    },
    {
      name: 'PASHA',
      data: shippingLinesDetail?.pashaHSeries || []
    },
    {
      name: 'PIL',
      data: shippingLinesDetail?.pilSeries || []
    },
    {
      name: 'PSLNAV',
      data: shippingLinesDetail?.pslNavSeries || []
    },
    {
      name: 'RCL',
      data: shippingLinesDetail?.rclSeries || []
    },
    {
      name: 'SAMUDERA',
      data: shippingLinesDetail?.samuderaSeries || []
    },
    {
      name: 'SARJAK',
      data: shippingLinesDetail?.sarjakSeries || []
    },
    {
      name: 'SASCO',
      data: shippingLinesDetail?.sascoSeries || []
    },
    {
      name: 'SCI',
      data: shippingLinesDetail?.sciSeries || []
    },
    {
      name: 'SEAL',
      data: shippingLinesDetail?.sealandSeries || []
    },
    {
      name: 'SHAL',
      data: shippingLinesDetail?.shalSeries || []
    },
    {
      name: 'SIDRA',
      data: shippingLinesDetail?.sidraSeries || []
    },
    {
      name: 'SINOKOR',
      data: shippingLinesDetail?.sinokorSeries || []
    },
    {
      name: 'SINOTRANS',
      data: shippingLinesDetail?.sinotransSeries || []
    },
    {
      name: 'SITCH',
      data: shippingLinesDetail?.sitcLineSeries || []
    },
    {
      name: 'SM LINE',
      data: shippingLinesDetail?.smLineSeries || []
    },
    {
      name: 'SPILL',
      data: shippingLinesDetail?.spilSeries || []
    },
    {
      name: 'SUNMARINE',
      data: shippingLinesDetail?.sunmarineSeries || []
    },
    {
      name: 'SWIRE',
      data: shippingLinesDetail?.swireSeries || []
    },
    {
      name: 'TARROS',
      data: shippingLinesDetail?.tarrosSeries || []
    },
    {
      name: 'TOTE',
      data: shippingLinesDetail?.toteSeries || []
    },
    {
      name: 'T ASIA',
      data: shippingLinesDetail?.transAsiaSeries || []
    },
    {
      name: 'TRANSVISON',
      data: shippingLinesDetail?.transvisonSeries || []
    },
    {
      name: 'TS LINES',
      data: shippingLinesDetail?.tslinesSeries || []
    },
    {
      name: 'TURKON',
      data: shippingLinesDetail?.turkonSeries || []
    },
    {
      name: 'WAN HAI',
      data: shippingLinesDetail?.wanHaiSeries || []
    },
    {
      name: 'WEC',
      data: shippingLinesDetail?.wecLinesSeries || []
    },
    {
      name: 'YANG',
      data: shippingLinesDetail?.yangMingSeries || []
    },
    {
      name: 'ZIM',
      data: shippingLinesDetail?.zimLineSeries || []
    },
    {
      name: 'OTHER',
      data: shippingLinesDetail?.otherLineSeries || []
    }
  ]

  const options: ApexOptions = {
    chart: {
      offsetX: -10,
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false },
      events: {
        dataPointSelection: (event: any, chartContext: any, config: any) => {
          switch (config.seriesIndex) {
            case 0:
              drillDownData(shippingLinesDetail?.aclData, parseInt(config.dataPointIndex))
              break
            case 1:
              drillDownData(
                shippingLinesDetail?.admiralLineData,
                parseInt(config.dataPointIndex)
              )
              break
            case 2:
              drillDownData(shippingLinesDetail?.anlData, parseInt(config.dataPointIndex))
              break
            case 3:
              drillDownData(shippingLinesDetail?.aplData, parseInt(config.dataPointIndex))
              break
            case 4:
              drillDownData(
                shippingLinesDetail?.arkasData,
                parseInt(config.dataPointIndex)
              )
              break
            case 5:
              drillDownData(
                shippingLinesDetail?.avanaLogistekData,
                parseInt(config.dataPointIndex)
              )
              break
            case 6:
              drillDownData(
                shippingLinesDetail?.blpSigaporeData,
                parseInt(config.dataPointIndex)
              )
              break
            case 7:
              drillDownData(
                shippingLinesDetail?.ckLineData,
                parseInt(config.dataPointIndex)
              )
              break
            case 8:
              drillDownData(
                shippingLinesDetail?.cmaCGMData,
                parseInt(config.dataPointIndex)
              )
              break
            case 9:
              drillDownData(
                shippingLinesDetail?.cncLineData,
                parseInt(config.dataPointIndex)
              )
              break
            case 10:
              drillDownData(
                shippingLinesDetail?.containerShipContazData,
                parseInt(config.dataPointIndex)
              )
              break
            case 11:
              drillDownData(
                shippingLinesDetail?.cordeliaData,
                parseInt(config.dataPointIndex)
              )
              break
            case 12:
              drillDownData(
                shippingLinesDetail?.coscoData,
                parseInt(config.dataPointIndex)
              )
              break
            case 13:
              drillDownData(
                shippingLinesDetail?.cosiarmaData,
                parseInt(config.dataPointIndex)
              )
              break
            case 14:
              drillDownData(
                shippingLinesDetail?.culinesData,
                parseInt(config.dataPointIndex)
              )
              break
            case 15:
              drillDownData(shippingLinesDetail?.dalData, parseInt(config.dataPointIndex))
              break
            case 16:
              drillDownData(
                shippingLinesDetail?.dongYoungData,
                parseInt(config.dataPointIndex)
              )
              break
            case 17:
              drillDownData(
                shippingLinesDetail?.donginData,
                parseInt(config.dataPointIndex)
              )
              break
            case 18:
              drillDownData(
                shippingLinesDetail?.econData,
                parseInt(config.dataPointIndex)
              )
              break
            case 19:
              drillDownData(shippingLinesDetail?.ecuData, parseInt(config.dataPointIndex))
              break
            case 20:
              drillDownData(
                shippingLinesDetail?.emiratesData,
                parseInt(config.dataPointIndex)
              )
              break
            case 21:
              drillDownData(
                shippingLinesDetail?.evergreenData,
                parseInt(config.dataPointIndex)
              )
              break
            case 22:
              drillDownData(
                shippingLinesDetail?.fescoData,
                parseInt(config.dataPointIndex)
              )
              break
            case 23:
              drillDownData(
                shippingLinesDetail?.goldStarData,
                parseInt(config.dataPointIndex)
              )
              break
            case 24:
              drillDownData(
                shippingLinesDetail?.grimaldiData,
                parseInt(config.dataPointIndex)
              )
              break
            case 25:
              drillDownData(
                shippingLinesDetail?.hamburgSudData,
                parseInt(config.dataPointIndex)
              )
              break
            case 26:
              drillDownData(
                shippingLinesDetail?.hapagData,
                parseInt(config.dataPointIndex)
              )
              break
            case 27:
              drillDownData(
                shippingLinesDetail?.heungData,
                parseInt(config.dataPointIndex)
              )
              break
            case 28:
              drillDownData(
                shippingLinesDetail?.hyundaiData,
                parseInt(config.dataPointIndex)
              )
              break
            case 29:
              drillDownData(shippingLinesDetail?.iclData, parseInt(config.dataPointIndex))
              break
            case 30:
              drillDownData(
                shippingLinesDetail?.indusCData,
                parseInt(config.dataPointIndex)
              )
              break
            case 31:
              drillDownData(
                shippingLinesDetail?.interasiaData,
                parseInt(config.dataPointIndex)
              )
              break
            case 32:
              drillDownData(
                shippingLinesDetail?.kambaraData,
                parseInt(config.dataPointIndex)
              )
              break
            case 33:
              drillDownData(
                shippingLinesDetail?.kmtcData,
                parseInt(config.dataPointIndex)
              )
              break
            case 34:
              drillDownData(
                shippingLinesDetail?.macsData,
                parseInt(config.dataPointIndex)
              )
              break
            case 35:
              drillDownData(
                shippingLinesDetail?.maerskData,
                parseInt(config.dataPointIndex)
              )
              break
            case 36:
              drillDownData(
                shippingLinesDetail?.margusiaData,
                parseInt(config.dataPointIndex)
              )
              break
            case 37:
              drillDownData(
                shippingLinesDetail?.melMellData,
                parseInt(config.dataPointIndex)
              )
              break
            case 38:
              drillDownData(
                shippingLinesDetail?.matsonData,
                parseInt(config.dataPointIndex)
              )
              break
            case 39:
              drillDownData(
                shippingLinesDetail?.maxiconData,
                parseInt(config.dataPointIndex)
              )
              break
            case 40:
              drillDownData(
                shippingLinesDetail?.medkonData,
                parseInt(config.dataPointIndex)
              )
              break
            case 41:
              drillDownData(
                shippingLinesDetail?.melfiData,
                parseInt(config.dataPointIndex)
              )
              break
            case 42:
              drillDownData(
                shippingLinesDetail?.messinaData,
                parseInt(config.dataPointIndex)
              )
              break
            case 43:
              drillDownData(shippingLinesDetail?.mscData, parseInt(config.dataPointIndex))
              break
            case 44:
              drillDownData(
                shippingLinesDetail?.namsungData,
                parseInt(config.dataPointIndex)
              )
              break
            case 45:
              drillDownData(
                shippingLinesDetail?.nsomData,
                parseInt(config.dataPointIndex)
              )
              break
            case 46:
              drillDownData(
                shippingLinesDetail?.nileDData,
                parseInt(config.dataPointIndex)
              )
              break
            case 47:
              drillDownData(
                shippingLinesDetail?.nirintData,
                parseInt(config.dataPointIndex)
              )
              break
            case 48:
              drillDownData(
                shippingLinesDetail?.oneLineData,
                parseInt(config.dataPointIndex)
              )
              break
            case 49:
              drillDownData(
                shippingLinesDetail?.ooclData,
                parseInt(config.dataPointIndex)
              )
              break
            case 50:
              drillDownData(
                shippingLinesDetail?.othersData,
                parseInt(config.dataPointIndex)
              )
              break
            case 51:
              drillDownData(
                shippingLinesDetail?.panAsiaData,
                parseInt(config.dataPointIndex)
              )
              break
            case 52:
              drillDownData(
                shippingLinesDetail?.panOceanData,
                parseInt(config.dataPointIndex)
              )
              break
            case 53:
              drillDownData(
                shippingLinesDetail?.pashaHData,
                parseInt(config.dataPointIndex)
              )
              break
            case 54:
              drillDownData(shippingLinesDetail?.pilData, parseInt(config.dataPointIndex))
              break
            case 55:
              drillDownData(
                shippingLinesDetail?.pslNavData,
                parseInt(config.dataPointIndex)
              )
              break
            case 56:
              drillDownData(shippingLinesDetail?.rclData, parseInt(config.dataPointIndex))
              break
            case 57:
              drillDownData(
                shippingLinesDetail?.samuderaData,
                parseInt(config.dataPointIndex)
              )
              break
            case 58:
              drillDownData(
                shippingLinesDetail?.sarjakData,
                parseInt(config.dataPointIndex)
              )
              break
            case 59:
              drillDownData(
                shippingLinesDetail?.sascoData,
                parseInt(config.dataPointIndex)
              )
              break
            case 60:
              drillDownData(shippingLinesDetail?.sciData, parseInt(config.dataPointIndex))
              break
            case 61:
              drillDownData(
                shippingLinesDetail?.sealandData,
                parseInt(config.dataPointIndex)
              )
              break
            case 62:
              drillDownData(
                shippingLinesDetail?.shalData,
                parseInt(config.dataPointIndex)
              )
              break
            case 63:
              drillDownData(
                shippingLinesDetail?.sidraData,
                parseInt(config.dataPointIndex)
              )
              break
            case 64:
              drillDownData(
                shippingLinesDetail?.sinokorData,
                parseInt(config.dataPointIndex)
              )
              break
            case 65:
              drillDownData(
                shippingLinesDetail?.sinotransData,
                parseInt(config.dataPointIndex)
              )
              break
            case 66:
              drillDownData(
                shippingLinesDetail?.sitcLineData,
                parseInt(config.dataPointIndex)
              )
              break
            case 67:
              drillDownData(
                shippingLinesDetail?.smLineData,
                parseInt(config.dataPointIndex)
              )
              break
            case 68:
              drillDownData(
                shippingLinesDetail?.spilData,
                parseInt(config.dataPointIndex)
              )
              break
            case 69:
              drillDownData(
                shippingLinesDetail?.sunmarineData,
                parseInt(config.dataPointIndex)
              )
              break
            case 70:
              drillDownData(
                shippingLinesDetail?.swireData,
                parseInt(config.dataPointIndex)
              )
              break
            case 71:
              drillDownData(
                shippingLinesDetail?.tarrosData,
                parseInt(config.dataPointIndex)
              )
              break
            case 72:
              drillDownData(
                shippingLinesDetail?.toteData,
                parseInt(config.dataPointIndex)
              )
              break
            case 73:
              drillDownData(
                shippingLinesDetail?.transAsiaData,
                parseInt(config.dataPointIndex)
              )
              break
            case 74:
              drillDownData(
                shippingLinesDetail?.transvisonData,
                parseInt(config.dataPointIndex)
              )
              break
            case 75:
              drillDownData(
                shippingLinesDetail?.tslinesData,
                parseInt(config.dataPointIndex)
              )
              break
            case 76:
              drillDownData(
                shippingLinesDetail?.turkonData,
                parseInt(config.dataPointIndex)
              )
              break
            case 77:
              drillDownData(
                shippingLinesDetail?.wanHaiData,
                parseInt(config.dataPointIndex)
              )
              break
            case 78:
              drillDownData(
                shippingLinesDetail?.wecLinesData,
                parseInt(config.dataPointIndex)
              )
              break
            case 79:
              drillDownData(
                shippingLinesDetail?.yangMingData,
                parseInt(config.dataPointIndex)
              )
              break
            case 80:
              drillDownData(
                shippingLinesDetail?.zimLineData,
                parseInt(config.dataPointIndex)
              )
            case 81:
              drillDownData(
                shippingLinesDetail?.otherLineData,
                parseInt(config.dataPointIndex)
              )
              break
          }
        }
      }
    },

    fill: { opacity: 1 },
    dataLabels: { enabled: false },
    colors: [
      columnColors.series1,
      columnColors.series2,
      columnColors.series3,
      columnColors.series4,
      columnColors.series5,
      columnColors.series6,
      columnColors.series7,
      columnColors.series8,
      columnColors.series9,
      columnColors.series10,
      columnColors.series11,
      columnColors.series12,
      columnColors.series13,
      columnColors.series14,
      columnColors.series15,
      columnColors.series16,
      columnColors.series17,
      columnColors.series18,
      columnColors.series19,
      columnColors.series20,
      columnColors.series21,
      columnColors.series22,
      columnColors.series23,
      columnColors.series24,
      columnColors.series25,
      columnColors.series26,
      columnColors.series27,
      columnColors.series28,
      columnColors.series29,
      columnColors.series30,
      columnColors.series31,
      columnColors.series32,
      columnColors.series33,
      columnColors.series34,
      columnColors.series35,
      columnColors.series36,
      columnColors.series37,
      columnColors.series38,
      columnColors.series39,
      columnColors.series40,
      columnColors.series41,
      columnColors.series42,
      columnColors.series43,
      columnColors.series44,
      columnColors.series45,
      columnColors.series46,
      columnColors.series47,
      columnColors.series48,
      columnColors.series49,
      columnColors.series50,
      columnColors.series51,
      columnColors.series52,
      columnColors.series53,
      columnColors.series54,
      columnColors.series55,
      columnColors.series56,
      columnColors.series57,
      columnColors.series58,
      columnColors.series59,
      columnColors.series60,
      columnColors.series61,
      columnColors.series62,
      columnColors.series63,
      columnColors.series64,
      columnColors.series65,
      columnColors.series66,
      columnColors.series67,
      columnColors.series68,
      columnColors.series69,
      columnColors.series70,
      columnColors.series71,
      columnColors.series72,
      columnColors.series73,
      columnColors.series74,
      columnColors.series75,
      columnColors.series76,
      columnColors.series77,
      columnColors.series78,
      columnColors.series79,
      columnColors.series80,
      columnColors.series81
    ],
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      labels: { colors: theme.palette.text.secondary },
      markers: {
        offsetY: 1,
        offsetX: -3
      },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    stroke: {
      show: true,
      colors: ['transparent']
    },
    plotOptions: {
      bar: {
        columnWidth: '15%',
        colors: {
          backgroundBarRadius: 10,
          backgroundBarColors: [
            columnColors.bg,
            columnColors.bg,
            columnColors.bg,
            columnColors.bg,
            columnColors.bg
          ]
        }
      }
    },
    grid: {
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      }
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      categories: shippingLinesDetail?.forMonths || [],
      crosshairs: {
        stroke: { color: theme.palette.divider }
      },
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '35%'
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      {/* <Button variant="contained" sx={{ mr: 2 }} onClick={handleEditClickOpen}>
        test
      </Button> */}
      {shippingLinesDetailLoading && <LinearProgress sx={{ height: '2px' }} />}
      {shippingLinesDetailError && (
        <Box sx={{ p: 3 }}>
          <Typography variant="body2" color="error">
            {shippingLinesDetailError}
          </Typography>
        </Box>
      )}
      <CardHeader
        title="Shipping Line Details"
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />
      <CardContent>
        <ReactApexcharts type="bar" height={400} options={options} series={series} />
      </CardContent>
      <Dialog
        open={open}
        onClose={handleEditClose}
        aria-labelledby="user-view-edit"
        aria-describedby="user-view-edit-description"
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 950 } }}
      >
        <Card>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ p: 2 }}
          >
            <CardHeader title="Imports" />

            <Button onClick={handleEditClose} color="primary" size="small">
              <Icon fontSize="2.025rem" icon="radix-icons:cross-2" />
            </Button>
          </Stack>
          <DataGrid
            autoHeight
            pagination
            rows={drilledData || []}
            columns={columns}
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[5, 10]}
            onPageSizeChange={(size) => setPageSize(size)}
            onRowClick={handleEvent}
          />
        </Card>
      </Dialog>
    </Card>
  )
}

export default ShippingLines
