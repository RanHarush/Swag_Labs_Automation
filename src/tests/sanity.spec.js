import {test, expect} from '@playwright/test'
import LoginPage from '../pages/LoginPage.js'
import InventoryPage from '../pages/InventoryPage.js'
import CartPage from '../pages/CartPage.js'
import CheckoutPage from '../pages/CheckoutPage.js'
import {users} from '../data/users.js'

test.describe('Purchase Flow Sanity Tests', ({page}) => {
  const loginPage = new LoginPage(page)
  const inventoryPage = new InventoryPage(page)
  const cartPage = new CartPage(page)
  const checkoutPage = new CheckoutPage(page)

  test('Login & Add to Cart', async () => {
    await loginPage.goto()
    await loginPage.login(users.standard.username, users.standard.password)
    await inventoryPage.validateLogin()
    await inventoryPage.addItemsToCart(2)
    const cartCount = await inventoryPage.getCartItemCount()
    expect(cartCount).toBe(2)
  })

  test('Go To Cart & Verification', async ({page}) => {
    await inventoryPage.goToCart()
    expect(await page.url()).toBe('https://www.saucedemo.com/cart.html')
    expect(await cartPage.getTitle()).toBe('Your Cart')
    expect(await cartPage.getItemCount()).toBe(2)
  })

  test('Verification & Checkout Step One', async ({page}) => {
    await cartPage.proceedToCheckout()
    expect(await page.url()).toBe(
      'https://www.saucedemo.com/checkout-step-one.html'
    )
    expect(await checkoutPage.getTitle()).toBe('Checkout: Your Information')
    await checkoutPage.fillCheckoutInfo('Test', 'User', '12345')
  })

  test('Verification & Checkout Step Two', async ({page}) => {
    expect(await page.url()).toBe(
      'https://www.saucedemo.com/checkout-step-two.html'
    )
    expect(await checkoutPage.getTitle()).toBe('Checkout: Overview')
  })

  test('Verification & Checkout Complete', async ({page}) => {
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
