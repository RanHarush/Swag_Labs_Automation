import {test, expect} from '@playwright/test'
import LoginPage from '../pages/LoginPage.js'
import InventoryPage from '../pages/InventoryPage.js'
import CartPage from '../pages/CartPage.js'
import CheckoutPage from '../pages/CheckoutPage.js'
import {users} from '../data/users.js'

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
    await loginPage.verifySuccessfulLogin()
    await inventoryPage.addItemsToCart(2)
  })

  test('should login successfully and verify', async () => {
    await inventoryPage.validateLogin()
  })

  test('should add items to cart and verify count', async () => {
    const cartCount = await inventoryPage.getCartItemCount()
    expect(cartCount).toBe(2)
  })

  test('should navigate to cart and verify contents', async ({page}) => {
    await inventoryPage.goToCart()
    expect(await page.url()).toBe('https://www.saucedemo.com/cart.html')
    expect(await cartPage.getTitle()).toBe('Your Cart')
    expect(await cartPage.getItemCount()).toBe(2)
  })

  test('should proceed to checkout', async ({page}) => {
    await inventoryPage.goToCart()
    await cartPage.proceedToCheckout()
    expect(await page.url()).toBe(
      'https://www.saucedemo.com/checkout-step-one.html'
    )
    expect(await checkoutPage.getTitle()).toBe('Checkout: Your Information')
  })

  test('should complete checkout information', async ({page}) => {
    await inventoryPage.goToCart()
    await cartPage.proceedToCheckout()
    await checkoutPage.fillCheckoutInfo('Test', 'User', '12345')
    expect(await page.url()).toBe(
      'https://www.saucedemo.com/checkout-step-two.html'
    )
    expect(await checkoutPage.getTitle()).toBe('Checkout: Overview')
  })

  test('should complete entire purchase flow', async ({page}) => {
    await inventoryPage.goToCart()
    await cartPage.proceedToCheckout()
    await checkoutPage.fillCheckoutInfo('Test', 'User', '12345')
    await checkoutPage.finishCheckout()
    expect(await page.url()).toBe(
      'https://www.saucedemo.com/checkout-complete.html'
    )
    expect(await checkoutPage.getTitle()).toBe('Checkout: Complete!')
    expect(await checkoutPage.getCompleteHeader()).toContain(
      'Thank you for your order'
    )
  })
})
