import React from 'react'
import './App.scss'

import Table from './components/Table'
import ManagersForm from './components/ManagersForm'
import AccountsForm from './components/AccountsForm'

import { managers, accounts, Status } from './fakeDB'
import { parseAccountsData, parseManagersData, findAllEmployeesOfManager, getManagerById } from './util'

function App() {
  const [appManagers, setAppManagers] = React.useState(managers)
  const [appAccounts, setAppAccounts] = React.useState(accounts)
  const [selectedManager, setSelectedManager] = React.useState('')
  const [managerEmployees, setManagerEmployees] = React.useState([''])

  const handleManagerClick = (managerId: string) => {
    const selectedManager = getManagerById(managerId, appManagers)
    const { name } = selectedManager || { name: '' }
    const managerEmployees = findAllEmployeesOfManager([name], appManagers)

    setSelectedManager(name)
    setManagerEmployees(managerEmployees)
  }

  const handleAddNewManager = (id: string, name: string, managersName: string) => {
    const newManagerObject = {
      id,
      name,
      manager: managersName,
    }
    setAppManagers([...appManagers, newManagerObject])
  }

  const handleAddNewAccount = (id: string, name: string, managersName: string, isActive: boolean) => {
    const status = isActive ? Status.active : Status.closed
    const newAccountObject = {
      id,
      name,
      accountManager: managersName,
      status,
    }
    setAppAccounts([...appAccounts, newAccountObject])
  }

  const parsedManagers = parseManagersData(appManagers, appAccounts, selectedManager)
  const parsedAccounts = parseAccountsData(appAccounts, managerEmployees, selectedManager)

  return (
    <div className="App container">
      <div className="managers container">
        <Table tableData={parsedManagers} onRowClick={handleManagerClick} />
        <ManagersForm managersData={parsedManagers} onNewManager={handleAddNewManager} />
      </div>
      <div className="accounts container">
        <Table tableData={parsedAccounts} />
        <AccountsForm managersData={parsedManagers} accountsData={parsedAccounts} onNewAccount={handleAddNewAccount} />
      </div>
    </div>
  )
}

export default App
