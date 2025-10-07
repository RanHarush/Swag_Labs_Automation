import {expect} from '@playwright/test'

export default class InventoryPage {
  constructor(page) {
    this.page = page
    this.title = page.locator('[data-test="title"]')
    this.addToCartButtons = page.locator('[data-test^="add-to-cart"]')
    this.cartBadge = page.locator('.shopping_cart_badge')
    this.cartLink = page.locator('[data-test="shopping_cart_link"]')
  }

  async validateLogin() {
    await expect(this.page).toHaveURL(
      'https://www.saucedemo.com/inventory.html'
    )
    await expect(this.title).toHaveText('Products')
  }

  async goToCart() {
    await this.page.click('.shopping_cart_container')
  }

  async addItemsToCart(count) {
    const buttons = this.addToCartButtons
    for (let i = 0; i < count; i++) {
      await buttons.nth(i).click()
    }
  }

  async getCartItemCount() {
    try {
      const badgeText = await this.cartBadge.textContent()
      return parseInt(badgeText)
    } catch {
      return 0
    }
  }
}
