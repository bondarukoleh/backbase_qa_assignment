import {pages} from '../page_objects'
import {assertion, getTestHelper} from '../helpers'
import {getAnyComputer} from '../data'
import {expect} from 'chai'

const {computersPage, addComputerPage, editComputerPage} = pages
const testHelper = getTestHelper(computersPage, editComputerPage, addComputerPage)

describe('Edit computer', function () {
  const computerData = getAnyComputer()
  const {company, computerName, ...newComputerData} = getAnyComputer()

  beforeEach(async () => {
    await testHelper.createComputer(computerData)
  })

  afterEach(async () => {
    await testHelper.deleteComputer(computerData)
  })

  it('Test Case #3. Edit added computer.', async function () {
    await computersPage.filterBy(computerData.computerName)
    await computersPage.clickTableComputer(computerData.computerName)
    await editComputerPage.fillComputerForm(newComputerData)
    await editComputerPage.clickSaveButton()
    await computersPage.filterBy(computerData.computerName)
    await computersPage.clickTableComputer(computerData.computerName)
    const formData = await editComputerPage.getComputerForm()

    await assertion(`Computer data can be edited`, async () => {
      expect(formData.introducedData.value).eq(newComputerData.introducedData,
          `Field Introduced data is not changed to "${newComputerData.introducedData}"`)
      expect(formData.discontinuedData.value).eq(newComputerData.discontinuedData,
          `Field Discontinued data is not changed to "${newComputerData.discontinuedData}"`)
    })
  })
})
