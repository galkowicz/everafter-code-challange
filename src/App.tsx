import React from 'react'
import './App.scss'
import Table from './components/Table'
import { managers, accounts } from './fakeDB'
import { parseAccountsData, parseManagersData, findAllEmployeesOfManager, getManagerById } from './util'

function App() {
  const [paredManagers, setManagers] = React.useState(parseManagersData(managers, accounts, ''))
  const [paredAccounts, setAccounts] = React.useState(parseAccountsData(accounts, [], ''))

  const handleManagerClick = (managerId: string) => {
    const selectedManager = getManagerById(managerId, managers)
    const { name } = selectedManager || { name: '' }
    const managerEmployees = findAllEmployeesOfManager([name], managers)

    setAccounts(parseAccountsData(accounts, managerEmployees, name))
    setManagers(parseManagersData(managers, accounts, name))
  }

  return (
    <div className="App container">
      <div className="managers">
        <Table tableData={paredManagers} tableColumns={['id', 'name', 'manager']} onRowClick={handleManagerClick} />
      </div>
      <div className="accounts">
        <Table tableData={paredAccounts} tableColumns={['id', 'name', 'account manager', 'status']} />
      </div>
    </div>
  )
}

export default App
