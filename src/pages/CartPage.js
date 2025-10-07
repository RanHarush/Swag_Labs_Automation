export default class CartPage {
  constructor(page) {
    this.page = page
    this.title = '.title'
    this.checkoutButton = '[data-test="checkout"]'
    this.cartItems = '.cart_item'
  }

  async getTitle() {
    return await this.page.textContent(this.title)
  }

  async getItemCount() {
    return await this.page.locator(this.cartItems).count()
  }

  async proceedToCheckout() {
    await this.page.click(this.checkoutButton)
  }
}
