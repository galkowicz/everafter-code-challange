import React from 'react'
import './AccountsForm.scss'

import Dropdown from '../Dropdown'
import { TableData } from '../Table'

type Props = {
  managersData: TableData[]
  accountsData: TableData[]
  onNewAccount?(id: string, name: string, managersName: string, isActive: boolean): void
}

const AccountsForm: React.FC<Props> = ({ managersData = [], accountsData = [], onNewAccount = () => null }) => {
  const [name, setName] = React.useState('')
  const [selectedManager, setSelectedManager] = React.useState('')
  const [isActive, setIsActive] = React.useState(true)

  const nextId = accountsData.length + 1
  const existingAccounts = ['', ...accountsData.map((item) => item.data.name)]
  const existingManagers = [...managersData.map((item) => item.data.name)]

  const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }

  const handleSubmit = () => {
    const isNameAvailable = !existingAccounts.includes(name)

    if (isNameAvailable && selectedManager !== '') {
      onNewAccount(nextId.toString(), name, selectedManager, isActive)
      setName('')
      setSelectedManager('')
      setIsActive(true)
    }
  }

  const handleStatusChange = () => {
    setIsActive(!isActive)
  }

  const handleSelectChange = (selected: string) => {
    setSelectedManager(selected)
  }

  return (
    <div className="add-account container">
      <div className="new-id">{nextId}</div>
      <div className="new-name">
        <input placeholder="Account" type="text" onChange={handleNameChange} value={name} />
      </div>
      <div className="accounts">
        <Dropdown
          modifier="accounts"
          options={existingManagers}
          defaultValue={selectedManager}
          placeholder="--Please choose an account manager--"
          onSelect={handleSelectChange}
        />
      </div>
      <div className="status">
        <input type="checkbox" checked={isActive} onChange={handleStatusChange} />
      </div>
      <div className="submit">
        <button onClick={handleSubmit}>Add</button>
      </div>
    </div>
  )
}

export default AccountsForm
