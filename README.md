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
- [CI/CD Integration](#cicd-integration)
- [Contributing](#contributing)

## 🎯 Overview

This project automates testing for the Swag Labs e-commerce demo application. It includes comprehensive test coverage for:

- User authentication (positive and negative scenarios)
- Shopping cart functionality
- Checkout process
- Complete purchase flow

## ✨ Features

- ✅ **Page Object Model (POM)** - Clean, maintainable test architecture
- ✅ **Cross-browser Testing** - Chromium, Firefox, and WebKit support
- ✅ **Parallel Execution** - Fast test execution with parallel workers
- ✅ **Rich Reporting** - HTML reports with screenshots and videos
- ✅ **Automatic Retries** - CI/CD retry mechanism for flaky tests
- ✅ **Trace Recording** - Full trace capture for debugging
- ✅ **Data-Driven Testing** - Parameterized tests for multiple scenarios
- ✅ **Screenshot on Failure** - Automatic full-page screenshots
- ✅ **Video Recording** - Video capture on test failure

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

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
- **Parallel Execution**: Enabled
- **Retries**: 2 retries in CI, 0 in local
- **Trace**: Always on
- **Screenshots**: On failure only (full page)
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

### LoginPage

Handles login page interactions:

- `goto()` - Navigate to login page
- `login(username, password)` - Perform login
- `verifySuccessfulLogin()` - Verify successful authentication

### InventoryPage

Manages product inventory interactions:

- `addItemsToCart(count)` - Add items to cart
- `validateCartItemCount(count)` - Verify cart count
- `goToCart()` - Navigate to cart
- `validateLogin()` - Verify successful login state

### CartPage

Handles shopping cart operations:

- `proceedToCheckout()` - Navigate to checkout
- `getItemCount(expectedCount)` - Verify items in cart

### CheckoutPage

Manages checkout process:

- `fillCheckoutInfo(firstName, lastName, postalCode)` - Fill customer info
- `finishCheckout()` - Complete purchase
- `validateCompleteHeader()` - Verify order completion

## 🧪 Test Scenarios

### Positive Login Tests

- ✅ Login with standard user
- ✅ Login with problem user
- ✅ Login with performance glitch user
- ✅ Login with error user

### Negative Login Tests

- ❌ Empty username and password
- ❌ Empty username with correct password
- ❌ Correct username with empty password
- ❌ Wrong username with correct password
- ❌ Correct username with wrong password
- ❌ Locked out user

### Purchase Flow Sanity Tests

- ✅ Successful login verification
- ✅ Add items to cart and verify count
- ✅ Navigate to cart and verify contents
- ✅ Proceed to checkout
- ✅ Complete checkout information
- ✅ Complete entire purchase flow

## 🔄 CI/CD Integration

The framework is CI/CD ready with:

- Automatic browser installation
- Configurable retry mechanism
- Parallel execution for faster runs
- Comprehensive reporting
- Fail-safe configurations

### Environment Variables

- `CI=true` - Enables CI mode (retries, parallel workers)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Best Practices

- ✅ Follow Page Object Model pattern
- ✅ Keep test data separate from test logic
- ✅ Use descriptive test names
- ✅ Add appropriate waits and assertions
- ✅ Keep tests independent and isolated
- ✅ Use data-driven approach for similar test cases

## 🐛 Debugging

### View trace files

```bash
npx playwright show-trace path/to/trace.zip
```

### Run specific test

```bash
npx playwright test --grep "test name"
```

### Debug mode

```bash
npx playwright test --debug
```

## 📧 Contact

**Author**: Ran Harush  
**Repository**: [Swag_Labs_Automation](https://github.com/RanHarush/Swag_Labs_Automation)

## 📄 License

This project is licensed under the ISC License.

---

**Happy Testing! 🚀**
