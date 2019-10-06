import {by, element} from 'protractor'
import {Button, IButton, Input, IInput, Select, ISelect} from '../elements'
import {Companies} from '../../data'
import {step} from '../../helpers/decorators'

interface IComputerData {
  computerName?: string
  introducedData?: string
  discontinuedData?: string
  company?: Companies
}

interface IGetForm {
  computerName: string
  introducedData: string
  discontinuedData: string
  company: string
}

interface ISharedForm {
  fillForm: (data: IComputerData) => Promise<void>
  getFormData: () => Promise<IGetForm>
}

class SharedForm implements ISharedForm {
  protected computerName: IInput
  protected introducedData: IInput
  protected discontinuedData: IInput
  protected company: ISelect
  protected cancel: IButton

  constructor() {
    this.computerName = new Input(element(by.id('name')))
    this.introducedData = new Input(element(by.id('introduced')))
    this.discontinuedData = new Input(element(by.id('discontinued')))
    this.company = new Select(element(by.id('company')))
    this.cancel = new Button(element(by.buttonText('Cancel')))
  }

  @step('Fill Form')
  public async fillForm(fillFormData: IComputerData): Promise<void> {
    // Shorter way to sendKeys to inputs, keys of fillFormData should be same name with class input fields
    for (const [fieldName, dataToSend] of Object.entries(fillFormData)) {
      await this[fieldName].sendKeys(dataToSend)
    }
  }

  @step('Get Form Data')
  public async getFormData(): Promise<IGetForm> {
    return {
      computerName: await this.computerName.getData(),
      introducedData: await this.introducedData.getData(),
      discontinuedData: await this.discontinuedData.getData(),
      company: await this.company.getData()
    }
  }

  public async clickCancel() {
    return this.cancel.click()
  }

  public async getCancel() {
    return this.cancel.getData()
  }
}

export {SharedForm, ISharedForm, IComputerData}
