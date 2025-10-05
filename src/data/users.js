// Test users data for Sauce Demo website
export const users = {
  // Standard user for main flows
  standard: {
    username: "standard_user",
    password: "secret_sauce",
  },
  // Problem user with intentional issues
  problem: {
    username: "problem_user",
    password: "secret_sauce",
  },
  // User with performance glitches
  performance: {
    username: "performance_glitch_user",
    password: "secret_sauce",
  },
  // User that triggers errors
  error: {
    username: "error_user",
    password: "secret_sauce",
  },
  // User for visual testing
  visual: {
    username: "visual_user",
    password: "secret_sauce",
  },
  // Locked out user for negative testing
  locked: {
    username: "locked_out_user",
    password: "secret_sauce",
  },
};

// Invalid credentials for negative testing
export const invalidCredentials = {
  wrongPassword: "wrong_password",
  wrongUsername: "wrong_username",
  emptyString: "",
};
