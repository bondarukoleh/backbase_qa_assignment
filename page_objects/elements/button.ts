import {waitForVisible} from '../../helpers'

interface IButton {
  click: () => Promise<void>
  getData: () => Promise<string>
}

class Button implements IButton {
  constructor(private root) {
    this.root = root
  }

  public async click(): Promise<void> {
    await waitForVisible(this.root)
    await this.root.click()
  }

  public async getData(): Promise<string> {
    await waitForVisible(this.root)
    return this.root.getText()
  }
}

export {Button, IButton}
