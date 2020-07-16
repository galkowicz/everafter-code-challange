import React from 'react'
import './table.scss'

interface TableData {
  data: { id: string }
  [metadata: string]: any
}

type Props = {
  tableData: TableData[]
  tableColumns: string[]
  onRowClick?(rowId: string): void
}

const metadataToCustomAttributes = (metadata: any) => {
  return Object.keys(metadata).reduce((acc, cur) => {
    return { ...acc, [`data-${cur}`]: metadata[cur] }
  }, {})
}

const Table: React.FC<Props> = ({ tableData = [], tableColumns = [], onRowClick = () => null }) => {
  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    onRowClick(e.currentTarget.id)
  }

  return (
    <table className="table" cellPadding="0" cellSpacing="0">
      <thead className="table__header">
        <tr className="table-row">
          {tableColumns.map((item) => (
            <th key={item}>{item}</th>
          ))}
        </tr>
      </thead>

      <tbody className="table__body">
        {tableData.map((item, index) => {
          const { data, metadata = {} } = item
          const attributes = metadataToCustomAttributes(metadata)

          return (
            <tr className="table-row" key={index} onClick={handleRowClick} id={data.id} {...attributes}>
              {Object.values(data).map((colData) => (
                <td key={`${index}-${colData}`}>{colData}</td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
