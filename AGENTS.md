# Sauce Demo Automated Testing Documentation

## 🎯 Project Purpose

Automated testing for the Sauce Demo website using Playwright, following key principles:  
**Maintainability**, **Clarity**, and **Performance**.

## 🧱 Project Structure Guidelines

- Each system page should have its own Page Object class in the `pages/` directory.
- Test files should be located in the `tests/` directory.
- Test data and constants should be stored in the `data/` directory.
- Utility code (e.g., fixtures, helpers) belongs in `utils/`.

- Each test must include a clear title and a meaningful description.

## ✅ Code Style Rules

- All tests must be written in **JavaScript**.
- Avoid code duplication – reuse logic via functions and Page Objects.
- Use **descriptive and readable** variable and method names in **English**.
- Assertions must be clear and specific.

## 📋 Test Scenarios

### 1. Main Sanity Test (End-to-End Purchase Flow)

This test verifies a complete product purchase scenario with assertions throughout the process.

#### Test Flow:

1. Login with `user_standard`
2. Verify post-login URL: `https://www.saucedemo.com/inventory.html`
3. Verify page title
4. Add 2 products to cart
5. Verify cart contents:
   - Item count (2)
6. Navigate to cart and verify:
   - URL: `https://www.saucedemo.com/cart.html`
   - Title: "Your Cart"
   - Item count (2)
7. Proceed to Checkout Step One:
   - URL: `https://www.saucedemo.com/checkout-step-one.html`
   - Title: "Checkout: Your Information"
   - Complete form and proceed
8. Verify Checkout Step Two:
   - URL: `https://www.saucedemo.com/checkout-step-two.html`
   - Title: "Checkout: Overview"
9. Complete Checkout:
   - URL: `https://www.saucedemo.com/checkout-complete.html`
   - Title: "Checkout: Complete!"
   - Verify thank you messages

### 2. Positive Login Tests

All positive tests must be grouped in a single `describe.test` block.

Test successful login for each user:

- `user_standard`
- `problem_user`
- `performance_glitch_user`
- `error_user`
- `visual_user`

For each user, verify:

- Successful login
- Correct redirect URL
- Page title validation

### 3. Negative Login Tests

All negative tests must be grouped in a single `describe.test` block.

#### Test Scenarios:

1. Locked user test:

   - Login with `user_out_locked`
   - Verify error message

2. Error scenarios (verify error message for each):
   - Correct username + wrong password
   - Wrong username + correct password
   - Wrong username + wrong password
   - Empty username + correct password
   - Correct username + empty password
   - Empty username + empty password

### 4. Data-Driven Testing Implementation

#### What are Data-Driven Tests?

Data-Driven Tests (or Parameterized Tests) allow running the same test logic with different data sets. Instead of writing separate tests for each scenario, write a single test that runs dynamically with varying data.

#### Benefits:

- **Time Efficiency**: Write once, run with multiple data sets
- **Easy Maintenance**: Update in one place
- **Clean Code**: Separation of test logic and test data
- **Better Organization**: Improved project structure

#### Implementation Steps:

1. Create arrays with test data sets
2. Write parameterized test logic
3. Run tests with different data combinations

#### Important: Test Naming

Each test must have a unique name to avoid conflicts. For data-driven tests, use dynamic names that include test parameters (e.g., username) to distinguish between runs.
