import { expect, test } from "@playwright/test";
import { URLS } from "../data/urls.js";
import { users } from "../data/users.js";
import CartPage from "../pages/CartPage.js";
import CheckoutPage from "../pages/CheckoutPage.js";
import InventoryPage from "../pages/InventoryPage.js";
import LoginPage from "../pages/LoginPage.js";

test.describe("Purchase Flow Sanity Tests", () => {
	let loginPage;
	let inventoryPage;
	let cartPage;
	let checkoutPage;

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		inventoryPage = new InventoryPage(page);
		cartPage = new CartPage(page);
		checkoutPage = new CheckoutPage(page);

		await loginPage.goto();
		await loginPage.login(users.standard.username, users.standard.password);
		await loginPage.verifySuccessfulLogin();
		await inventoryPage.addItemsToCart(2);
	});

	test("should login successfully and verify", async () => {
		await inventoryPage.validateLogin();
	});

	test("should add items to cart and verify count", async () => {
		const cartCount = await inventoryPage.getCartItemCount();
		await expect(cartCount).toHaveCount(2);
	});

	test("should navigate to cart and verify contents", async ({ page }) => {
		await inventoryPage.goToCart();
		await expect(page).toHaveURL(URLS.CART);
		await expect(cartPage).toHaveTitle("Your Cart");
		await cartPage.getItemCount(2);
	});

	test("should proceed to checkout", async ({ page }) => {
		await inventoryPage.goToCart();
		await cartPage.proceedToCheckout();
		await expect(page).toHaveURL(URLS.CHECKOUT);
		await expect(checkoutPage).toHaveTitle("Checkout: Your Information");
	});

	test("should complete checkout information", async ({ page }) => {
		await inventoryPage.goToCart();
		await cartPage.proceedToCheckout();
		await checkoutPage.fillCheckoutInfo("Test", "User", "12345");
		await expect(page).toHaveURL(URLS.CHECKOUT_OVERVIEW);
		await expect(checkoutPage).toHaveTitle("Checkout: Overview");
	});

	test("should complete entire purchase flow", async ({ page }) => {
		await inventoryPage.goToCart();
		await cartPage.proceedToCheckout();
		await checkoutPage.fillCheckoutInfo("Test", "User", "12345");
		await checkoutPage.finishCheckout();
		await expect(page).toHaveURL(URLS.CHECKOUT_COMPLETE);
		await expect(checkoutPage).toHaveTitle("Checkout: Complete!");
		await expect(checkoutPage.getCompleteHeader()).toContain(
			"Thank you for your order",
		);
	});
});
