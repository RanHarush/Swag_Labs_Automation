class LoginPage {
  constructor(page) {
    this.page = page

    // Selectors
    this.usernameInput = '[data-test="username"]'
    this.passwordInput = '[data-test="password"]'
    this.loginButton = '[data-test="login-button"]'
    this.errorMessage = '[data-test="error"]'
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com')
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username)
    await this.page.fill(this.passwordInput, password)
    await this.page.click(this.loginButton)
  }
}

export default LoginPage
