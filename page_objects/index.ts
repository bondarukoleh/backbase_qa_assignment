import {
  ComputersPage,
  IComputersPage,
  AddComputerPage,
  IAddComputerPage,
  EditComputerPage,
  IEditComputerPage
} from './pages'

interface IPages {
  computersPage: IComputersPage
  addComputerPage: IAddComputerPage
  editComputerPage: IEditComputerPage
}

export const pages: IPages = {
  computersPage: new ComputersPage(),
  addComputerPage: new AddComputerPage(),
  editComputerPage: new EditComputerPage(),
}
