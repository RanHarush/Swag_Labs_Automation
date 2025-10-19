# 🧪 Swag Labs Automation Testing Framework

A comprehensive end-to-end testing framework for [Swag Labs](https://www.saucedemo.com/) built with Playwright and JavaScript, implementing the Page Object Model (POM) design pattern.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Reports](#test-reports)
- [Page Objects](#page-objects)
- [Test Scenarios](#test-scenarios)
- [Test Data](#test-data)
- [CI/CD Integration](#cicd-integration)
- [Debugging](#debugging)
- [Best Practices](#best-practices)
- [Contributing](#contributing)

## 🎯 Overview

This project automates testing for the Swag Labs e-commerce demo application. It includes comprehensive test coverage for:

- 🔐 **User Authentication** - Positive and negative login scenarios with multiple user types
- 🛒 **Shopping Cart** - Add items, verify cart contents, and manage cart state
- 💳 **Checkout Process** - Complete multi-step checkout flow with form validation
- ✅ **End-to-End Purchase Flow** - Full user journey from login to order completion

## ✨ Features

- 🏗️ **Page Object Model (POM)** - Clean, maintainable test architecture with reusable page objects
- 🌐 **Cross-browser Testing** - Chromium, Firefox, and WebKit support
- ⚡ **Parallel Execution** - Fast test execution with multiple parallel workers
- 📊 **Rich Reporting** - Interactive HTML reports with screenshots, videos, and traces
- 🔄 **Automatic Retries** - CI/CD retry mechanism for flaky tests (2 retries in CI)
- 🎬 **Trace Recording** - Always-on trace capture for comprehensive debugging
- 📝 **Data-Driven Testing** - Parameterized tests with centralized test data management
- 📸 **Screenshot on Failure** - Automatic full-page screenshots when tests fail
- 🎥 **Video Recording** - Video capture retained on test failure
- 🔍 **Error Validation** - Comprehensive error message validation for negative test scenarios
- 🎭 **Headed Mode** - Option to run tests with visible browser for debugging

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- **Git** - For cloning the repository

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/RanHarush/Swag_Labs_Automation.git
   cd Swag_Labs_Automation
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Playwright browsers**

   ```bash
   npx playwright install
   ```

   This will download Chromium, Firefox, and WebKit browsers required for testing.

4. **Verify installation**
   ```bash
   npm test
   ```

## 📁 Project Structure

```
Swag_Labs_Automation/
├── src/
│   ├── data/              # Test data and user configurations
│   │   ├── urls.js        # Application URLs
│   │   ├── users.js       # User credentials
│   │   └── usersCombos.js # Test data combinations
│   ├── pages/             # Page Object Model classes
│   │   ├── LoginPage.js
│   │   ├── InventoryPage.js
│   │   ├── CartPage.js
│   │   └── CheckoutPage.js
│   └── tests/             # Test specifications
│       ├── login.spec.js  # Login test cases
│       └── sanity.spec.js # Sanity/smoke tests
├── test-results/          # Test execution results
├── playwright-report/     # HTML test reports
├── playwright.config.js   # Playwright configuration
├── package.json           # Project dependencies
└── README.md
```

## ⚙️ Configuration

The project is configured via `playwright.config.js`:

- **Test Directory**: `./src/tests`
- **Parallel Execution**: Fully parallel mode enabled
- **Workers**: 2 workers in CI, unlimited in local
- **Retries**: 2 retries in CI mode, 0 in local development
- **Trace**: Always on for comprehensive debugging
- **Screenshots**: On failure only (full page capture)
- **Video**: Retained on failure for troubleshooting
- **Reporters**: HTML report (never opens automatically) + List reporter for console output
- **Projects**: Chromium, Firefox, and WebKit configurations
- **Video**: Retained on failure
- **Browsers**: Chromium, Firefox, WebKit

## 🏃 Running Tests

### Run all tests

```bash
npm test
```

### Run tests in specific browser

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Run specific test suites

```bash
npm run test:sanity   # Run sanity/smoke tests
npm run test:login    # Run login tests only
```

### Run tests with UI mode (interactive)

```bash
npm run test:ui
```

### Run tests in headed mode (see browser)

```bash
npm run test:headed
```

### View test report

```bash
npm run test:report
```

## 📊 Test Reports

After test execution, reports are generated in the `playwright-report` directory:

- **HTML Report**: Interactive report with test results, screenshots, and videos
- **Traces**: Full trace files for debugging failed tests
- **Screenshots**: Captured on test failure
- **Videos**: Recorded for failed tests

To view the report:

```bash
npm run test:report
```

## 📄 Page Objects

### LoginPage (`src/pages/LoginPage.js`)

Handles login page interactions and authentication:

- `goto()` - Navigate to login page
- `login(username, password)` - Perform login action
- `verifySuccessfulLogin()` - Verify successful authentication
- `errorHandler(expectedError)` - Validate error messages for failed login attempts

**Locators:**

- Username input, password input, login button, error message

### InventoryPage (`src/pages/InventoryPage.js`)

Manages product inventory and cart interactions:

- `validateLogin()` - Verify successful login and correct URL
- `addItemsToCart(count)` - Add specified number of items to cart
- `validateCartItemCount(expectedCount)` - Verify cart badge count
- `goToCart()` - Navigate to shopping cart
- `validatePageTitle(expectedTitle)` - Verify page title text

**Locators:**

- Page title, add-to-cart buttons, cart badge, cart link

### CartPage (`src/pages/CartPage.js`)

Handles shopping cart operations:

- `getTitle()` - Get cart page title
- `getItemCount(expectedCount)` - Verify number of items in cart
- `proceedToCheckout()` - Navigate to checkout page

**Locators:**

- Cart items, checkout button, page title

### CheckoutPage (`src/pages/CheckoutPage.js`)

Manages checkout process and order completion:

- `fillCheckoutInfo(firstName, lastName, postalCode)` - Fill checkout form and continue
- `finishCheckout()` - Complete the purchase
- `getTitle()` - Get checkout page title
- `validateCompleteHeader()` - Verify order completion message

**Locators:**

- First name, last name, postal code inputs, continue button, finish button, complete header

## 🧪 Test Scenarios

### Positive Login Tests (`src/tests/login.spec.js`)

Data-driven tests for valid user types:

- ✅ Login with **standard_user**
- ✅ Login with **problem_user**
- ✅ Login with **performance_glitch_user**
- ✅ Login with **error_user**
- ✅ Login with **visual_user**

Each test verifies successful navigation to the inventory page.

### Negative Login Tests (`src/tests/login.spec.js`)

Data-driven tests for invalid login scenarios with error validation:

- ❌ **Locked out user** - Account locked message
- ❌ **Empty username and password** - Required field validation
- ❌ **Empty username** with correct password - Username required
- ❌ **Correct username** with empty password - Password required
- ❌ **Wrong username** with correct password - Invalid credentials
- ❌ **Correct username** with wrong password - Invalid credentials
- ❌ **Wrong username and password** - Invalid credentials

Each test validates the specific error message displayed.

### Complete Purchase Flow Test (`src/tests/sanity.spec.js`)

End-to-end user journey test covering the entire purchase process:

1. ✅ **Login** - Authenticate with standard user
2. ✅ **Add Items** - Add 2 items to cart and verify cart badge count
3. ✅ **View Cart** - Navigate to cart and verify item count
4. ✅ **Checkout Step 1** - Proceed to checkout information page
5. ✅ **Checkout Step 2** - Fill customer information (name, postal code)
6. ✅ **Review Order** - Verify checkout overview page
7. ✅ **Complete Purchase** - Finish checkout and verify order completion message

This test validates URL changes, page titles, and successful state transitions throughout the flow.

## � Test Data (`src/data/`)

### Users (`users.js`)

Predefined user credentials for testing:

- `standard` - Standard user with full access
- `problem` - User that encounters UI issues
- `performance` - User with performance delays
- `error` - User that triggers error states
- `visual` - User for visual testing
- `locked` - Locked out user account

Also includes `invalidCredentials` for negative testing.

### URLs (`urls.js`)

Centralized URL management:

- `BASE_URL` - Application base URL
- `INVENTORY` - Products page
- `CART` - Shopping cart page
- `CHECKOUT` - Checkout information page
- `CHECKOUT_OVERVIEW` - Order review page
- `CHECKOUT_COMPLETE` - Order confirmation page

### User Combinations (`usersCombos.js`)

Data structures for parameterized tests:

- `validUsers` - Array of valid user test cases
- `negativeTestCases` - Array of invalid login scenarios with expected error messages

## �🔄 CI/CD Integration

The framework is CI/CD ready with:

- ✅ Automatic browser installation
- ✅ Configurable retry mechanism (2 retries in CI)
- ✅ Parallel execution with 2 workers for faster runs
- ✅ Comprehensive HTML and list reporting
- ✅ Fail-safe configurations
- ✅ Trace, screenshot, and video artifacts
- ✅ `forbidOnly` enabled in CI to prevent accidental test isolation

### Environment Variables

- `CI=true` - Enables CI mode (retries, parallel workers, forbidOnly)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## � Debugging

### View trace files for failed tests

```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```

Trace includes:

- Timeline of all actions
- Network requests
- Console logs
- Screenshots at each step
- DOM snapshots

### Run specific test by name

```bash
npx playwright test --grep "should login successfully with standard_user"
```

### Debug mode (with Playwright Inspector)

```bash
npx playwright test --debug
```

This opens the Playwright Inspector for step-by-step debugging.

### Run single test file

```bash
npx playwright test src/tests/login.spec.js
```

### Run with specific browser

```bash
npx playwright test --project=chromium --headed
```

## 📝 Best Practices

This project follows these best practices:

- ✅ **Page Object Model (POM)** - All page interactions encapsulated in page classes
- ✅ **Data Separation** - Test data centralized in `src/data/` directory
- ✅ **DRY Principle** - Reusable methods and data-driven tests
- ✅ **Descriptive Naming** - Clear test names describing the scenario
- ✅ **Proper Assertions** - Explicit validations for URLs, text, and element counts
- ✅ **Test Isolation** - Each test is independent with proper setup/teardown
- ✅ **Data-Driven Testing** - Parameterized tests using `forEach` for multiple scenarios
- ✅ **Error Handling** - Comprehensive error message validation
- ✅ **Waiting Strategy** - Proper use of Playwright's auto-waiting
- ✅ **ES6 Modules** - Modern JavaScript with import/export syntax

## � Tech Stack

- **Testing Framework**: Playwright v1.56.0
- **Language**: JavaScript (ES6+)
- **Test Runner**: Playwright Test Runner
- **Design Pattern**: Page Object Model (POM)
- **Package Manager**: npm
- **Node Version**: 18+

## 📈 Test Statistics

When running all tests:

- **Total Tests**: 54 tests (across 3 browsers)
- **Test Suites**: 2 (login.spec.js, sanity.spec.js)
- **Browsers**: Chromium, Firefox, WebKit
- **Parallel Workers**: 4
- **Typical Execution Time**: ~1-2 minutes

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing Page Object Model structure
- Add tests for new features
- Ensure all tests pass before submitting PR
- Update documentation as needed
- Follow JavaScript ES6+ syntax and conventions

## �📧 Contact

**Author**: Ran Harush  
**Repository**: [Swag_Labs_Automation](https://github.com/RanHarush/Swag_Labs_Automation)  
**Application Under Test**: [Sauce Demo](https://www.saucedemo.com/)

## 📄 License

This project is licensed under the ISC License.

---

**Happy Testing! 🚀🧪**

_Built with ❤️ using Playwright_
