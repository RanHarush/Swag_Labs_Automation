import {test, expect} from '@playwright/test'
import LoginPage from '../pages/LoginPage.js'
import {users} from '../data/users'

test.describe('Login Functionality', () => {
  test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
  })

  test('should successfully login with valid credentials', async ({page}) => {
    const loginPage = new LoginPage(page)
    const {username, password} = users.standard
    await loginPage.login(username, password)
    await expect(await loginPage.isLoggedIn()).toBeTruthy()
  })
})
