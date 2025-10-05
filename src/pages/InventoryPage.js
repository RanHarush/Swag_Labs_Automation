import {expect} from '@playwright/test'

class InventoryPage {
  constructor(page) {
    this.page = page

    // Selectors
    this.title = page.locator('[data-test="title"]')
    this.addToCartButtons = page.locator('[data-test^="add-to-cart"]')
    this.cartBadge = page.locator('[data-test="shopping_cart_badge"]')
    this.cartLink = page.locator('[data-test="shopping_cart_link"]')
  }

  async validateLogin() {
    await expect(this.page).toHaveURL(
      'https://www.saucedemo.com/inventory.html'
    )
    await expect(this.title).toHaveText('Products')
  }

  async goToCart() {
    await this.cartLink.click()
  }
}

export default InventoryPage
