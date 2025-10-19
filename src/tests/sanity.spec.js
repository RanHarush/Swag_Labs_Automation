import {expect, test} from '@playwright/test'
import {URLS} from '../data/urls.js'
import {users} from '../data/users.js'
import CartPage from '../pages/CartPage.js'
import CheckoutPage from '../pages/CheckoutPage.js'
import InventoryPage from '../pages/InventoryPage.js'
import LoginPage from '../pages/LoginPage.js'

test.describe('Purchase Flow Sanity Tests', () => {
  let loginPage
  let inventoryPage
  let cartPage
  let checkoutPage

  test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page)
    inventoryPage = new InventoryPage(page)
    cartPage = new CartPage(page)
    checkoutPage = new CheckoutPage(page)

    await loginPage.goto()
    await loginPage.login(users.standard.username, users.standard.password)
    await inventoryPage.validateLogin()
    await inventoryPage.addItemsToCart(2)
    await inventoryPage.validateCartItemCount(2)
  })

  test('User Flow', async ({page}) => {
    await inventoryPage.goToCart()
    await expect(page).toHaveURL(URLS.CART)
    await inventoryPage.validatePageTitle('Your Cart')
    await cartPage.getItemCount(2)
    await cartPage.proceedToCheckout()
    await expect(page).toHaveURL(URLS.CHECKOUT)
    await inventoryPage.validatePageTitle('Checkout: Your Information')
    await checkoutPage.fillCheckoutInfo('Test', 'User', '12345')
    await expect(page).toHaveURL(URLS.CHECKOUT_OVERVIEW)
    await inventoryPage.validatePageTitle('Checkout: Overview')
    await checkoutPage.finishCheckout()
    await expect(page).toHaveURL(URLS.CHECKOUT_COMPLETE)
    await inventoryPage.validatePageTitle('Checkout: Complete!')
    await checkoutPage.validateCompleteHeader()
  })
})
