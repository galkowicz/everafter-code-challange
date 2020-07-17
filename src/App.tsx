import React from 'react'
import './App.scss'
import Table from './components/Table'
import ManagersForm from './components/ManagersForm'
import { managers, accounts } from './fakeDB'
import { parseAccountsData, parseManagersData, findAllEmployeesOfManager, getManagerById } from './util'

function App() {
  const [appManagers, setAppManagers] = React.useState(managers)
  const [appAccounts, setAppAccounts] = React.useState(accounts)
  const [selectedManager, setSelectedManager] = React.useState('')
  const [managerEmployees, setManagerEmployees] = React.useState([''])

  const handleManagerClick = (managerId: string) => {
    const selectedManager = getManagerById(managerId, managers)
    const { name } = selectedManager || { name: '' }
    const managerEmployees = findAllEmployeesOfManager([name], managers)

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

  const parsedManagers = parseManagersData(appManagers, appAccounts, selectedManager)
  const parsedAccounts = parseAccountsData(appAccounts, managerEmployees, selectedManager)

  return (
    <div className="App container">
      <div className="managers">
        <Table tableData={parsedManagers} onRowClick={handleManagerClick} />
        <ManagersForm tableData={parsedManagers} onNewManager={handleAddNewManager} />
      </div>
      <div className="accounts">
        <Table tableData={parsedAccounts} />
      </div>
    </div>
  )
}

export default App
