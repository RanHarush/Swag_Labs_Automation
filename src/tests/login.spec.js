const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const users = require("../data/users");

test.describe("Login Functionality", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("should successfully login with valid credentials", async () => {
    // Arrange
    const { username, password } = users.standard;

    // Act
    await loginPage.login(username, password);

    // Assert
    await expect(await loginPage.isLoggedIn()).toBeTruthy();
  });
});
