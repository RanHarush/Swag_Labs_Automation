import {expect} from "@playwright/test";

export default class CartPage {
	constructor(page) {
		this.page = page;
		this.title = page.locator(".title");
		this.checkoutButton = page.locator('[data-test="checkout"]');
		this.cartItems = page.locator(".cart_item");
	}

	async getTitle() {
		return await this.title.textContent();
	}

	async getItemCount(number) {
		await expect(this.cartItems).toHaveCount(number);
	}

	async proceedToCheckout() {
		await this.checkoutButton.click();
	}
}
