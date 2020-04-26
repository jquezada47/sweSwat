const functions = require('./routes/users');


test('Adds 2 + 2 to equal 4', () => {
  expect(functions.checkLogin("john@email.com", "Password123")).toBe(true);
});


test('LOGIN', () => {
  expect(functions.login("john@email.com", "Password123")).toBe(true);
});