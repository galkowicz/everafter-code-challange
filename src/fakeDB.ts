export interface Manager {
  id: string
  name: string
  manager: string | null
}

export interface Account {
  id: string
  name: string
  accountManager: string
  status: Status
}

export enum Status {
  active = 'ACTIVE',
  closed = 'CLOSED',
}

const managers: Manager[] = [
  { id: '1', name: 'alice', manager: null },
  { id: '2', name: 'bob', manager: 'alice' },
  { id: '3', name: 'charlie', manager: 'alice' },
  { id: '4', name: 'dave', manager: 'bob' },
  { id: '5', name: 'eve', manager: 'charlie' },
  { id: '6', name: 'frank', manager: null },
  { id: '7', name: 'grace', manager: 'ivan' },
  { id: '8', name: 'heidi', manager: 'alice' },
  { id: '9', name: 'ivan', manager: 'bob' },
]

const accounts: Account[] = [
  { id: '1', name: 'hp', accountManager: 'alice', status: Status.active },
  { id: '2', name: 'ibm', accountManager: 'bob', status: Status.active },
  { id: '3', name: 'google', accountManager: 'charlie', status: Status.active },
  { id: '4', name: 'mySpace', accountManager: 'eve', status: Status.closed },
  { id: '5', name: 'united', accountManager: 'dave', status: Status.active },
  { id: '6', name: 'facebook', accountManager: 'bob', status: Status.active },
  { id: '7', name: 'amazon', accountManager: 'bob', status: Status.closed },
  { id: '8', name: 'monday', accountManager: 'heidi', status: Status.closed },
  { id: '9', name: 'gm', accountManager: 'bob', status: Status.active },
  { id: '10', name: 'britishAirways', accountManager: 'frank', status: Status.active },
  { id: '11', name: 'apple', accountManager: 'frank', status: Status.active },
  { id: '12', name: 'microsoft', accountManager: 'ivan', status: Status.closed },
]

export { managers, accounts }
