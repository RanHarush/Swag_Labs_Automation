import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
	testDir: "./src/tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 2 : undefined,
	reporter: [["html", { open: "never" }], ["list"]],
	use: {
		trace: "on",
		screenshot: { mode: "only-on-failure", fullPage: true },
		video: "retain-on-failure",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},

		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},

		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
		},
	],
});
