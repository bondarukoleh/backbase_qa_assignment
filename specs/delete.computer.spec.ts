import {pages} from '../page_objects'
import {assertion, getTestHelper} from '../helpers'
import {getAnyComputer} from '../data'
import {expect} from 'chai'

const {computersPage, editComputerPage, addComputerPage} = pages
const testHelper = getTestHelper(computersPage, editComputerPage, addComputerPage)

describe('Delete computer', function () {
  const computerData = getAnyComputer()

  beforeEach(async () => {
    await testHelper.createComputer(computerData)
  })

  it('Test Case #7. Delete a computer.', async function () {
    const noDataText = 'Nothing to display'

    await computersPage.filterBy(computerData.computerName)
    await computersPage.computersTable.clickOnComputer(computerData.computerName)
    await editComputerPage.clickDeleteButton()
    await computersPage.filterBy(computerData.computerName)
    const noDataLabel = await computersPage.computersTable.getNoDataText()

    await assertion(`Computer can be deleted`, async () => {
      expect(noDataLabel).eq(noDataText, `Computer "${computerData.computerName}" is not deleted.`)
    })
  })
})
