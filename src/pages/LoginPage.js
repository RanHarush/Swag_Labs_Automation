import {expect} from '@playwright/test'
import {BASE_URL} from '../data/urls.js'

export default class LoginPage {
  constructor(page) {
    this.page = page
    this.usernameInput = this.page.locator('[data-test="username"]')
    this.passwordInput = this.page.locator('[data-test="password"]')
    this.loginButton = this.page.locator('[data-test="login-button"]')
    this.errorMessage = this.page.locator('[data-test="error"]')
  }

  async goto() {
    await this.page.goto(BASE_URL)
  }

  async login(username, password) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }

  async errorHandler(expectedError) {
    await expect(this.errorMessage).toBeVisible()
    if (expectedError) {
      await expect(this.errorMessage).toContainText(expectedError)
    }
  }
}
