import { Account, Manager, Status } from './fakeDB'

const isManagerWithNoAccounts = (managerName: string, accounts: Account[]) => {
  const accountFound = accounts.find((account) => account.accountManager === managerName)
  return !accountFound
}

const parseAccountsData = (accounts: Account[]) => {
  return accounts.map((account) => {
    const disabled = account.status === Status.closed

    return { data: { ...account }, metadata: { disabled } }
  })
}

const parseManagersData = (managers: Manager[], accounts: Account[]) => {
  return managers.map((manager) => {
    const noAccounts = isManagerWithNoAccounts(manager.name, accounts)

    return { data: { ...manager }, metadata: { noaccounts: noAccounts } }
  })
}

export { parseAccountsData, parseManagersData }
