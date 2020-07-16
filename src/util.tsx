import { Account, Manager, Status } from './fakeDB'

const isManagerWithNoAccounts = (managerName: string, accounts: Account[]) => {
  const accountFound = accounts.find((account) => account.accountManager === managerName)
  return !accountFound
}

const isHighlightedAccount = (account: Account, managerEmployees: string[], selectedManager: string) => {
  const isAccountManagedBySelected = managerEmployees.findIndex((name: string) => name === account.accountManager)
  const isAccountOfSelected = account.accountManager === selectedManager

  return isAccountManagedBySelected !== -1 || isAccountOfSelected
}

const parseAccountsData = (accounts: Account[], managerEmployees: string[], selectedManager: string) => {
  return accounts.map((account) => {
    const disabled = account.status === Status.closed
    const isHighlighted = isHighlightedAccount(account, managerEmployees, selectedManager)

    return { data: { ...account }, metadata: { disabled, ishighlighted: isHighlighted } }
  })
}

const parseManagersData = (managers: Manager[], accounts: Account[], selectedManager: string) => {
  return managers.map((manager) => {
    const noAccounts = isManagerWithNoAccounts(manager.name, accounts)
    const selected = selectedManager === manager.name

    return { data: { ...manager }, metadata: { noaccounts: noAccounts, selected} }
  })
}

const findAllEmployeesOfManager = (managersArray: string[], managers: Manager[]) => {
  let result: Array<string> = []

  const recursiveSearch = (managersArray: string[], managers: Manager[]) => {
    if (managersArray.length === 0) {
      return result
    }

    managersArray.forEach((managerName) => {
      const managersFound = managers
        .filter((manager) => {
          return manager.manager === managerName
        })
        .map((manager) => manager.name)
      result = [...result, ...managersFound]

      recursiveSearch(managersFound, managers)
    })
  }

  recursiveSearch(managersArray, managers)

  return result
}

const getManagerById = (managerId: string, managers: Manager[]) => {
  return managers.find((manager) => manager.id === managerId)
}

export { parseAccountsData, parseManagersData, findAllEmployeesOfManager, getManagerById }
