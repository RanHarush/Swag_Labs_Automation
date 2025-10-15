import {expect, test} from '@playwright/test'
import LoginPage from '../pages/LoginPage.js'
import {validUsers, negativeTestCases} from '../data/usersCombos.js'
import InventoryPage from '../pages/InventoryPage.js'

test.describe('Positive Login Tests', () => {
  test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
  })

  validUsers.forEach(({user, name}) => {
    test(`should login successfully with ${name}`, async ({page}) => {
      const loginPage = new LoginPage(page)
      const inventoryPage = new InventoryPage(page)
      await loginPage.login(user.username, user.password)
      await loginPage.verifySuccessfulLogin()
      await inventoryPage.validateLogin()
    })
  })
})

test.describe('Negative Login Tests', () => {
  test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
  })

  negativeTestCases.forEach((testCase) => {
    test(`should show error for ${testCase.name}`, async ({page}) => {
      const loginPage = new LoginPage(page)
      await loginPage.login(testCase.username, testCase.password)
      await expect(loginPage.errorMessage).toBeVisible()

      if (testCase.expectedError) {
        await expect(loginPage.errorMessage).toContainText(
          testCase.expectedError
        )
      }
    })
  })
})
