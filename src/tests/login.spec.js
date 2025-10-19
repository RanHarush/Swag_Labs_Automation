import { expect, test } from "@playwright/test";
import { negativeTestCases, validUsers } from "../data/usersCombos.js";
import InventoryPage from "../pages/InventoryPage.js";
import LoginPage from "../pages/LoginPage.js";

test.describe("Positive Login Tests", () => {
	test.beforeEach(async ({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.goto();
	});

	validUsers.forEach(({ user, name }) => {
		test(`should login successfully with ${name}`, async ({ page }) => {
			const loginPage = new LoginPage(page);
			const inventoryPage = new InventoryPage(page);
			await loginPage.login(user.username, user.password);
			await inventoryPage.validateLogin();
		});
	});
});

test.describe("Negative Login Tests", () => {
	test.beforeEach(async ({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.goto();
	});

	negativeTestCases.forEach((user) => {
		test(`should show error for ${user.name}`, async ({ page }) => {
			const loginPage = new LoginPage(page);
			await loginPage.login(user.username, user.password);
			// you need to validate the error message inside the locator for each invalid login scenario
      //
			await expect(loginPage.errorMessage).toBeVisible();

			if (user.expectedError) {
				await expect(loginPage.errorMessage).toContainText(
					user.expectedError,
				);
			}
		});
	});
});
