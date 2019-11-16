import {by, element} from 'protractor'
import {Button, IButton, Input, IInput, IGetInputData, Select, ISelect} from '../elements'
import {Companies} from '../../data'

interface IComputerData {
  computerName?: string
  introducedData?: string
  discontinuedData?: string
  company?: Companies
}

interface IGetForm {
  computerName: IGetInputData
  introducedData: IGetInputData
  discontinuedData: IGetInputData
  company: string
}

interface ISharedForm {
  fillForm: (data: IComputerData) => Promise<void>
  getFormData: () => Promise<IGetForm>
  clickCancel: () => Promise<void>
  getCancel: () => Promise<string>
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

  public async fillForm(fillFormData: IComputerData): Promise<void> {
    // Shorter way to sendKeys to inputs, keys of fillFormData should be same name with class input fields
    for (const [fieldName, dataToSend] of Object.entries(fillFormData)) {
      await this[fieldName].sendKeys(dataToSend)
    }
  }

  public async getFormData(): Promise<IGetForm> {
    return {
      computerName: await this.computerName.getData(),
      introducedData: await this.introducedData.getData(),
      discontinuedData: await this.discontinuedData.getData(),
      company: await this.company.getData()
    }
  }

  public async clickCancel(): Promise<void> {
    return this.cancel.click()
  }

  public async getCancel(): Promise<string> {
    return this.cancel.getData()
  }
}

export {SharedForm, ISharedForm, IComputerData, IGetForm}
