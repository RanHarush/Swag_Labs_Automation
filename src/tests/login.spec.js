import { expect, test } from "@playwright/test";
import { URLS } from "../data/urls.js";
import { invalidCredentials, users } from "../data/users.js";
import LoginPage from "../pages/LoginPage.js";

test.describe("Positive Login Tests", () => {
	const validUsers = [
		{ user: users.standard, name: "standard_user" },
		{ user: users.problem, name: "problem_user" },
		{ user: users.performance, name: "performance_glitch_user" },
		{ user: users.error, name: "error_user" },
		{ user: users.visual, name: "visual_user" },
	];

	test.beforeEach(async ({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.goto();
	});

	validUsers.forEach(({ user, name }) => {
		test(`should login successfully with ${name}`, async ({ page }) => {
			const loginPage = new LoginPage(page);
			await loginPage.login(user.username, user.password);
			await loginPage.verifySuccessfulLogin();
			await expect(page).toHaveURL(URLS.INVENTORY);
			await expect(page.locator('[data-test="title"]')).toHaveText("Products");
		});
	});
});

test.describe("Negative Login Tests", () => {
	const negativeTestCases = [
		{
			name: "locked_out_user",
			username: users.locked.username,
			password: users.locked.password,
			expectedError: "locked out",
		},
		{
			name: "correct username + wrong password",
			username: users.standard.username,
			password: invalidCredentials.wrongPassword,
		},
		{
			name: "wrong username + correct password",
			username: invalidCredentials.wrongUsername,
			password: users.standard.password,
		},
		{
			name: "wrong username + wrong password",
			username: invalidCredentials.wrongUsername,
			password: invalidCredentials.wrongPassword,
		},
		{
			name: "empty username + correct password",
			username: invalidCredentials.emptyString,
			password: users.standard.password,
		},
		{
			name: "correct username + empty password",
			username: users.standard.username,
			password: invalidCredentials.emptyString,
		},
		{
			name: "empty username + empty password",
			username: invalidCredentials.emptyString,
			password: invalidCredentials.emptyString,
		},
	];

	test.beforeEach(async ({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.goto();
	});

	negativeTestCases.forEach((testCase) => {
		test(`should show error for ${testCase.name}`, async ({ page }) => {
			const loginPage = new LoginPage(page);
			await loginPage.login(testCase.username, testCase.password);
			await expect(page.locator('[data-test="error"]')).toBeVisible();

			if (testCase.expectedError) {
				await expect(page.locator('[data-test="error"]')).toContainText(
					testCase.expectedError,
				);
			}
		});
	});
});
