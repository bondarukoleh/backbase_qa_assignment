import {waitForVisible} from '../../helpers'

interface IText {
  getData: () => Promise<string>
}

class Text implements IText {
  constructor(private root) {
    this.root = root
  }

  public async getData(): Promise<string> {
    await waitForVisible(this.root)
    return this.root.getText()
  }
}

export {Text, IText}
