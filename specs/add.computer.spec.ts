import {browser} from 'protractor'
import {pages} from '../page_objects'
import {assertion, getTestHelper} from '../helpers';
import {getAnyComputer, getNotValidFormatData} from '../data'
import {expect} from 'chai'

const {computersPage, addComputerPage, editComputerPage} = pages
const testHelper = getTestHelper(computersPage, editComputerPage, addComputerPage)

describe('Add computer', function () {
  beforeEach(async () => {
    await browser.get('/')
  })

  it('Test Case #1. Add a computer to database', async function () {
    const computerData = getAnyComputer()
    const bannetText = `Done! Computer ${computerData.computerName} has been created`

    await computersPage.clickAddNewComputer()
    await addComputerPage.addComputerForm.fillForm(computerData)
    await addComputerPage.clickCreateButton()
    const bannerData = await computersPage.getBannerText()

    await assertion(`Created computer is in computers table`, async () => {
      expect(bannerData).eq(bannetText, `Banner with text "${bannetText}" should appeared`)
    })

    await testHelper.deleteComputer(computerData)
  })

  it('Test Case #2. Add a computer without required / with incorrect data.', async function () {
    let formData = null
    await computersPage.clickAddNewComputer()
    await addComputerPage.addComputerForm.fillForm({computerName: ''})
    await addComputerPage.clickCreateButton()
    formData = await addComputerPage.addComputerForm.getFormData()

    await assertion(`“Computer name” field without value - red colored`, async () => {
      expect(formData.computerName.error).eq(true, `Computer Name should be red colored.`)
    })

    await addComputerPage.addComputerForm.fillForm({introducedData: getNotValidFormatData()})
    await addComputerPage.clickCreateButton()
    formData = await addComputerPage.addComputerForm.getFormData()

    await assertion(`“Introduced data” field wrong format - red colored`, async () => {
      expect(formData.introducedData.error).eq(true, `Introduced data should be red colored.`)
    })
  })
})
