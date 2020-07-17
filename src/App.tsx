import React from 'react'
import './App.scss'
import Table from './components/Table'
import ManagersForm from './components/ManagersForm'
import { managers, accounts } from './fakeDB'
import { parseAccountsData, parseManagersData, findAllEmployeesOfManager, getManagerById } from './util'

function App() {
  const [paredManagers, setManagers] = React.useState(parseManagersData(managers, accounts, ''))
  const [paredAccounts, setAccounts] = React.useState(parseAccountsData(accounts, [], ''))

  const handleManagerClick = (managerId: string) => {
    // TODO change state to use unparsed lists
    const selectedManager = getManagerById(managerId, managers)
    const { name } = selectedManager || { name: '' }
    const managerEmployees = findAllEmployeesOfManager([name], managers)

    setAccounts(parseAccountsData(accounts, managerEmployees, name))
    setManagers(parseManagersData(managers, accounts, name))
  }

  const handleAddNewManager = (id: string, name: string, managersName: string) => {
    const newManagerObject = {
      data: { id, name, manager: managersName },
      metadata: { noaccounts: true, selected: false },
    }
    setManagers([...paredManagers, newManagerObject])
  }

  return (
    <div className="App container">
      <div className="managers">
        <Table tableData={paredManagers} onRowClick={handleManagerClick} />
        <ManagersForm tableData={paredManagers} onNewManager={handleAddNewManager} />
      </div>
      <div className="accounts">
        <Table tableData={paredAccounts} />
      </div>
    </div>
  )
}

export default App
