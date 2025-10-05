const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const InventoryPage = require("../pages/InventoryPage");
const CartPage = require("../pages/CartPage");
const CheckoutPage = require("../pages/CheckoutPage");
const { users } = require("../data/users");

test("Complete purchase flow sanity test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // 1. Login
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);
  await loginPage.verifySuccessfulLogin();

  // 2. Add items to cart
  await inventoryPage.addItemsToCart(2);
  const cartCount = await inventoryPage.getCartItemCount();
  expect(cartCount).toBe(2);

  // 3. Go to cart and verify
  await inventoryPage.goToCart();
  expect(await page.url()).toBe("https://www.saucedemo.com/cart.html");
  expect(await cartPage.getTitle()).toBe("Your Cart");
  expect(await cartPage.getItemCount()).toBe(2);

  // 4. Start checkout
  await cartPage.proceedToCheckout();
  expect(await page.url()).toBe(
    "https://www.saucedemo.com/checkout-step-one.html"
  );
  expect(await checkoutPage.getTitle()).toBe("Checkout: Your Information");

  // 5. Fill checkout information
  await checkoutPage.fillCheckoutInfo("Test", "User", "12345");
  expect(await page.url()).toBe(
    "https://www.saucedemo.com/checkout-step-two.html"
  );
  expect(await checkoutPage.getTitle()).toBe("Checkout: Overview");

  // 6. Complete checkout
  await checkoutPage.finishCheckout();
  expect(await page.url()).toBe(
    "https://www.saucedemo.com/checkout-complete.html"
  );
  expect(await checkoutPage.getTitle()).toBe("Checkout: Complete!");
  expect(await checkoutPage.getCompleteHeader()).toContain(
    "Thank you for your order"
  );
});
