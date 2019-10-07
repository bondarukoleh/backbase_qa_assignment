import { IComputersPage, IEditComputerPage, IAddComputerPage } from '../page_objects/pages'
import { IComputerData } from '../page_objects/fragments';
import { browser } from 'protractor';

function getTestHelper(computersPage: IComputersPage,
                       editComputerPage?: IEditComputerPage,
                       addComputerPage?: IAddComputerPage) {
  return {
    async deleteComputer(computerData: IComputerData) {
      await browser.get('/')
      await computersPage.filterBy(computerData.computerName)
      await computersPage.computersTable.clickOnComputer(computerData.computerName)
      await editComputerPage.clickDeleteButton()
    },
    async createComputer(computerData: IComputerData) {
      await browser.get('/')
      await computersPage.clickAddNewComputer()
      await addComputerPage.addComputerForm.fillForm(computerData)
      await addComputerPage.clickCreateButton()
    }
  }
}

export { getTestHelper }
