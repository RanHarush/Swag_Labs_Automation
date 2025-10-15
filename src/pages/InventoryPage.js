import { expect } from "@playwright/test";
import { URLS } from "../data/urls.js";

export default class InventoryPage {
	constructor(page) {
		this.page = page;
		this.title = page.locator('[data-test="title"]');
		this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
		this.cartBadge = page.locator(".shopping_cart_badge");
		this.cartLink = page.locator('[data-test="shopping_cart_link"]');
		this.cartContainer = page.locator(".shopping_cart_container");
	}

	async validateLogin() {
		await expect(this.page).toHaveURL(URLS.INVENTORY);
		await expect(this.title).toHaveText("Products");
	}

	async goToCart() {
		await this.cartContainer.click();
	}

	async addItemsToCart(count) {
		const buttons = this.addToCartButtons;
		for (let i = 0; i < count; i++) {
			await buttons.nth(i).click();
		}
	}

	async getCartItemCount() {
		return Number(await this.cartBadge.textContent());
	}
}
