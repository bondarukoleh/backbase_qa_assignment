import {pages} from '../page_objects'
import {assertion, getTestHelper} from '../helpers'
import {getAnyComputer} from '../data'
import {expect} from 'chai'

const {computersPage, editComputerPage, addComputerPage} = pages
const testHelper = getTestHelper(computersPage, editComputerPage, addComputerPage)

describe('Filter computer', function () {
  const computerData = getAnyComputer()

  beforeEach(async () => {
    await testHelper.createComputer(computerData)
  })

  afterEach(async () => {
    await testHelper.deleteComputer(computerData)
  })

  it('Test Case #4. Filter a computer.', async function () {
    await computersPage.filterBy(computerData.computerName)
    const tableData = await computersPage.computersTable.getComputersData()

    await assertion(`Created computer shows in filtered table data`, async () => {
      expect(!!tableData.find((computer) => computer['Computer name'] === computerData.computerName))
          .eq(true, `Computer "${computerData.computerName}" is not in the table.`)
    })
  })
})
