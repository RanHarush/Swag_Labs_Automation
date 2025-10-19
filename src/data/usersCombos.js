import {invalidCredentials, users} from './users.js'

export const validUsers = [
  {user: users.standard, name: 'standard_user'},
  {user: users.problem, name: 'problem_user'},
  {user: users.performance, name: 'performance_glitch_user'},
  {user: users.error, name: 'error_user'},
  {user: users.visual, name: 'visual_user'},
]

export const negativeTestCases = [
  {
    name: 'locked_out_user',
    username: users.locked.username,
    password: users.locked.password,
    expectedError: 'Epic sadface: Sorry, this user has been locked out.',
  },
  {
    name: 'correct username + wrong password',
    username: users.standard.username,
    password: invalidCredentials.wrongPassword,
    expectedError:
      'Epic sadface: Username and password do not match any user in this service',
  },
  {
    name: 'wrong username + correct password',
    username: invalidCredentials.wrongUsername,
    password: users.standard.password,
    expectedError:
      'Epic sadface: Username and password do not match any user in this service',
  },
  {
    name: 'wrong username + wrong password',
    username: invalidCredentials.wrongUsername,
    password: invalidCredentials.wrongPassword,
    expectedError:
      'Epic sadface: Username and password do not match any user in this service',
  },
  {
    name: 'empty username + correct password',
    username: invalidCredentials.emptyString,
    password: users.standard.password,
    expectedError: 'Epic sadface: Username is required',
  },
  {
    name: 'correct username + empty password',
    username: users.standard.username,
    password: invalidCredentials.emptyString,
    expectedError: 'Epic sadface: Password is required',
  },
  {
    name: 'empty username + empty password',
    username: invalidCredentials.emptyString,
    password: invalidCredentials.emptyString,
    expectedError: 'Epic sadface: Username is required',
  },
]
