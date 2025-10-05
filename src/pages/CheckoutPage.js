export default class CheckoutPage {
  constructor(page) {
    this.page = page

    // Selectors
    this.title = '.title'
    this.firstNameInput = '[data-test="firstName"]'
    this.lastNameInput = '[data-test="lastName"]'
    this.postalCodeInput = '[data-test="postalCode"]'
    this.continueButton = '[data-test="continue"]'
    this.finishButton = '[data-test="finish"]'
    this.completeHeader = '.complete-header'
  }

  async fillCheckoutInfo(firstName, lastName, postalCode) {
    await this.page.fill(this.firstNameInput, firstName)
    await this.page.fill(this.lastNameInput, lastName)
    await this.page.fill(this.postalCodeInput, postalCode)
    await this.page.click(this.continueButton)
  }

  async finishCheckout() {
    await this.page.click(this.finishButton)
  }

  async getTitle() {
    return await this.page.textContent(this.title)
  }

  async getCompleteHeader() {
    return await this.page.textContent(this.completeHeader)
  }
}
