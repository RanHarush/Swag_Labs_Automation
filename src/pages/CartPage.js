class CartPage {
  constructor(page) {
    this.page = page;

    // Selectors
    this.title = ".title";
    this.checkoutButton = '[data-test="checkout"]';
    this.cartItems = ".cart_item";
  }

  async getTitle() {
    return await this.page.textContent(this.title);
  }

  async getItemCount() {
    return await this.page.$$(this.cartItems).then((items) => items.length);
  }

  async proceedToCheckout() {
    await this.page.click(this.checkoutButton);
  }
}
