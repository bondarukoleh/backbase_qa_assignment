import {browser} from 'protractor'
import {pages} from '../page_objects'
import {Companies} from '../data'

const {computersPage, addComputerPage} = pages

describe('First suite', function () {
  beforeEach(async () => {
    await browser.get('/')
  })

  it('first test', async function () {
    const formData = {
      computerName: 'test name',
      discontinuedData: '1980-10-10',
      introducedData: '1970-10-10',
      company: Companies.lincolnLaboratory
    }

    const data = await computersPage.computersTable.getComputersData()
    console.log('%j', data)
    await computersPage.clickAddNewComputer()
    await addComputerPage.addComputerForm.fillForm(formData)
    const gotFormData = await addComputerPage.addComputerForm.getFormData()
    console.log('%j', gotFormData)
    await addComputerPage.clickCreateButton()
  })
})
