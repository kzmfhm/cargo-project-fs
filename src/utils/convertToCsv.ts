import { DataGridRowType } from 'src/db/types/example'

interface IndexSignature {
  [key: string]: any
}

function convertToCSV(rows: any) {
  const separator = ','
  const keys = Object.keys(rows[0])
  const csvContent =
    keys.join(separator) +
    '\n' +
    rows.map((row: any) => {
      return keys
        .map((key) => {
          return (row as IndexSignature)[key] as any
        })
        .join(separator)
    })

  return csvContent
}

export default convertToCSV
