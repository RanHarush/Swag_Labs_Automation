import {expect} from '@playwright/test'

export default class CheckoutPage {
  constructor(page) {
    this.page = page
    this.title = this.page.locator('.title')
    this.firstNameInput = this.page.locator('[data-test="firstName"]')
    this.lastNameInput = this.page.locator('[data-test="lastName"]')
    this.postalCodeInput = this.page.locator('[data-test="postalCode"]')
    this.continueButton = this.page.locator('[data-test="continue"]')
    this.finishButton = this.page.locator('[data-test="finish"]')
    this.completeHeader = this.page.locator('.complete-header')
  }

  async fillCheckoutInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
    await this.postalCodeInput.fill(postalCode)
    await this.continueButton.click()
  }

  async finishCheckout() {
    await this.finishButton.click()
  }

  async getTitle() {
    return await this.title.textContent()
  }

  async validateCompleteHeader() {
    await expect(this.completeHeader).toContainText('Thank you for your order')
  }
}
