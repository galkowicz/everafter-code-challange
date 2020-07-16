import React from 'react'
import './App.scss'
import Table from './components/Table'
import { managers, accounts } from './fakeDB'
import { parseAccountsData, parseManagersData } from './util'

function App() {
  const paredAccounts = parseAccountsData(accounts)
  const paredManagers = parseManagersData(managers, accounts)

  return (
    <div className="App container">
      <div className="managers">
        <Table tableData={paredManagers} tableColumns={['id', 'name', 'manager']} />
      </div>
      <div className="accounts">
        <Table tableData={paredAccounts} tableColumns={['id', 'name', 'account manager', 'status']} />
      </div>
    </div>
  )
}

export default App
