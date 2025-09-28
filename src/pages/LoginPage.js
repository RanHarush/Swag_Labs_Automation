class LoginPage {
  constructor(page) {
    this.page = page;

    // Selectors
    this.usernameInput = '[data-test="username"]';
    this.passwordInput = '[data-test="password"]';
    this.loginButton = '[data-test="login-button"]';
    this.errorMessage = '[data-test="error"]';
  }

  /**
   * Navigate to the login page
   */
  async goto() {
    await this.page.goto("https://www.saucedemo.com");
  }

  /**
   * Login with the provided credentials
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  /**
   * Check if user is logged in by verifying URL
   * @returns {Promise<boolean>}
   */
  async isLoggedIn() {
    return this.page.url().includes("/inventory.html");
  }

  /**
   * Get the error message text if present
   * @returns {Promise<string|null>}
   */
  async getErrorMessage() {
    const errorElement = await this.page.$(this.errorMessage);
    if (errorElement) {
      return errorElement.textContent();
    }
    return null;
  }
}

module.exports = LoginPage;
