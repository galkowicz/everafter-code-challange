import React from 'react'
import './managersForm.scss'

import { TableData } from '../Table'

type Props = {
  tableData: TableData[]
  onNewManager?(id: string, name: string, managersName: string): void
}

const ManagersForm: React.FC<Props> = ({ tableData = [], onNewManager = () => null }) => {
  const [name, setName] = React.useState('')
  const [selectedManager, setSelectedManager] = React.useState('')

  const nextId = tableData.length + 1
  const existingManagers = ['', ...tableData.map((item) => item.data.name)]

  const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }

  const handleSubmit = () => {
    const isNameAvailable = !existingManagers.includes(name)

    if (isNameAvailable) {
      onNewManager(nextId.toString(), name, selectedManager)
      setName('')
      setSelectedManager('')
    }
  }

  // TODO extract select to it's own component
  const handleSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setSelectedManager(e.currentTarget.value)
  }

  return (
    <div className="add-manager container">
      <div className="new-id">{nextId}</div>
      <div className="new-name">
        <input type="text" onChange={handleNameChange} value={name} />
      </div>
      <div className="managers">
        <select name="managers" id="manager-select" onChange={handleSelectChange}>
          {existingManagers.map((manager) => (
            <option key={manager} value={manager}>
              {manager}
            </option>
          ))}
        </select>
      </div>
      <div className="submit">
        <button onClick={handleSubmit}>Add</button>
      </div>
    </div>
  )
}

export default ManagersForm
