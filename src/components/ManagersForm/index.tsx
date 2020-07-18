import React from 'react'
import './managersForm.scss'

import Dropdown from '../Dropdown'

import { TableData } from '../Table'

type Props = {
  managersData: TableData[]
  onNewManager?(id: string, name: string, managersName: string): void
}

const ManagersForm: React.FC<Props> = ({ managersData = [], onNewManager = () => null }) => {
  const [name, setName] = React.useState('')
  const [selectedManager, setSelectedManager] = React.useState('')

  const nextId = managersData.length + 1
  const existingManagers = [...managersData.map((item) => item.data.name)]

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

  const handleSelectChange = (selected: string) => {
    setSelectedManager(selected)
  }

  return (
    <div className="add-manager container">
      <div className="new-id">{nextId}</div>
      <div className="new-name">
        <input placeholder="Manager" type="text" onChange={handleNameChange} value={name} />
      </div>
      <div className="managers">
        <Dropdown
          modifier="managers"
          options={existingManagers}
          defaultValue={selectedManager}
          placeholder="--Please choose a manager--"
          onSelect={handleSelectChange}
        />
      </div>
      <div className="submit">
        <button onClick={handleSubmit}>Add</button>
      </div>
    </div>
  )
}

export default ManagersForm
